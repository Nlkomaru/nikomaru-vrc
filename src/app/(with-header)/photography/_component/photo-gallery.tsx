"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { blurhashToCssGradientString } from "@unpic/placeholder";
import { X } from "lucide-react";
import { type CSSProperties, useState } from "react";

export type GalleryPhoto = {
    id: string;
    width: number;
    height: number;
    blurhash: string | null;
    thumbnailSrc: string;
    imageSrc: string;
};

type PhotoGalleryProps = {
    photos: GalleryPhoto[];
};

function getBlurhashBackground(
    blurhash: string | null,
): CSSProperties | undefined {
    if (!blurhash) {
        return undefined;
    }

    try {
        return {
            backgroundImage: blurhashToCssGradientString(blurhash),
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        };
    } catch {
        // A malformed legacy hash must not prevent the published image from rendering.
        return undefined;
    }
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
    const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(
        null,
    );

    return (
        <>
            <ul
                className="grid grid-cols-2 gap-2 md:grid-cols-4"
                aria-label="Photography portfolio"
            >
                {photos.map((photo, index) => (
                    <li key={photo.id}>
                        <button
                            type="button"
                            className="block w-full cursor-zoom-in overflow-hidden bg-muted text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                            onClick={() => setSelectedPhoto(photo)}
                            aria-label={`Enlarge portfolio photo ${index + 1}`}
                        >
                            <span
                                className="relative block aspect-square overflow-hidden"
                                style={getBlurhashBackground(photo.blurhash)}
                            >
                                {/* biome-ignore lint/performance/noImgElement: The R2 thumbnail is already AVIF and must retain native lazy loading. */}
                                <img
                                    src={photo.thumbnailSrc}
                                    alt=""
                                    width={photo.width}
                                    height={photo.height}
                                    loading="lazy"
                                    decoding="async"
                                    className="absolute inset-0 size-full object-cover"
                                />
                            </span>
                        </button>
                    </li>
                ))}
            </ul>

            <Dialog.Root
                open={selectedPhoto !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setSelectedPhoto(null);
                    }
                }}
            >
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/72 backdrop-blur-sm" />
                    <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4 focus:outline-none">
                        <Dialog.Title className="sr-only">
                            Expanded portfolio photograph
                        </Dialog.Title>
                        <Dialog.Description className="sr-only">
                            Click outside the photograph or use the close button
                            to return to the gallery.
                        </Dialog.Description>
                        <Dialog.Close
                            className="absolute top-4 right-4 inline-flex size-11 items-center justify-center text-white opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:opacity-100"
                            aria-label="Close expanded photo"
                        >
                            <X aria-hidden="true" size={20} />
                        </Dialog.Close>
                        {selectedPhoto ? (
                            <>
                                {/* biome-ignore lint/performance/noImgElement: The full AVIF loads only after the user opens the lightbox. */}
                                <img
                                    src={selectedPhoto.imageSrc}
                                    alt="Expanded portfolio photograph"
                                    width={selectedPhoto.width}
                                    height={selectedPhoto.height}
                                    decoding="async"
                                    className="max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] object-contain shadow-2xl"
                                    style={getBlurhashBackground(
                                        selectedPhoto.blurhash,
                                    )}
                                />
                            </>
                        ) : null}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    );
}
