"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, XIcon } from "lucide-react";

import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

// ナビゲーションアイテムの定義
const NAVIGATION_ITEMS = [
    {
        name: "Photography",
        label: "写真作品",
        url: "/photography",
    },
    {
        name: "Blog",
        label: "ブログ記事",
        url: "/blog",
    },
    {
        name: "About",
        label: "にこまるについて",
        url: "/about",
    },
];

export function MenuDrawer({ className }: React.ComponentProps<"div">) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // リンククリック時の処理
    const handleLinkClick = (url: string) => {
        setOpen(false); // ダイアログを閉じる
        router.push(url); // ページ遷移
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button type="button" className={className}>
                    <Menu className="size-8 text-gray-600" />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed left-0 top-0 w-[100vw] h-[100vh] bg-white rounded-none flex justify-center items-center">
                    <Dialog.Title className="text-lg font-semibold hidden">
                        Menu
                    </Dialog.Title>
                    <div className="flex flex-col h-full justify-center items-center">
                        <Dialog.Close asChild>
                            <button
                                type="button"
                                className="absolute top-6 right-6"
                            >
                                <XIcon className="size-8 text-gray-600" />
                            </button>
                        </Dialog.Close>

                        <ul className="flex flex-col justify-center items-center gap-10">
                            {NAVIGATION_ITEMS.map((item) => (
                                <MenuItem
                                    key={item.url}
                                    item={item}
                                    onClick={() => handleLinkClick(item.url)}
                                />
                            ))}
                        </ul>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

const MenuItem = ({
    item,
    onClick,
}: {
    item: (typeof NAVIGATION_ITEMS)[number];
    onClick: () => void;
}) => {
    return (
        <li className="flex flex-col items-center self-stretch">
            <button type="button" className="text-center" onClick={onClick}>
                <div>
                    <div className="self-stretch text-center text-base font-medium leading-[22px]">
                        {item.name}
                    </div>
                    <div className="self-stretch text-center text-xs leading-6 text-sky-600">
                        {item.label}
                    </div>
                </div>
            </button>
        </li>
    );
};
