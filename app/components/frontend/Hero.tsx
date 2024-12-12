import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../dashboard/ModeToggle";
import { Button } from "@/components/ui/button";
import Logo from '@/public/kitaba.svg';
import { HeroImageSwitcher } from "./HeroImageSwitcher";
import { SignInButton, SignUpButton } from "@clerk/nextjs";


export function Hero() {

    return (
        <>
            <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
                <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
                    <Link href='/' className="flex items-center gap-2">
                        <Image src={Logo} className="size-10" alt="KitabaHut Logo" />
                        <h4 className="text-4xl font-semibold">Kitaba<span className="text-primary">Hut</span></h4>
                    </Link>
                    <div className="md:hidden">
                        <ModeToggle />
                    </div>
                </div>

                <nav className="hidden md:flex md:justify-end md:space-x-4">
                    <ModeToggle />
                    <SignInButton mode="modal">
                        <Button variant='secondary'>
                            Sign in
                        </Button>
                    </SignInButton >
                    <SignUpButton mode="modal">
                        <Button>
                            Sign up
                        </Button>
                    </SignUpButton>
                </nav>
            </div>

            <section className="relative flex items-center justify-center">
                <div className="relative items-center w-full py-12 lg:py-20">
                    <div className="text-center">
                        <span
                            className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full"
                        >
                            The Ultimate Blogging Platform for Creators & Startups
                        </span>
                        <h1
                            className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none"
                        >
                            Launch Your Blog
                            <span
                                className="block text-primary"
                            >
                                in minutes
                            </span>
                        </h1>
                        <p
                            className="max-w-xl mx-auto mt-4 text-base font-light lg:text-lg text-muted-foreground tracking-tight"
                        >
                            No coding, no hassle. Build beautiful blogs effortlessly and start sharing your ideas with the world — fast and easy.                        </p>

                        <div className="flex items-center gap-x-4 w-full justify-center mt-8">
                            <SignUpButton mode="modal">
                                <Button>
                                    Try for free
                                </Button>
                            </SignUpButton>
                        </div>
                    </div>

                    <div className="relative items-center w-full py-12 mx-auto mt-12">
                        <svg
                            className="absolute -z-10 -mt-72 left-1/2 -translate-x-1/2 w-[600px] h-[600px] opacity-60"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 800 800"
                        >
                            <defs>
                                <filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feGaussianBlur stdDeviation="97" in="SourceGraphic" result="blur" />
                                </filter>
                            </defs>
                            <g filter="url(#bbblurry-filter)">
                                <ellipse rx="131.5" ry="87.5" cx="399.6" cy="429.9" fill="#884dee" />
                            </g>
                        </svg>

                        <HeroImageSwitcher />
                    </div>
                </div>
            </section>
        </>
    );
}