import Link from "next/link";
import { MenuDrawer } from "@/components/molecules/menu-drawer";
import { HeaderNavigation } from "./header-navigation";

export const Header = () => (
    <>
        <div className="mt-4 hidden md:block">
            <DesktopHeader />
        </div>
        <div className="block md:hidden">
            <MobileHeader />
        </div>
    </>
);

const DesktopHeader = () => (
    <header className="w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
            <Link
                href="/"
                className="text-2xl font-medium tracking-tight text-gray-900"
            >
                Nikomaru VRChat
            </Link>
            <HeaderNavigation />
        </div>
    </header>
);

const MobileHeader = () => (
    <header className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-6">
        <Link
            href="/"
            className="w-fit text-xl font-medium tracking-tight text-gray-900"
        >
            Nikomaru VRChat
        </Link>
        <MenuDrawer />
    </header>
);
