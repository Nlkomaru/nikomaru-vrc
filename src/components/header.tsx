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
        This is desktop header
        <MenuDrawer />
    </header>
);

const MobileHeader = () => (
    <header>
        This is mobile header
        <MenuDrawer />
    </header>
);
