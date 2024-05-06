import Dashboard from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
export default async function Home() {
  return (
    <>
      <div>
        <div className="flex flex-col gap-4 items-center justify-center">
          <SignedOut>
            {/* Signed out users get sign in button */}

            <p>Welcome to CodeX.</p>

            <p className="font-bold">
              Please sign in to view your enrolled courses..
            </p>
            <button className="p-2 bg-primary text-white dark:text-black rounded">
              <SignInButton />
            </button>
          </SignedOut>
        </div>
        <Dashboard />
      </div>
    </>
  );
}
