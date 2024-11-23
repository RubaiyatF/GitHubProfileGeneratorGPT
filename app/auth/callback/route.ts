import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  console.log("🎯 Auth Callback - Starting");

  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    console.log("📝 Auth Callback - Code received");
    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: "", ...options });
          },
        },
      }
    );

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) throw error;

      console.log("✅ Auth Callback - Session created:", !!data.session);
      return NextResponse.redirect(`${origin}/dashboard`);
    } catch (error) {
      console.error("❌ Auth Callback - Error:", error);
      return NextResponse.redirect(`${origin}?error=auth`);
    }
  }

  // Return to home if no code
  console.log("⚠️ Auth Callback - No code received");
  return NextResponse.redirect(`${origin}?error=no_code`);
}
