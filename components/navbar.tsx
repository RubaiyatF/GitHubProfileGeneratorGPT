import React from "react";
import Logo from "./ui/logo";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-background border-border">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 w-full">
          <div className="flex-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8">
                <Logo />
              </div>
              <span className="text-xl font-semibold whitespace-nowrap text-foreground">
                GitHub Profile Generator
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
