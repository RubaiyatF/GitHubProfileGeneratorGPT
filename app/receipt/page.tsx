"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import AnimatedCatLogo from "@/components/ui/animatedCatLogo";
import { QRCodeSVG } from "qrcode.react";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Download, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import FlickeringGrid from "@/components/ui/flickering-grid";

interface UserData {
  id: string;
  user_metadata: {
    avatar_url: string;
    user_name: string;
    full_name: string;
    preferred_username: string;
  };
}

interface FormData {
  accentColor: string;
}

export default function CardPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const supabase = createClient();

  const githubUrl = userData?.user_metadata?.user_name
    ? `https://github.com/${userData.user_metadata.user_name}`
    : "";

  useEffect(() => {
    const loadData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          console.log("User data in receipt page:", user);
          setUserData(user);
        }

        const storedData = localStorage.getItem("profileData");
        if (storedData) {
          const data = JSON.parse(storedData);
          console.log("Form data in receipt page:", data);
          setFormData(data);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();

    const content = localStorage.getItem("downloadContent");
    if (content) {
      const blob = new Blob([content], { type: "text/markdown" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "README.md";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      localStorage.removeItem("downloadContent");
    }
  }, []);

  const accentColor = formData?.accentColor || "#000000";
  const lightAccentColor = formData?.accentColor
    ? `${formData.accentColor}15`
    : "rgba(0,0,0,0.05)";

  const handleShare = (platform: string) => {
    const text = `Check out my GitHub profile! ${githubUrl}`;
    const url =
      platform === "twitter"
        ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
        : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            githubUrl
          )}`;
    window.open(url, "_blank");
  };

  const handleDownloadCard = () => {
    // TODO: Implement card download functionality
    console.log("Downloading card...");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <main className="flex-1 flex">
        <div className="flex-1 container mx-auto flex flex-col lg:flex-row gap-32 py-8">
          {/* Left Section - Welcome Message */}
          <div className="w-full lg:w-3/5 flex items-center">
            <div className="flex flex-col items-center lg:items-start gap-8 w-full max-w-2xl">
              <p className="text-base lg:text-lg text-muted-foreground text-center lg:text-left">
                Your GitHub Profile README will start downloading shortly
              </p>
              <h1 className="text-center lg:text-left text-5xl lg:text-7xl font-bold text-foreground">
                Thanks for using GitHub Profile Generator!
              </h1>
              <p className="text-center lg:text-left text-xl lg:text-2xl text-muted-foreground">
                We've created a GitHub profile card for you that you can
                download and share. Others can scan the QR code to quickly visit
                your GitHub profile.
              </p>
            </div>
          </div>

          {/* Right Section - Card and Buttons */}
          <div className="w-full lg:w-2/5 flex items-center">
            <div className="w-full flex flex-col items-center gap-8">
              <Card className="w-full max-w-3xl bg-white relative overflow-hidden">
                {/* Flickering Grid Background */}
                <FlickeringGrid
                  className="absolute inset-0 size-full"
                  squareSize={4}
                  gridGap={6}
                  color={accentColor}
                  maxOpacity={0.15}
                  flickerChance={0.1}
                  height={800}
                  width={800}
                />

                <div className="relative">
                  {/* Header with logo and ID */}
                  <div className="pt-4 px-8 flex items-center gap-4">
                    <div className="w-8 h-8">
                      <AnimatedCatLogo color={accentColor} />
                    </div>
                    <span
                      className="text-xs font-mono py-1 px-3 rounded-full"
                      style={{
                        backgroundColor: lightAccentColor,
                        color: accentColor,
                      }}
                    >
                      {userData?.id?.substring(0, 8)}
                    </span>
                  </div>

                  {/* Main content */}
                  <div className="px-8 py-4 flex justify-between items-center gap-12">
                    <div className="flex items-center gap-6">
                      {/* Profile image with accent border */}
                      <div
                        className="w-24 h-24 rounded-full p-1"
                        style={{ backgroundColor: accentColor }}
                      >
                        <img
                          src={userData?.user_metadata?.avatar_url}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover border-2 border-white"
                        />
                      </div>

                      {/* User details with minimal styling */}
                      <div className="space-y-2">
                        <h2 className="text-xl font-medium">
                          {userData?.user_metadata?.full_name}
                        </h2>
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base hover:opacity-80 transition-opacity inline-flex items-center gap-2"
                          style={{ color: accentColor }}
                        >
                          @{userData?.user_metadata?.user_name}
                        </a>
                      </div>
                    </div>

                    {/* QR code with subtle styling */}
                    <div
                      className="p-3 rounded-2xl"
                      style={{ backgroundColor: lightAccentColor }}
                    >
                      <QRCodeSVG
                        value={githubUrl}
                        size={150}
                        level="H"
                        includeMargin={false}
                        fgColor={accentColor}
                        bgColor="transparent"
                      />
                    </div>
                  </div>

                  {/* Footer with subtle separator */}
                  <div
                    className="h-[1px] mx-8 mb-2"
                    style={{ backgroundColor: lightAccentColor }}
                  />
                  <div className="px-8 pb-4 flex justify-between items-center">
                    <p className="text-sm" style={{ color: accentColor }}>
                      🔮 Powered by metaschool
                    </p>
                    <span
                      className="text-xs rounded-full px-3 py-1"
                      style={{
                        backgroundColor: lightAccentColor,
                        color: accentColor,
                      }}
                    >
                      GitHub Profile
                    </span>
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-6 w-full max-w-3xl justify-center">
                <Button
                  variant="outline"
                  onClick={handleDownloadCard}
                  className="group relative h-12 w-12 p-0 overflow-hidden hover:w-[160px] transition-[width] duration-300 ease-in-out"
                >
                  <Download className="h-5 w-5 absolute left-3.5" />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-12 text-sm">
                    Download
                  </span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare("twitter")}
                  className="group relative h-12 w-12 p-0 overflow-hidden hover:w-[160px] transition-[width] duration-300 ease-in-out"
                >
                  <svg className="h-5 w-5 absolute left-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-12 text-sm">
                    Share on X
                  </span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare("linkedin")}
                  className="group relative h-12 w-12 p-0 overflow-hidden hover:w-[160px] transition-[width] duration-300 ease-in-out"
                >
                  <Linkedin className="h-5 w-5 absolute left-3.5" />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-12 text-sm">
                    Share
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
