"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { ModeToggle } from "../dashboard/ModeToggle";
import { Button } from "@/components/ui/button";
import Logo from "@/public/kitaba.svg";
import { HeroImageSwitcher } from "./HeroImageSwitcher";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="relative flex w-full items-center justify-between gap-3 py-4 sm:py-5">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <Image
            src={Logo}
            className="size-8 shrink-0 sm:size-10"
            alt="KitabaHut Logo"
          />
          <h4 className="truncate text-2xl font-semibold sm:text-3xl md:text-4xl">
            Kitaba<span className="text-primary">Hut</span>
          </h4>
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          <ModeToggle />
          <SignInButton mode="redirect" forceRedirectUrl="/dashboard">
            <Button variant="secondary">Sign in</Button>
          </SignInButton>
          <SignUpButton mode="redirect" forceRedirectUrl="/dashboard">
            <Button>Sign up</Button>
          </SignUpButton>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="mt-10 flex flex-col gap-3">
                <SignInButton mode="redirect" forceRedirectUrl="/dashboard">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    Sign in
                  </Button>
                </SignInButton>
                <SignUpButton mode="redirect" forceRedirectUrl="/dashboard">
                  <Button className="w-full" onClick={() => setOpen(false)}>
                    Sign up
                  </Button>
                </SignUpButton>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="relative flex items-center justify-center overflow-hidden">
        <div className="relative w-full py-10 sm:py-12 lg:py-20">
          <div className="px-1 text-center sm:px-0">
            <span className="inline-block max-w-full rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium tracking-tight text-primary sm:px-4 sm:py-2 sm:text-sm">
              The Ultimate Blogging Platform for Creators & Startups
            </span>
            <h1 className="mt-6 text-4xl font-medium leading-[1.05] tracking-tight sm:mt-8 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Launch Your Blog
              <span className="block text-primary">in minutes</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm font-light tracking-tight text-muted-foreground sm:text-base lg:text-lg">
              No coding, no hassle. Build beautiful blogs effortlessly and start
              sharing your ideas with the world — fast and easy.
            </p>

            <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
              <SignUpButton mode="redirect" forceRedirectUrl="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Try for free
                </Button>
              </SignUpButton>
            </div>
          </div>

          <div className="relative mx-auto mt-10 w-full py-6 sm:mt-12 sm:py-12">
            <svg
              className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[min(100vw,28rem)] w-[min(100vw,28rem)] -translate-x-1/2 opacity-60 sm:h-[36rem] sm:w-[36rem] sm:-mt-40"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 800"
              aria-hidden
            >
              <defs>
                <filter
                  id="bbblurry-filter"
                  x="-100%"
                  y="-100%"
                  width="400%"
                  height="400%"
                  filterUnits="objectBoundingBox"
                  primitiveUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feGaussianBlur
                    stdDeviation="97"
                    in="SourceGraphic"
                    result="blur"
                  />
                </filter>
              </defs>
              <g filter="url(#bbblurry-filter)">
                <ellipse
                  rx="131.5"
                  ry="87.5"
                  cx="399.6"
                  cy="429.9"
                  fill="#884dee"
                />
              </g>
            </svg>

            <HeroImageSwitcher />
          </div>
        </div>
      </section>
    </>
  );
}
