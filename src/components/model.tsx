"use client";

import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { GLTFLoader } from "three-stdlib";

export const Model = ({
    modelName,
    title = "Model Viewer",
}: {
    modelName: string;
    title: string;
}) => {
    const modelPath = `/model/${modelName}`;

    // Avoid running useLoader on the server by delegating to a client-only child
    // Server will render nothing to prevent Invalid URL from node's URL parser
    const isServer = typeof window === "undefined";

    return (
        <div className="w-[600px] h-[400px] mx-auto my-4 p-8 bg-gradient-to-br from-slate-100 to-sky-50 rounded-lg overflow-hidden shadow-inner">
            <div className="pb-4 font-bold text-xl">{title}</div>
            {!isServer ? (
                <Canvas>
                    <Suspense fallback={null}>
                        <ModelInner modelPath={modelPath} />
                        <OrbitControls autoRotate autoRotateSpeed={0.7} />
                    </Suspense>
                </Canvas>
            ) : null}
        </div>
    );
};

function ModelInner({ modelPath }: { modelPath: string }) {
    // Build an absolute URL on the client to satisfy loaders that expect it
    const absoluteUrl =
        typeof window !== "undefined"
            ? `${window.location.origin}${modelPath}`
            : modelPath;
    const { scene } = useLoader(GLTFLoader, absoluteUrl);
    return (
        <Stage
            adjustCamera
            environment="city"
            shadows={{ type: "contact", opacity: 0.2, blur: 3 }}
            intensity={0.6}
            preset="portrait"
        >
            <primitive object={scene} />
        </Stage>
    );
}
