import db from "@/lib/db";
import { redirect, notFound } from "next/navigation";

interface RedirectPageProps {
  params: Promise<{
    code: string;
  }>;
}

const RedirectPage = async ({ params }: RedirectPageProps) => {
  const { code } = await params;

  // Buscar el ShortLink en la base de datos
  let shortLink;
  try {
    shortLink = await db.shortLink.findUnique({
      where: {
        short: code,
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    notFound();
  }

  if (!shortLink) {
    notFound();
  }

  // Redirigir a la URL original
  redirect(shortLink.originalUrl);
};

export default RedirectPage;
