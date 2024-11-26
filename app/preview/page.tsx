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

export default function PreviewPage() {
  const [formData, setFormData] = useState<any>(null);
  const [content] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("profileData");
    if (storedData) {
      const data = JSON.parse(storedData);
      setFormData(data);
      console.log("Form data in preview:", data);
    }
  }, []);

  const router = useRouter();

  const handleEdit = () => {
    // Navigate back to create page with the last step (review step)
    router.push("/create?step=15"); // Assuming the review step is the 8th step
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {/* Centered Safari Component */}
      <div className="w-full max-w-[1400px] px-8">
        <Safari
          url="github.com"
          content={content}
          className="w-full h-full"
          remarkPlugins={[remarkGfm]}
        />
      </div>

      {/* Fixed Overlay Card */}
      <div className="fixed bottom-6 right-6 animate-slide-up">
        <div className="w-[280px] flex flex-col items-center justify-center gap-8 p-6 bg-card rounded-lg shadow-lg">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-24 h-24 aspect-square">
              <AnimatedCatLogo />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Like the design? Click the following button to download your
              profile.
            </p>
          </div>
          <div className="w-full space-y-3">
            <RainbowButton className="w-full">Download</RainbowButton>
            <Button
              variant="outline"
              className="w-full"
              size="lg"
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
