import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dotan's Project",
  description: "This is the final project for the B.Sc by Dotan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="he-IL" dir="rtl" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
