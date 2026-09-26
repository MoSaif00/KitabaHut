"use client";

import Image from "next/image";
import DarkDashboard from "@/public/DarkDashboard.png";
import LightDashboard from "@/public/LightDashboard.png";
import { useTheme } from "next-themes";

export function HeroImageSwitcher() {
  const { theme, resolvedTheme } = useTheme();
  const activeTheme = resolvedTheme ?? theme;

  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-lg border shadow-2xl lg:rounded-2xl">
      <Image
        src={activeTheme === "dark" ? DarkDashboard : LightDashboard}
        alt="KitabaHut dashboard preview"
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
        className="h-auto w-full object-cover object-top"
      />
    </div>
  );
}
