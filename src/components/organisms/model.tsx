"use client";

import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Scene } from "three";
import { DRACOLoader, GLTFLoader } from "three-stdlib";

export const Model = ({ url, title }: { url: string; title?: string }) => {
    const modelName = url.split("?")[0].split("/").pop();
    return (
        <div className="w-[300px] md:w-[600px] h-[400px] mx-auto mt-2 p-8 bg-gradient-to-br from-slate-100 to-sky-100 rounded-lg overflow-hidden shadow-inner">
            <div className="pb-4 font-bold text-xl">{title || modelName}</div>
            <Canvas>
                <Suspense fallback={null}>
                    <ModelInner modelPath={`/api/model/${modelName}`} />
                    <OrbitControls autoRotate autoRotateSpeed={0.7} />
                </Suspense>
            </Canvas>
        </div>
    );
};

function ModelInner({ modelPath }: { modelPath: string }) {
    // クライアントサイドでのみ絶対URLを構築
    const absoluteUrl =
        typeof window !== "undefined"
            ? `${window.location.origin}${modelPath}`
            : modelPath;
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
        "https://www.gstatic.com/draco/versioned/decoders/1.5.7/",
    );
    loader.setDRACOLoader(dracoLoader);
    const scene = new Scene();
    loader.load(absoluteUrl, (gltf) => {
        scene.add(gltf.scene);
    });
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
