import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_TOKEN = "jagoer_rooster_farm_auth_token_secret_2026";

async function isAuthorized() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return session && session.value === SESSION_TOKEN;
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const body = await request.json();
    const { name, tag, description, footerText, image, origin, weightRange, age, characterDetail } = body;

    // Check if item exists
    const existing = await prisma.chickenItem.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Data ayam tidak ditemukan" }, { status: 404 });
    }

    const updated = await prisma.chickenItem.update({
      where: { id },
      data: {
        name,
        tag,
        description,
        footerText,
        image,
        origin,
        weightRange,
        age,
        characterDetail,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT Catalog item error:", error);
    return NextResponse.json({ error: "Gagal memperbarui data katalog" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    
    // Check if item exists
    const existing = await prisma.chickenItem.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Data ayam tidak ditemukan" }, { status: 404 });
    }

    await prisma.chickenItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Data ayam berhasil dihapus" });
  } catch (error) {
    console.error("DELETE Catalog item error:", error);
    return NextResponse.json({ error: "Gagal menghapus data katalog" }, { status: 500 });
  }
}
