"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Safari from "@/components/ui/safari";
import { Loader2 } from "lucide-react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import AnimatedCatLogo from "@/components/ui/animatedCatLogo";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { createClient } from "@/lib/supabase";

export default function PreviewPage() {
  const [formData, setFormData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showMarkdown, setShowMarkdown] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Get form data from localStorage
        const storedData = localStorage.getItem("profileData");
        if (storedData) {
          const data = JSON.parse(storedData);
          setFormData(data);
          console.log("Form data in preview:", data);
        }

        // Get user data from Supabase
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          console.log("User data in preview:", user);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!isLoading && formData && user && !content && !isGenerating) {
      generateProfile();
    }
  }, [isLoading, formData, user]);

  const handleDownload = () => {
    // Create a blob from the content
    const blob = new Blob([content], { type: "text/markdown" });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary anchor element and trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    document.body.appendChild(a);
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const generateProfile = async () => {
    setIsGenerating(true);
    setContent(""); // Reset content before generating new profile

    // try {
    //   const response = await fetch("/api/generate", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       formData,
    //       user,
    //     }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to generate profile");
    //   }

    //   const reader = response.body?.getReader();
    //   const decoder = new TextDecoder();

    //   if (reader) {
    //     while (true) {
    //       const { done, value } = await reader.read();
    //       if (done) break;

    //       const text = decoder.decode(value);
    //       setContent((prev) => prev + text);
    //     }
    //   }
    // } catch (error) {
    //   console.error("Error generating profile:", error);
    //   // You might want to show an error message to the user here
    // } finally {
    //   setIsGenerating(false);
    // }
  };

  const handleEdit = () => {
    router.push("/create?step=15");
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-background">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">Preview Your GitHub Profile</h1>

      {/* Main Content Area */}
      <div className="w-full max-w-[1400px] px-8 flex-grow relative">
        <Safari
          url="github.com"
          content={content}
          onToggleView={() => setShowMarkdown(!showMarkdown)}
          showMarkdown={showMarkdown}
          className="w-full h-[calc(100vh-200px)]"
          remarkPlugins={[remarkGfm]}
        />
      </div>

      {/* Fixed Overlay Card */}
      <div className="fixed bottom-6 right-6 animate-slide-up">
        <Card className="w-[280px] flex flex-col items-center justify-center gap-8 p-6">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-24 h-24 aspect-square">
              <AnimatedCatLogo />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {isGenerating
                ? "Generating your profile..."
                : content
                ? "Like the design? Click the following button to download your profile."
                : "Click generate to create your GitHub profile"}
            </p>
          </div>
          <div className="w-full space-y-3">
            {content ? (
              <RainbowButton className="w-full" onClick={handleDownload}>
                Download README.md
              </RainbowButton>
            ) : (
              <Button
                className="w-full"
                size="lg"
                onClick={generateProfile}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Profile"
                )}
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full"
              size="lg"
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
