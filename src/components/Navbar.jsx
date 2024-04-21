import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";

const Navbar = async () => {
  return (
    <div className="w-full bg-background flex items-center justify-between px-3 shadow mb-2 py-2 ">
      <div>AcademiaX</div>

      <div className="flex flex-row items-center gap-4">
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
