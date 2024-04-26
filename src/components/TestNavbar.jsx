"use client";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";

const routeList = [
  {
    href: "/",
    label: "Dashboard",
  },
  {
    href: "https://codex.fosspage.com/",
    label: "Homepage",
  },
  {
    href: "/courses",
    label: "Explore all courses",
  },
  {
    href: "/blog",
    label: "Blog",
  },
];

export const TestNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a href="/" className="ml-2 font-bold text-xl flex">
              Code
              <span className="text-green-600">X</span>
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <div className="flex gap-2 items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SignedIn>
                {/* Mount the UserButton component */}
                <UserButton />
              </SignedIn>
              <SignedOut>
                {/* Signed out users get sign in button */}
                <SignInButton />
              </SignedOut>
              <SheetTrigger className="px-2">
                <div
                  className="flex items-center items-center m-3 md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="font-bold">Menu</span>
                </div>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">CodeX</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }) => (
                    <a
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  <a
                    href="https://github.com/prathamdupare"
                    target="_blank"
                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary",
                    })}`}
                  >
                    Github
                  </a>

                  <ModeToggle />
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route, i) => (
              <a
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <a
              href="https://github.com/prathamdupare/Codex"
              target="_blank"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              Github
            </a>

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
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
