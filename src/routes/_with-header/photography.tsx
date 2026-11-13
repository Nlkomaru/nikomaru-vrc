import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import {
    type GalleryPhoto,
    PhotoGallery,
} from "@/components/photography/photo-gallery";
import { listPortfolioPhotos } from "@/lib/portfolio-photos";

const loadGalleryPhotos = createServerFn({ method: "GET" }).handler(
    async (): Promise<GalleryPhoto[]> => {
        const photos = await listPortfolioPhotos();
        return photos.map((photo) => ({
            ...photo,
            imageSrc: `/api/photography/${encodeURIComponent(photo.id)}`,
        }));
    },
);

export const Route = createFileRoute("/_with-header/photography")({
    loader: () => loadGalleryPhotos(),
    component: PhotographyPage,
});

function PhotographyPage() {
    const galleryPhotos = Route.useLoaderData();

    return (
        <section>
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
