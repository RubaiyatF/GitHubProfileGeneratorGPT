"use client";

import React from "react";
import { Card } from "@/components/ui/card";

export default function PreviewPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Profile Preview</h1>
        <p>Your profile preview will be generated here...</p>
      </Card>
    </div>
  );
}
