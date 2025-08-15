import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Schema de validación
const createShortLinkSchema = z.object({
  originalUrl: z.string().url("Please enter a valid URL"),
  customShort: z.string().optional(),
});

// GET - Obtener todos los ShortLinks del usuario
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const shortLinks = await db.shortLink.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(shortLinks);
  } catch (error) {
    console.error("Error fetching short links:", error);
    return NextResponse.json(
      { error: "Failed to fetch short links" },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo ShortLink
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createShortLinkSchema.parse(body);

    // Generar código único si no se proporciona uno personalizado
    let shortCode = validatedData.customShort;

    if (!shortCode) {
      shortCode = generateShortCode();
    }

    // Verificar que el código no exista
    const existingShortLink = await db.shortLink.findUnique({
      where: { short: shortCode },
    });

    if (existingShortLink) {
      if (validatedData.customShort) {
        return NextResponse.json(
          { error: "Custom short code already exists" },
          { status: 400 }
        );
      }
      // Si es generado automáticamente, intentar otro
      shortCode = generateShortCode();
    }

    const shortLink = await db.shortLink.create({
      data: {
        originalUrl: validatedData.originalUrl,
        short: shortCode,
        userId: session.user.id,
      },
    });

    return NextResponse.json(shortLink, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error },
        { status: 400 }
      );
    }

    console.error("Error creating short link:", error);
    return NextResponse.json(
      { error: "Failed to create short link" },
      { status: 500 }
    );
  }
}

// Función para generar código aleatorio
function generateShortCode(length: number = 6): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
