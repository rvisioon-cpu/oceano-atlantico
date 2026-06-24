"use server";

import { getDb } from "@/lib/db";
import { pageViews, prospects, units, users, logs, floors } from "@/lib/db/schema";
import { eq, and, isNull, isNotNull, gte, lte, count, desc, like } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Utility to calculate monthly growth percentage
function calculateGrowth(current: number, previous: number): string {
  if (previous === 0) {
    return current > 0 ? "+100%" : "0%";
  }
  const percentage = Math.round(((current - previous) / previous) * 100);
  return percentage >= 0 ? `+${percentage}%` : `${percentage}%`;
}

// Action to track a page view
export async function trackPageView(path: string, deviceType: string) {
  try {
    const db = await getDb();
    
    // Extract unit ID from path if visiting a unit page (e.g. /unidad/unit_2_201)
    let unitId: string | null = null;
    if (path.startsWith("/unidad/")) {
      const parts = path.split("/");
      unitId = parts[2] || null;
    }

    // Verify unit exists to satisfy foreign key constraint
    let verifiedUnitId: string | null = null;
    if (unitId) {
      const [existingUnit] = await db
        .select()
        .from(units)
        .where(eq(units.id, unitId))
        .limit(1);
      
      if (existingUnit) {
        verifiedUnitId = unitId;
      }
    }

    await db.insert(pageViews).values({
      path,
      unitId: verifiedUnitId,
      deviceType: deviceType || "desktop",
    });

    return { success: true };
  } catch (error) {
    console.error("Error tracking page view:", error);
    return { success: false, error: String(error) };
  }
}

