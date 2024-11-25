"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import Safari from "@/components/ui/safari";
import { Loader2 } from "lucide-react";

export default function PreviewPage() {
  return (
    <div className="container h-screen mx-auto py-8 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-5xl aspect-video">
          <Safari url="github.com" className="w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center mt-12">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Generating your profile...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
