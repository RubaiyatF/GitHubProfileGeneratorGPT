import type { Metadata, Viewport } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/ui/Footer";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { Providers } from "@/components/Providers";
import { Toaster } from "sonner";

const sourceSansPro = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GitHub Profile Generator",
  description: "Create an awesome GitHub profile in seconds using AI",
  metadataBase: new URL("http://localhost:3000"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        setAll(cookies) {
          cookies.forEach((cookie) => {
            cookieStore.set(cookie.name, cookie.value, cookie.options);
          });
        },
      },
    }
  );

  try {
    // First get the session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Then verify the user with getUser
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      throw error || new Error("User not found");
    }

    console.log("🏗️ Layout - Authenticated User:", user.email);

    return (
      <html lang="en" suppressHydrationWarning>
        <body className={sourceSansPro.className}>
          <Providers>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <main className="flex min-h-screen flex-col">
                <Navbar user={user} /> {/* Pass user instead of session */}
                {children}
                <Footer />
                <Toaster richColors position="top-center" />
              </main>
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    );
  } catch (error) {
    console.error("❌ Layout - Error:", error);
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={sourceSansPro.className}>
          <Providers>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <main className="flex min-h-screen flex-col">
                <Navbar user={null} />
                {children}
                <Footer />
                <Toaster richColors position="top-center" />
              </main>
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    );
  }
}
