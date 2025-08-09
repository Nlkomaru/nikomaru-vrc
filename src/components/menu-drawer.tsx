import { Menu, XIcon } from "lucide-react";
import type React from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";

export function MenuDrawer({ className }: React.ComponentProps<"div">) {
    return (
        <Dialog>
            <form>
                <DialogTrigger>
                    <Menu className={className} />
                </DialogTrigger>
                <DialogContent
                    className="w-[100lvw] h-[100lvh] rounded-none"
                    showCloseButton={false}
                >
                    <div className="grid gap-4">aaa</div>
                    <DialogFooter>sns</DialogFooter>
                    <DialogClose>
                        <XIcon className={className} />
                    </DialogClose>
                </DialogContent>
            </form>
        </Dialog>
    );
}
