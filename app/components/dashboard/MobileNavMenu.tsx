'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { DashboardItems } from './DashboardItems';

const MobileNavMenu = ({ logo }: { logo: string | StaticImageData }) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(100%,18rem)] p-0 sm:w-72">
                <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
                <div className="flex h-full flex-col">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link
                            href={'/'}
                            className="flex min-w-0 items-center gap-2 font-semibold"
                            onClick={handleClose}
                        >
                            <Image src={logo} alt="kitaba logo" className="size-8 shrink-0" />
                            <h3 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
                                Kitaba<span className="text-primary">Hut</span>
                            </h3>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 font-medium lg:px-4">
                            <DashboardItems onItemClick={handleClose} />
                        </nav>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNavMenu;
