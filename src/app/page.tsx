import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <BgImage />
            <Header />
        </>
    );
}

const FirstLatter = ({ input }: { input: string }) => {
    const upperLetter = input.toUpperCase();
    return (
        <div className="text-white font-['Montserrat'] text-4xl first-letter:text-5xl">
            {upperLetter}
        </div>
    );
};

const Title = () => {
    return (
        <div className="flex flex-col gap-2 mt-8 text-2xl text-white font-['Montserrat']">
            <div className="flex gap-6">
                <FirstLatter input="Nikomaru" />
                <FirstLatter input="VRChat" />
            </div>
            <FirstLatter input="FootPrints" />
        </div>
    );
};

const Navigation = () => {
    return (
        <div className="flex flex-col gap-4 mt-12 text-2xl text-white font-['Montserrat']">
            <Link href="/photography">Photography</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
        </div>
    );
};

const Header = () => {
    return (
        <div className="absolute top-1/8 left-1/8 text-left">
            <Title />
            <Navigation />
        </div>
    );
};

const BgImage = () => {
    return (
        <Image
            src="/bg-image.png"
            alt="Background Image"
            fill
            className="-z-50 object-cover"
        />
    );
};
