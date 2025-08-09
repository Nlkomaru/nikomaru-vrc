import { MenuIcon } from "lucide-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";

export const MenuDrawer = () => (
    <>
        <Drawer>
            <DrawerTrigger>
                <MenuIcon className="size-10" />
            </DrawerTrigger>
            <DrawerContent className="h-[100lvh]">
                <DrawerHeader>
                    <DrawerTitle>Menu</DrawerTitle>
                    <DrawerDescription>
                        This is menu.
                    </DrawerDescription>
                </DrawerHeader>
                
                <DrawerFooter>
                    
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
);
