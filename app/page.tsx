"use client";
import { Button } from "@/components/ui/button";
import AnimatedCatLogo from "@/components/ui/animatedCatLogo";
import { motion } from "framer-motion";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { GitHubIcon } from "@/components/ui/icons";

export default function Home() {
  const { signIn } = useSignIn();
  const router = useRouter();

  const handleGitHubSignIn = async () => {
    try {
      if (!signIn) {
        console.error("Sign-in is not initialized");
        return;
      }
      const result = await signIn.authenticateWithRedirect({
        strategy: "oauth_github",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (error) {
      console.error("Error during GitHub sign-in:", error);
      // You might want to show a toast or error message to the user here
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-24 py-8 lg:py-16">
          <div className="flex items-center justify-center w-full lg:w-auto shrink-0">
            <AnimatedCatLogo />
          </div>
          <div className="flex flex-col items-center lg:items-start justify-center gap-6 lg:gap-16 w-full lg:max-w-2xl">
            <div className="flex flex-col items-center lg:items-start gap-4 w-full">
              <h1 className="text-center lg:text-left text-4xl lg:text-7xl font-bold text-foreground">
                GitHub Profile Generator
              </h1>
              <p className="text-center lg:text-left text-lg lg:text-2xl text-muted-foreground">
                Create an awesome GitHub profile in seconds using AI
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-start gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full"
              >
                <Button
                  onClick={handleGitHubSignIn}
                  variant="outline"
                  size="lg"
                  className="w-full lg:w-auto px-8 lg:px-24 bg-black text-white dark:bg-white dark:text-black"
                >
                  <GitHubIcon className="mr-2 h-4 w-4" />
                  Continue with GitHub
                </Button>
              </motion.div>
              <p className="text-base lg:text-lg text-center lg:text-left text-muted-foreground">
                No credit card required. Login with GitHub to get started.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
