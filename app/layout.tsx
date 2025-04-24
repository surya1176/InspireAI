import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple, neobrutalism } from "@clerk/themes";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inspire AI",
  description: "AI Content Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple
      }}
    >
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
