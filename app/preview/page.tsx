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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PreviewPage() {
  const [formData, setFormData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showMarkdown, setShowMarkdown] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [error, setError] = useState("");
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
    if (!content) return;

    // Remove markdown code block delimiters
    const cleanContent = content
      .replace(/^```markdown\n/, "")
      .replace(/\n```$/, "");

    // Store the content in localStorage for the receipt page
    localStorage.setItem("downloadContent", cleanContent);

    // Navigate to receipt page
    router.push("/receipt");
  };

  const generateProfile = async () => {
    setIsGenerating(true);
    setContent(""); // Reset content before generating new profile

    try {
      // Get user data from Supabase
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Failed to get user data");
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          user,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to generate profile");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = "";

      if (!reader) {
        throw new Error("Failed to read response stream");
      }

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          setContent(accumulatedContent);
          setIsGenerating(false);
          break;
        }

        const text = decoder.decode(value);
        accumulatedContent += text;
        setContent(accumulatedContent);
      }
    } catch (error) {
      console.error("Error generating profile:", error);
      setIsGenerating(false);
      setError(error instanceof Error ? error.message : "Failed to generate profile");
    }
  };

  const handleEdit = () => {
    setShowEditDialog(false);
    router.push("/create?step=20");
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
      {/* Main Content Area */}
      <div className="w-full max-w-[1400px] px-8 py-20 flex-grow relative">
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
      <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
        <Card className="w-[280px] flex flex-col items-center justify-center gap-8 p-6">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-24 h-24 aspect-square">
              <AnimatedCatLogo />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {isGenerating
                ? "You're almost done, Grab something to drink while i am generating your profile..."
                : content
                ? "Like the design? Click the following button to download your profile."
                : "Click generate to create your GitHub profile"}
            </p>
            {error && (
              <p className="text-center text-sm text-error">
                {error}
              </p>
            )}
          </div>
          <div className="w-full space-y-3">
            {!isGenerating && content ? (
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
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    Going back to edit your profile will reset the current
                    README generation. You'll need to generate a new README
                    after making your changes.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowEditDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleEdit}>Continue to Edit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>
    </div>
  );
}
