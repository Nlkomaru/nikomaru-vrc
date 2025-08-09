import { MenuDrawer } from "./menu-drawer";

export const Header = () => (
    <>
        <div className="hidden md:block">
            <DesktopHeader />
        </div>
        <div className="block md:hidden">
            <MobileHeader />
        </div>
    </>
);

const DesktopHeader = () => (
    <header>

    </header>
);

const MobileHeader = () => (
    <header>
        This is mobile header
        <MenuDrawer className="absolute top-6 right-6 size-8" />
    </header>
);
