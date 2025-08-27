"use client";

import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { Scene } from "three";
import { DRACOLoader, GLTFLoader } from "three-stdlib";

export const Model = ({
    modelName,
    title = "Model Viewer",
}: {
    modelName: string;
    title: string;
}) => {

    let modelPath = `/model/${modelName}`;
    if (modelName.startsWith(":/")) {
        modelPath = `/model/${modelName.split(":/")[1]}`;
    }

    return (
        <div className="w-[300px] md:w-[600px] h-[400px] mx-auto my-4 p-8 bg-gradient-to-br from-slate-100 to-sky-50 rounded-lg overflow-hidden shadow-inner">
            <div className="pb-4 font-bold text-xl">{title}</div>
            <Canvas>
                <Suspense fallback={null}>
                    <ModelInner modelPath={modelPath} />
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
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
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
