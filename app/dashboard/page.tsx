"use client";
import { Button } from "@/components/ui/button";
import AnimatedCatLogo from "@/components/ui/animatedCatLogo";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { GitHubIcon, PlusCircle, History } from "lucide-react"; // Added icons
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import TypingAnimation from "@/components/ui/typing-animation";
import { createClient } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name.split(" ")[0]); // Get first name
      } else {
        setUserName("there"); // Fallback name if full_name is not available
      }
      setIsLoading(false);
    };
    getUser();
  }, []);

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-24 py-8 lg:py-16">
          <motion.div
            className="flex items-center justify-center w-full lg:w-auto shrink-0"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <AnimatedCatLogo />
          </motion.div>
          <motion.div
            className="flex flex-col items-center lg:items-start justify-center gap-6 lg:gap-16 w-full lg:max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="flex flex-col items-center lg:items-start gap-4 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              <h1 className="text-center lg:text-left text-4xl lg:text-7xl font-bold text-foreground">
                {!isLoading && (
                  <TypingAnimation
                    className="text-center lg:text-left text-4xl lg:text-7xl font-bold text-foreground"
                    text={`Hi ${userName}!`}
                    duration={150}
                  />
                )}
              </h1>
              <p className="text-center lg:text-left text-lg lg:text-2xl text-muted-foreground">
                What would you like to do?
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center lg:items-start gap-4 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4"
              >
                <Button
                  onClick={() => router.push("/create")}
                  size="lg"
                  className="w-full p-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create New Template
                </Button>

                <Button
                  onClick={() => router.push("/templates")}
                  variant="outline"
                  size="lg"
                  className="w-full p-8 text-lg border-2 hover:bg-accent shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <History className="mr-2 h-5 w-5" />
                  View Templates
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
