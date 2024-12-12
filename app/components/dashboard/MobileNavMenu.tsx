'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { DashboardItems } from './DashboardItems';

const MobileNavMenu = ({ logo }: { logo: string; }) => {
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
            <SheetContent side="left" className="w-72 p-0">
                <div className="flex h-full flex-col">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link
                            href={'/'}
                            className="flex items-center gap-2 font-semibold"
                            onClick={handleClose}
                        >
                            <Image src={logo} alt="kitaba logo" className="size-8" />
                            <h3 className="text-2xl font-semibold tracking-tight">
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