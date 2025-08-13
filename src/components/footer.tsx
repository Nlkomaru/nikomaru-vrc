import { Github, MessageSquareMore, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => (
    <>
        <div className="hidden md:block">
            <DesktopFooter />
        </div>
        <div className="block md:hidden">
            <MobileFooter />
        </div>
    </>
);

type SocialLink = {
    href: string;
    icon: React.ReactNode;
    label: string;
};

const socialLinks: SocialLink[] = [
    {
        href: "https://vrchat.com/home/user/usr_ec9db8d2-8f6c-4bb3-97f3-a1d4183dd35c",
        icon: (
            <MessageSquareMore size={20} className="transform-[scale(-1,1)]" />
        ),
        label: "VRChat",
    },
    {
        href: "https://x.com/nikomaru_vrc",
        icon: <Twitter size={20} />,
        label: "Twitter",
    },

    {
        href: "https://github.com/nlkomaru",
        icon: <Github size={20} />,
        label: "GitHub",
    },
];

const Copyright = () => {
    return (
        <p>
            Written by Nikomaru in 2025.{" "}
            <a
                href="https://github.com/Nlkomaru/nikomaru-vrc/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 underline"
            >
                No rights reserved.
            </a>
        </p>
    );
};

const DesktopFooter = () => (
    <footer className="w-full bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-8 py-6">
            <div className="flex justify-between items-center">
                {/* ロゴと説明 */}
                <div className="flex flex-col gap-3">
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            width={180}
                            height={50}
                            alt={"Nikomaru vrchat logo"}
                        />
                    </Link>
                </div>

                {/* ナビゲーションリンク */}
                <div className="flex gap-16">
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-gray-800 text-lg">
                            Social
                        </h3>
                        <div className="flex gap-3">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
                                    aria-label={link.label}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* コピーライト */}
            <div className="mt-6 pt-4 border-t border-gray-200 text-center text-gray-500">
                <Copyright />
            </div>
        </div>
    </footer>
);

const MobileFooter = () => (
    <footer className="w-full bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-[1440px] p-6">
            <div className="flex flex-col gap-6">
                {/* ロゴと説明 */}
                <div className="flex flex-col gap-3">
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            width={160}
                            height={45}
                            alt={"Nikomaru vrchat logo"}
                        />
                    </Link>
                </div>

                {/* ソーシャルリンク - 中央寄せで横並び */}
                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold text-gray-800 text-center">
                        ソーシャル
                    </h3>
                    <div className="flex justify-center gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
                                aria-label={link.label}
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* コピーライト */}
            <div className="mt-6 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
                <Copyright />
            </div>
        </div>
    </footer>
);
