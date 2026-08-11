import Image from "next/image";

type BgImageProps = {
    onLoaded?: () => void;
};

export const BgImage = ({ onLoaded }: BgImageProps) => {
    return (
        <>
            {/* head に巻き上げられ、フォントの preload より先に発火させる */}
            <link
                rel="preload"
                as="image"
                href="/bg-image-1.webp"
                fetchPriority="high"
            />
            <Image
                src="/bg-image-1.webp"
                blurDataURL={"/bg-image-1.webp"}
                placeholder="blur"
                alt="Background Image"
                width={1920}
                height={1080}
                className="-z-50 object-cover select-none h-[100lvh] brightness-80 saturate-80 pointer-events-none object-[45%_43%] md:object-top"
                priority
                // /_next/image は元ファイルへ 302 を返すだけなので、
                // ファーストビューの画像に往復を1つ足さないよう直接読ませる
                unoptimized
                onLoad={() => {
                    onLoaded?.();
                }}
            />
        </>
    );
};