// Action to get all dynamic stats for the dashboard
export async function getDashboardStats() {
  try {
    const db = await getDb();

    // Date ranges
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    // 1. Visitas Totales (Total Visits)
    const [totalVisitsResult] = await db
      .select({ count: count() })
      .from(pageViews);
    const totalVisits = totalVisitsResult?.count || 0;

    const [visitsThisMonthResult] = await db
      .select({ count: count() })
      .from(pageViews)
      .where(gte(pageViews.createdAt, startOfThisMonth));
    const visitsThisMonth = visitsThisMonthResult?.count || 0;

    const [visitsLastMonthResult] = await db
      .select({ count: count() })
      .from(pageViews)
      .where(
        and(
          gte(pageViews.createdAt, startOfLastMonth),
          lte(pageViews.createdAt, endOfLastMonth)
        )
      );
    const visitsLastMonth = visitsLastMonthResult?.count || 0;
    const visitsGrowth = calculateGrowth(visitsThisMonth, visitsLastMonth);

    // 2. Prospectos (Formularios)
    const [totalProspectsResult] = await db
      .select({ count: count() })
      .from(prospects)
      .where(isNull(prospects.deletedAt));
    const totalProspects = totalProspectsResult?.count || 0;

    const [prospectsThisMonthResult] = await db
      .select({ count: count() })
      .from(prospects)
      .where(
        and(
          isNull(prospects.deletedAt),
          gte(prospects.createdAt, startOfThisMonth)
        )
      );
    const prospectsThisMonth = prospectsThisMonthResult?.count || 0;

    const [prospectsLastMonthResult] = await db
      .select({ count: count() })
      .from(prospects)
      .where(
        and(
          isNull(prospects.deletedAt),
          gte(prospects.createdAt, startOfLastMonth),
          lte(prospects.createdAt, endOfLastMonth)
        )
      );
    const prospectsLastMonth = prospectsLastMonthResult?.count || 0;
    const prospectsGrowth = calculateGrowth(prospectsThisMonth, prospectsLastMonth);

    // 3. Unidades Reservadas (Reserved Units)
    const [reservedUnitsResult] = await db
      .select({ count: count() })
      .from(units)
      .where(
        and(
          eq(units.state, "RESERVED"),
          isNull(units.deletedAt)
        )
      );
    const reservedUnits = reservedUnitsResult?.count || 0;

    // Use audit logs to count new reservations this month vs last month
    const [reservationsThisMonthResult] = await db
      .select({ count: count() })
      .from(logs)
      .where(
        and(
          eq(logs.entityType, "unit"),
          eq(logs.action, "UPDATE"),
          like(logs.details, "%-> RESERVED%"),
          gte(logs.createdAt, startOfThisMonth)
        )
      );
    const reservationsThisMonth = reservationsThisMonthResult?.count || 0;

    const [reservationsLastMonthResult] = await db
      .select({ count: count() })
      .from(logs)
      .where(
        and(
          eq(logs.entityType, "unit"),
          eq(logs.action, "UPDATE"),
          like(logs.details, "%-> RESERVED%"),
          gte(logs.createdAt, startOfLastMonth),
          lte(logs.createdAt, endOfLastMonth)
        )
      );
    const reservationsLastMonth = reservationsLastMonthResult?.count || 0;
    const reservedGrowth = calculateGrowth(reservationsThisMonth, reservationsLastMonth);

    // 4. Vendedores Activos
    const [activeSellersResult] = await db
      .select({ count: count() })
      .from(users)
      .where(
        and(
          eq(users.role, "SELLER"),
          isNull(users.deletedAt)
        )
      );
    const activeSellers = activeSellersResult?.count || 0;

    // 5. Unidades Más Visitadas (Popular Units)
    const rawPopularUnits = await db
      .select({
        unitId: pageViews.unitId,
        views: count(pageViews.id),
        unitIdentifier: units.identifier,
        unitType: units.type,
        floorName: floors.name,
      })
      .from(pageViews)
      .innerJoin(units, eq(pageViews.unitId, units.id))
      .innerJoin(floors, eq(units.floorId, floors.id))
      .where(isNotNull(pageViews.unitId))
      .groupBy(pageViews.unitId, units.identifier, units.type, floors.name)
      .orderBy(desc(count(pageViews.id)))
      .limit(3);

    // Find the max views among the popular units to calculate percentages/progress correctly
    const maxViews = rawPopularUnits.length > 0 ? Math.max(...rawPopularUnits.map(u => u.views)) : 0;

    const popularUnits = rawPopularUnits.map(item => {
      let typeLabel = "Dep";
      if (item.unitType === "STORAGE") typeLabel = "Bodega";
      else if (item.unitIdentifier === "Terraza") typeLabel = "Terraza";

      return {
        unit: `${typeLabel} ${item.unitIdentifier} - Piso ${item.floorName}`,
        views: item.views,
        progress: maxViews > 0 ? Math.round((item.views / maxViews) * 100) : 0,
      };
    });

    // 6. Origen de Visitas (Devices breakdown)
    const rawDevices = await db
      .select({
        deviceType: pageViews.deviceType,
        count: count(pageViews.id),
      })
      .from(pageViews)
      .groupBy(pageViews.deviceType);

    const totalDeviceViews = rawDevices.reduce((sum, item) => sum + item.count, 0);

    const mobileViews = rawDevices.find(d => d.deviceType === "mobile")?.count || 0;
    const desktopViews = rawDevices.find(d => d.deviceType === "desktop")?.count || 0;
    const tabletViews = rawDevices.find(d => d.deviceType === "tablet")?.count || 0;

    const devices = {
      mobile: totalDeviceViews > 0 ? Math.round((mobileViews / totalDeviceViews) * 100) : 0,
      desktop: totalDeviceViews > 0 ? Math.round((desktopViews / totalDeviceViews) * 100) : 0,
      tablet: totalDeviceViews > 0 ? Math.round((tabletViews / totalDeviceViews) * 100) : 0,
    };

    return {
      success: true,
      data: {
        totalVisits,
        visitsGrowth,
        totalProspects,
        prospectsGrowth,
        reservedUnits,
        reservedGrowth,
        activeSellers,
        popularUnits,
        devices,
      }
    };
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    return {
      success: false,
      error: String(error),
      data: {
        totalVisits: 0,
        visitsGrowth: "0%",
        totalProspects: 0,
        prospectsGrowth: "0%",
        reservedUnits: 0,
        reservedGrowth: "0%",
        activeSellers: 0,
        popularUnits: [],
        devices: { mobile: 0, desktop: 0, tablet: 0 },
      }
    };
  }
}
