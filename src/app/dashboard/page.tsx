import { auth } from "@/auth";
import { Users, Building, Eye, FileText, LayoutDashboard } from "lucide-react";
import { getDashboardStats } from "@/app/actions/analytics";

export const metadata = {
  title: "Dashboard - Santa Fe 170",
};

export default async function DashboardPage() {
  const session = await auth();

  // Fetch real database statistics
  const response = await getDashboardStats();
  const statsData = response?.data || {
    totalVisits: 0,
    visitsGrowth: "0%",
    totalProspects: 0,
    prospectsGrowth: "0%",
    reservedUnits: 0,
    reservedGrowth: "0%",
    activeSellers: 0,
    popularUnits: [],
    devices: { mobile: 0, desktop: 0, tablet: 0 },
  };

  const stats = [
    { title: "Visitas Totales", value: statsData.totalVisits.toLocaleString(), change: statsData.visitsGrowth, icon: Eye, color: "text-brand-orange" },
    { title: "Prospectos (Formularios)", value: statsData.totalProspects.toString(), change: statsData.prospectsGrowth, icon: FileText, color: "text-brand-light-orange" },
    { title: "Unidades Reservadas", value: statsData.reservedUnits.toString(), change: statsData.reservedGrowth, icon: Building, color: "text-brand-dark-orange" },
    { title: "Vendedores Activos", value: statsData.activeSellers.toString(), change: "0%", icon: Users, color: "text-brand-yellow" },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold font-primary text-brand-orange flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-brand-orange animate-pulse" />
          Resumen de Actividad
        </h1>
        <p className="text-gray-500 text-sm font-secondary">Bienvenido de nuevo, {session?.user?.name}. Aquí tienes un vistazo general.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body p-6 flex flex-row items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                <div className="text-2xl font-bold mt-1">{stat.value}</div>
                <div className="text-xs text-success mt-1">{stat.change} este mes</div>
              </div>
              <div className={`p-3 rounded-full bg-base-200 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        {/* Unidades Populares */}
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body">
            <h2 className="card-title text-lg border-b pb-2 font-primary text-brand-orange">Unidades Más Visitadas</h2>
            <div className="space-y-4 mt-2">
              {statsData.popularUnits && statsData.popularUnits.length > 0 ? (
                statsData.popularUnits.map((item, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.unit}</span>
                      <span className="text-gray-500">{item.views} visitas</span>
                    </div>
                    <progress className="progress progress-warning w-full" value={item.progress} max="100"></progress>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-sm text-center py-8">
                  No hay suficientes visitas registradas en departamentos.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Origen de Visitas */}
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body">
            <h2 className="card-title text-lg border-b pb-2 font-primary text-brand-orange">Dispositivos</h2>
            <div className="flex flex-col justify-center gap-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-orange"></div>
                  <span className="text-sm font-secondary">Móvil</span>
                </div>
                <span className="font-medium">{statsData.devices.mobile}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-light-orange"></div>
                  <span className="text-sm font-secondary">Escritorio</span>
                </div>
                <span className="font-medium">{statsData.devices.desktop}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-dark-orange"></div>
                  <span className="text-sm font-secondary">Tablet</span>
                </div>
                <span className="font-medium">{statsData.devices.tablet}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

