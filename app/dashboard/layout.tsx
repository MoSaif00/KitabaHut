import Link from "next/link";
import { ReactNode } from "react";
import Logo from '@/public/kitaba.svg';
import Image from "next/image";
import { CircleUser, Earth, Gem, Home } from "lucide-react";
import { DashboardItems } from "../components/dashboard/DashboardItems";
import { ModeToggle } from "../components/dashboard/ModeToggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SignOutButton } from '@clerk/nextjs';
import MobileNavMenu from "../components/dashboard/MobileNavMenu";

export const navLinks = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: Home
    },
    {
        name: 'Sites',
        href: '/dashboard/sites',
        icon: Earth
    },
    {
        name: 'Pricing',
        href: '/dashboard/pricing',
        icon: Gem
    },
];

export default function DashboardLayout({ children }: { children: ReactNode; }) {
    return (
        <div>
            <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                {/* Desktop Sidebar */}
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link href={'/'} className="flex items-center gap-2 font-semibold">
                                <Image src={Logo} alt="kitaba logo" className="size-8" />
                                <h3 className="text-2xl font-semibold tracking-tight">
                                    Kitaba<span className="text-primary">Hut</span>
                                </h3>
                            </Link>
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start px-2 font-medium lg:px-4">
                                <DashboardItems />
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        {/* Add Mobile Navigation */}
                        <MobileNavMenu logo={Logo} />
                        <div className="ml-auto flex items-center gap-x-5">
                            <ModeToggle />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" size="icon" className="rounded-xl">
                                        <CircleUser className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link href='/'>
                                            <SignOutButton redirectUrl="/">
                                                Log out
                                            </SignOutButton>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        {children}
                    </main>
                </div>
            </section>
        </div>
    );
}