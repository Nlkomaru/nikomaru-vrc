import { Github, MessageSquareMore, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => (
    <footer className="w-full border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-8 py-6 md:px-8 md:py-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-0">
                {/* ロゴと説明 */}
                <div className="flex flex-col gap-3 items-center md:items-start">
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            width={160}
                            height={45}
                            className="md:w-[180px] md:h-[50px]"
                            alt={"Nikomaru vrchat logo"}
                        />
                    </Link>
                </div>

                {/* ナビゲーションリンク */}
                <div className="flex flex-col gap-6 items-center">
                    <div className="flex flex-col items-center">
                        <h3 className="font-semibold text-gray-700 text-center text-lg">
                            Social
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
            </div>
            <Copyright />
        </div>
    </footer>
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
        <div className="mt-6 pt-4 text-center md:text-left text-gray-500 text-sm md:text-base">
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
        </div>
    );
};
