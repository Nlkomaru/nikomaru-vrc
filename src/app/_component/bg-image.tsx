import Image from "next/image";

type BgImageProps = {
    onLoaded?: () => void;
};

export const BgImage = ({ onLoaded }: BgImageProps) => {
    return (
        <Image
            src="/bg-image-1.png"
            alt="Background Image"
            width={1920}
            height={1080}
            className="-z-50 object-cover select-none h-[100lvh] brightness-80 saturate-80 pointer-events-none object-[45%_43%] md:object-top"
            priority
            onLoadingComplete={() => {
                onLoaded?.();
            }}
        />
    );
};
