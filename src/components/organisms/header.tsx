import Image from "next/image";
import Link from "next/link";
import { MenuDrawer } from "../molecules/menu-drawer";
import { Navbar } from "../molecules/navbar";

export const Header = () => (
    <>
        <div className="hidden md:block mt-4">
            <DesktopHeader />
        </div>
        <div className="block md:hidden ">
            <MobileHeader />
        </div>
    </>
);

const DesktopHeader = () => (
    <header className="w-full">
        <div className="mx-auto max-w-7xl px-8 py-4 flex justify-between items-center">
            <Link href="/">
                <Image
                    src="/logo.svg"
                    width={260}
                    height={71}
                    alt={"Nikomaru vrchat logo"}
                />
            </Link>
            <Navbar />
        </div>
    </header>
);

const MobileHeader = () => (
    <header className=" justify-between items-center mx-auto max-w-[1440px] p-6">
        <Link href="/" className="w-fit inline-block">
            <Image
                src="/logo.svg"
                width={200}
                height={45}
                alt={"Nikomaru vrchat logo"}
            />
        </Link>
        <MenuDrawer className="absolute top-6 right-6" />
    </header>
);
