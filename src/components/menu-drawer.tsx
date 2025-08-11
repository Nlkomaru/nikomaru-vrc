import * as Dialog from "@radix-ui/react-dialog";
import { Menu, XIcon } from "lucide-react";
import type React from "react";

export function MenuDrawer({ className }: React.ComponentProps<"div">) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className={className}>
                    <Menu className="size-8" />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed left-0 top-0 w-[100vw] h-[100vh] bg-white rounded-none">
                    <Dialog.Title className="text-lg font-semibold hidden">
                        Menu
                    </Dialog.Title>
                    <div className="flex flex-col h-full">
                        <Dialog.Close asChild>
                            <button className={className}>
                                <XIcon className="size-8" />
                            </button>
                        </Dialog.Close>

                        <div className="flex-1 p-4">
                            <div className="grid gap-4">
                                {/* メニューアイテムをここに追加 */}
                                <div>メニューアイテム1</div>
                                <div>メニューアイテム2</div>
                                <div>メニューアイテム3</div>
                            </div>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
