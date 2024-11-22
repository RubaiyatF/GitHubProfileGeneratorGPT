"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk();
  const router = useRouter();

  useEffect(() => {
    handleRedirectCallback({
      afterSignInUrl: "/dashboard",
      afterSignUpUrl: "/dashboard",
    });
  }, [handleRedirectCallback]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-pulse text-2xl">Completing sign in...</div>
    </div>
  );
}
