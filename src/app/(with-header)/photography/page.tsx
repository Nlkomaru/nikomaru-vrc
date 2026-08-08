import { listPortfolioPhotos } from "@/lib/portfolio-photos";
import { type GalleryPhoto, PhotoGallery } from "./_component/photo-gallery";

export const dynamic = "force-dynamic";

export default async function PhotographyPage() {
    const photos = await listPortfolioPhotos();
    const galleryPhotos: GalleryPhoto[] = photos.map((photo) => ({
        ...photo,
        imageSrc: `/api/photography/${encodeURIComponent(photo.id)}`,
    }));

    return (
        <section className="py-12">
            {galleryPhotos.length > 0 ? (
                <PhotoGallery photos={galleryPhotos} />
            ) : (
                <p className="text-muted-foreground">
                    No portfolio photographs have been published yet.
                </p>
            )}
        </section>
    );
}
