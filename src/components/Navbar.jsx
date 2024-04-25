"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full fixed shadow bg-background border-b flex items-center justify-between px-3 shadow mb-2 py-2 ">
      <div className="text-[25px]">
        <a
          href="https://codex.fosspage.com/"
          className="text-primary font-bold"
        >
          Code
          <span className="text-green-400 font-bold">X</span>
        </a>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Button>
          <Link href="/">Dashboard</Link>
        </Button>

        <Button className="flex items-center">
          <Link href="/courses">Explore all courses </Link>
        </Button>

        <Button asChild className="flex items-center">
          <Link href="/blog">Blog</Link>
        </Button>
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
