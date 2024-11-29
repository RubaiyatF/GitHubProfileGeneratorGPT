"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import AnimatedCatLogo from "@/components/ui/animatedCatLogo";
import { QRCodeSVG } from "qrcode.react";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Download, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

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
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-24 py-8 lg:py-16 min-h-[600px]">
          {/* Left Section - Welcome Message */}
          <div className="flex flex-col items-center lg:items-start justify-center gap-12 w-full lg:w-3/5">
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
          <div className="w-full lg:w-2/5 flex flex-col items-center gap-8">
            <Card className="w-full max-w-3xl bg-white relative overflow-hidden">
              {/* Decorative accent circles */}
              <div
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-10"
                style={{ backgroundColor: accentColor }}
              />
              <div
                className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full opacity-10"
                style={{ backgroundColor: accentColor }}
              />

              <div className="relative">
                {/* Header with logo and ID */}
                <div className="pt-8 px-8 flex items-center gap-4">
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
                <div className="px-8 py-8 flex justify-between items-center gap-12">
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
                  className="h-[1px] mx-8 mb-3"
                  style={{ backgroundColor: lightAccentColor }}
                />
                <div className="px-8 pb-6 flex justify-between items-center">
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
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-3xl">
              <Button
                className="flex-1"
                variant="outline"
                onClick={handleDownloadCard}
                style={{
                  borderColor: accentColor,
                  color: accentColor,
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Card
              </Button>
              <Button
                className="flex-1"
                variant="outline"
                onClick={() => handleShare("twitter")}
                style={{
                  borderColor: accentColor,
                  color: accentColor,
                }}
              >
                <Twitter className="mr-2 h-4 w-4" />
                Share on Twitter
              </Button>
              <Button
                className="flex-1"
                variant="outline"
                onClick={() => handleShare("linkedin")}
                style={{
                  borderColor: accentColor,
                  color: accentColor,
                }}
              >
                <Linkedin className="mr-2 h-4 w-4" />
                Share on LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
