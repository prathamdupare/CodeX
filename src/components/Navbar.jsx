"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="w-full bg-background flex items-center justify-between px-3 shadow mb-2 py-2 ">
      <div>
        <a
          href="https://codex.fosspage.com/"
          className="text-primary font-bold"
        >
          Code
          <span className="text-pink-400 font-bold">X</span>
        </a>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Button>Dashboard</Button>
        <ModeToggle />

        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton />
        </SignedIn>
        <SignedOut>
          {/* Signed out users get sign in button */}
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
