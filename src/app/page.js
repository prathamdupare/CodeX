import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
export default async function Home() {
  const user = await currentUser();

  return (
    <>
      <div className="flex flex-col bg-background h-screen w-full items-center justify-center px-2">
        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton />
        </SignedIn>

        <SignedOut>
          <Button asChild>
            <SignInButton />
          </Button>
          {/* Signed out users get sign in button */}
        </SignedOut>
        <div>Hello {user?.firstName}</div>
        <p>This website is under construction..</p>
        <p>
          Please visit
          <a
            href="https://codex.fosspage.com/"
            className="text-white font-bold"
          >
            {" "}
            Codex Homepage
          </a>{" "}
          for now
        </p>
        <p>Or visit The blog page!</p>
        <p> </p>
        <Button asChild>
          <a href="/blog">Blog</a>
        </Button>
      </div>
    </>
  );
}
