import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("🚀 Middleware - Current path:", request.nextUrl.pathname);

  // Skip middleware for auth callback route
  if (request.nextUrl.pathname.startsWith("/auth/callback")) {
    console.log("↪️ Skipping middleware for auth callback");
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log("👤 Middleware - Session exists:", !!session);

  // If no session and trying to access protected route
  if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("🔒 Redirecting to home - No session");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If session exists and on landing page, redirect to dashboard
  if (session && request.nextUrl.pathname === "/") {
    console.log("✅ Redirecting to dashboard - Session exists");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public|auth/callback).*)",
  ],
};
