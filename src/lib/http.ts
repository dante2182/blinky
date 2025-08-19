import { NextRequest, NextResponse } from "next/server";

/**
 * Si la solicitud proviene de una navegación directa del navegador
 * (por ejemplo, al abrir la URL en la barra de direcciones) en lugar
 * de una llamada programática (fetch, axios), redirige a la ruta de UI indicada.
 *
 * Devuelve un NextResponse de redirección si aplica, de lo contrario null.
 */
export function redirectIfBrowserNavigation(
  request: NextRequest,
  uiPath: string
): NextResponse | null {
  const secFetchMode = request.headers.get("sec-fetch-mode");
  const accept = request.headers.get("accept") || "";

  if (secFetchMode === "navigate" || accept.includes("text/html")) {
    return NextResponse.redirect(new URL(uiPath, request.url));
  }

  return null;
}
