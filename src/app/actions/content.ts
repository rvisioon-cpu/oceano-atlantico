"use server";

import { getDb } from "@/lib/db";
import { socialContent, socialContentMessages, buildingFaces } from "@/lib/db/schema";
import { eq, isNull, desc, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

// Verificar si el rol es SUPER_ADMIN o ADMIN
async function verifyAdminAccess() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  const role = session.user.role as string;
  if (role !== "SUPER_ADMIN" && role !== "ADMIN") {
    throw new Error("Unauthorized: Solo administradores tienen acceso a este módulo.");
  }
  return session.user;
}

export async function getSocialContents() {
  await verifyAdminAccess();
  const db = await getDb();

  return await db
    .select()
    .from(socialContent)
    .where(isNull(socialContent.deletedAt))
    .orderBy(desc(socialContent.createdAt));
}

// Fuentes de imágenes para el generador de contenido más allá de la tabla media:
// renders de fachada del edificio (building_faces) y piezas ya generadas.
export async function getContentImageSources() {
  await verifyAdminAccess();
  const db = await getDb();

  const isImage = (path: string | null | undefined) =>
    !!path && /\.(jpe?g|png|webp|gif)$/i.test(path);

  // Renders de fachada: imágenes estáticas guardadas en building_faces
  // (los campos *Video y *Transition son videos y se descartan)
  const faces = await db
    .select()
    .from(buildingFaces)
    .where(isNull(buildingFaces.deletedAt))
    .orderBy(buildingFaces.order);

  const renders: { id: string; title: string; url: string }[] = [];
  for (const f of faces) {
    const variants: Array<[string, string | null]> = [
      ["Día", f.dayBackground],
      ["Noche", f.nightBackground],
      ["Día · destaque", f.dayHighlight],
      ["Noche · destaque", f.nightHighlight],
    ];
    for (const [label, path] of variants) {
      if (isImage(path)) {
        renders.push({ id: `face-${f.id}-${label}`, title: `${f.name} · ${label}`, url: path as string });
      }
    }
  }

  // Contenido pasado: piezas de social_content que ya tienen imagen final
  const pastRows = await db
    .select()
    .from(socialContent)
    .where(isNull(socialContent.deletedAt))
    .orderBy(desc(socialContent.createdAt));

  const pastContent = pastRows
    .filter((r) => r.resultUrl)
    .map((r) => ({ id: `sc-${r.id}`, title: r.title, url: r.resultUrl as string }));

  return { renders, pastContent };
}

export async function getSocialContentById(id: string) {
  await verifyAdminAccess();
  const db = await getDb();

  const [content] = await db
    .select()
    .from(socialContent)
    .where(and(eq(socialContent.id, id), isNull(socialContent.deletedAt)));

  if (!content) return null;

  const messages = await db
    .select()
    .from(socialContentMessages)
    .where(eq(socialContentMessages.socialContentId, id))
    .orderBy(socialContentMessages.createdAt);

  return {
    ...content,
    messages
  };
}

export async function createSocialContent(
  title: string,
  platform: string,
  templateType: string,
  width: number,
  height: number,
  aspectRatio: string
) {
  const user = await verifyAdminAccess();
  const db = await getDb();

  const [newContent] = await db
    .insert(socialContent)
    .values({
      title,
      platform,
      templateType,
      width,
      height,
      aspectRatio,
      status: "DRAFT",
      createdBy: user.id || null,
      referenceUrls: [],
    })
    .returning();

  revalidatePath("/dashboard/content");
  return newContent;
}

export async function updateSocialContentReferences(id: string, referenceUrls: string[]) {
  await verifyAdminAccess();
  const db = await getDb();

  const [updated] = await db
    .update(socialContent)
    .set({
      referenceUrls,
      updatedAt: new Date()
    })
    .where(eq(socialContent.id, id))
    .returning();

  revalidatePath("/dashboard/content");
  return updated;
}

export async function deleteSocialContent(id: string) {
  await verifyAdminAccess();
  const db = await getDb();

  await db
    .update(socialContent)
    .set({
      deletedAt: new Date()
    })
    .where(eq(socialContent.id, id));

  revalidatePath("/dashboard/content");
  return { success: true };
}

export async function addChatMessage(socialContentId: string, sender: "USER" | "AI", text: string) {
  await verifyAdminAccess();
  const db = await getDb();

  const [newMessage] = await db
    .insert(socialContentMessages)
    .values({
      socialContentId,
      sender,
      text,
    })
    .returning();

  return newMessage;
}
