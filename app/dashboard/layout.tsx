import Link from "next/link";
import { ReactNode } from "react";
import Logo from "@/public/kitaba.svg";
import Image from "next/image";
import { CircleUser, Earth, Gem, Home } from "lucide-react";
import { DashboardItems } from "../components/dashboard/DashboardItems";
import { ModeToggle } from "../components/dashboard/ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import MobileNavMenu from "../components/dashboard/MobileNavMenu";
import { auth } from "@clerk/nextjs/server";

export const navLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Sites",
    href: "/dashboard/sites",
    icon: Earth,
  },
  {
    name: "Pricing",
    href: "/dashboard/pricing",
    icon: Gem,
  },
];

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await auth.protect();

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex min-w-0 items-center gap-2 font-semibold">
                <Image src={Logo} alt="kitaba logo" className="size-8 shrink-0" />
                <h3 className="truncate text-xl font-semibold tracking-tight lg:text-2xl">
                  Kitaba<span className="text-primary">Hut</span>
                </h3>
              </Link>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="grid items-start px-2 font-medium lg:px-4">
                <DashboardItems />
              </nav>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-muted/40 px-3 backdrop-blur supports-[backdrop-filter]:bg-muted/60 sm:px-4 lg:h-[60px] lg:px-6">
            <MobileNavMenu logo={Logo} />
            <div className="ml-auto flex items-center gap-2 sm:gap-x-4">
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-xl">
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Account menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <SignOutButton redirectUrl="/">
                      <button
                        type="button"
                        className="w-full cursor-pointer text-left"
                      >
                        Log out
                      </button>
                    </SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex min-w-0 flex-1 flex-col gap-4 p-3 sm:p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </section>
    </div>
  );
}
