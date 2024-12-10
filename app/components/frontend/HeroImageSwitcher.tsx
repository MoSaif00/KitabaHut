"use client";

import Image from "next/image";
import DarkDashboard from '@/public/DarkDashboard.png';
import LightDashboard from '@/public/LightDashboard.png';
import { useTheme } from "next-themes";

export function HeroImageSwitcher() {
    const { theme } = useTheme();

    return (
        <Image
            src={theme === "dark" ? DarkDashboard : LightDashboard}
            alt="Hero Image"
            className="relative object-cover w-full border rounded-lg shadow-2xl lg:rounded-2xl "
        />
    );
}