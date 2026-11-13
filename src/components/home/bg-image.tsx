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
            <img
                src="/bg-image-1.webp"
                alt="Background Image"
                width={1920}
                height={1080}
                decoding="sync"
                fetchPriority="high"
                className="-z-50 w-full object-cover select-none h-[100lvh] brightness-80 saturate-80 pointer-events-none object-[45%_43%] md:object-top"
                onLoad={() => {
                    onLoaded?.();
                }}
            />
        </>
    );
};
