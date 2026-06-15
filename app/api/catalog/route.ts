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

export async function GET() {
  try {
    const items = await prisma.chickenItem.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET Catalog error:", error);
    return NextResponse.json({ error: "Gagal mengambil data katalog" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, name, tag, description, footerText, image, origin, weightRange, age, characterDetail } = body;

    // Validation
    if (!id || !name || !tag || !description || !footerText || !image || !origin || !weightRange || !age || !characterDetail) {
      return NextResponse.json({ error: "Semua field harus diisi" }, { status: 400 });
    }

    // Check if ID already exists
    const existing = await prisma.chickenItem.findUnique({ where: { id } });
    if (existing) {
      return NextResponse.json({ error: "ID (slug) Ayam sudah digunakan" }, { status: 400 });
    }

    const item = await prisma.chickenItem.create({
      data: {
        id,
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

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("POST Catalog error:", error);
    return NextResponse.json({ error: "Gagal menambahkan data katalog" }, { status: 500 });
  }
}
