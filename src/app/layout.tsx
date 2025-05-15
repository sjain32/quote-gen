
import type { Metadata } from "next";
// 1. Confirm font import 
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

// 2. Initialize the font
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Themed Quote Generator",
  description: "Generate insightful quotes filtered by theme.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          // Make sure the font's className is included here.
          // `font-sans` provides fallbacks if the google font fails.
          inter.className
        )}
      >
        {children}
      </body>
    </html>
  );
}