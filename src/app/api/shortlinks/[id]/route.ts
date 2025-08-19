import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { redirectIfBrowserNavigation } from "@/lib/http";

const updateShortLinkSchema = z.object({
  originalUrl: z.string().url("Please enter a valid URL").optional(),
  customShort: z.string().optional(),
});

// GET - Obtener ShortLink por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const redirect = redirectIfBrowserNavigation(request, "/blinky");
    if (redirect) return redirect;

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const shortLink = await db.shortLink.findFirst({
      where: {
        id,
        userId: session.user.id, // Solo sus propios links
      },
    });

    if (!shortLink) {
      return NextResponse.json(
        { error: "Short link not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(shortLink);
  } catch (error) {
    console.error("Error fetching short link:", error);
    return NextResponse.json(
      { error: "Failed to fetch short link" },
      { status: 500 }
    );
  }
}

// PUT - Actualizar ShortLink
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = updateShortLinkSchema.parse(body);

    // Verificar que el ShortLink existe y pertenece al usuario
    const existingShortLink = await db.shortLink.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingShortLink) {
      return NextResponse.json(
        { error: "Short link not found" },
        { status: 404 }
      );
    }

    // Si se quiere cambiar el código corto, verificar disponibilidad
    if (
      validatedData.customShort &&
      validatedData.customShort !== existingShortLink.short
    ) {
      const shortCodeExists = await db.shortLink.findUnique({
        where: { short: validatedData.customShort },
      });

      if (shortCodeExists) {
        return NextResponse.json(
          { error: "Short code already exists" },
          { status: 400 }
        );
      }
    }

    const updatedShortLink = await db.shortLink.update({
      where: { id },
      data: {
        ...(validatedData.originalUrl && {
          originalUrl: validatedData.originalUrl,
        }),
        ...(validatedData.customShort && { short: validatedData.customShort }),
      },
    });

    return NextResponse.json(updatedShortLink);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error },
        { status: 400 }
      );
    }

    console.error("Error updating short link:", error);
    return NextResponse.json(
      { error: "Failed to update short link" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar ShortLink
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    // Verificar que el ShortLink existe y pertenece al usuario
    const existingShortLink = await db.shortLink.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingShortLink) {
      return NextResponse.json(
        { error: "Short link not found" },
        { status: 404 }
      );
    }

    await db.shortLink.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Short link deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting short link:", error);
    return NextResponse.json(
      { error: "Failed to delete short link" },
      { status: 500 }
    );
  }
}
