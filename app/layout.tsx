import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./components/dashboard/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import {
  ClerkProvider
} from '@clerk/nextjs';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "KitabaHut",
  description: "The Ultimate Blogging Platform for Creators & Startups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

      <html lang="en">
        <body
          className={`${geistSans.className} ${geistMono.className} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

            {children}
            <Toaster
              richColors
              closeButton
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
