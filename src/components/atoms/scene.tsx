import Image from "next/image";

export const Scene = () => {
    return (
        <Image
            src="/bg-image-1.png"
            blurDataURL={"/bg-image-1.png"}
            placeholder="blur"
            alt="Background Image"
            width={1920}
            height={1080}
            className="-z-50 object-cover select-none h-[100lvh] brightness-80 saturate-80 pointer-events-none object-[45%_43%] md:object-top"
            priority
        />
    );
};
