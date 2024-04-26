"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
const inter = Inter({ subsets: ["latin"] });
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/lib/actions/user.actions";
import { TestNavbar } from "@/components/TestNavbar";
import { dark } from "@clerk/themes";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-background`}>
          <ThemeProvider
            className="bg-background"
            attribute="class"
            enableSystem
            disableTransitionOnChange
          >
            <TestNavbar />
            <div className="pt-[50px]">{children}</div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
