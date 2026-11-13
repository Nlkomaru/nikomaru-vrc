export const Scene = () => {
    return (
        <img
            src="/bg-image-1.webp"
            alt="Background Image"
            width={1920}
            height={1080}
            fetchPriority="high"
            className="-z-50 w-full object-cover select-none h-[100lvh] brightness-80 saturate-80 pointer-events-none object-[45%_43%] md:object-top"
        />
    );
};
