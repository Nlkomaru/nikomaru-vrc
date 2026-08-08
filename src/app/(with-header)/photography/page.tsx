import { listPortfolioPhotos } from "@/lib/portfolio-photos";
import { type GalleryPhoto, PhotoGallery } from "./_component/photo-gallery";

export const dynamic = "force-dynamic";

export default async function PhotographyPage() {
    const photos = await listPortfolioPhotos();
    const galleryPhotos: GalleryPhoto[] = photos.map((photo) => ({
        ...photo,
        thumbnailSrc: `/api/photography/${encodeURIComponent(photo.id)}?variant=thumbnail`,
        imageSrc: `/api/photography/${encodeURIComponent(photo.id)}`,
    }));

    return (
        <section className="py-12">
            <h1 className="text-3xl font-bold tracking-tight">Photography</h1>
            <p className="mt-2 text-muted-foreground">
                A selection of photographs from my portfolio.
            </p>
            {galleryPhotos.length > 0 ? (
                <div className="mt-8">
                    <PhotoGallery photos={galleryPhotos} />
                </div>
            ) : (
                <p className="mt-8 text-muted-foreground">
                    No portfolio photographs have been published yet.
                </p>
            )}
        </section>
    );
}
