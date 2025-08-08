"use client";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { GLTFLoader } from "three-stdlib";
import { H3 } from "@/components/ui/typography";

export const Model = ({
    modelName,
    title = "Model Viewer",
}: {
    modelName: string;
    title: string;
}) => {
    const modelPath = `/model/${modelName}`;

    const { scene } = useLoader(GLTFLoader, modelPath);

    return (
        <div className="w-[400px] h-[500px] mx-auto bg-muted my-4 p-8 rounded-md shadow-lg">
            <H3>{title}</H3>
            <Canvas>
                <Suspense fallback={null}>
                    <Stage
                        preset="rembrandt"
                        intensity={1}
                        shadows="contact"
                        adjustCamera
                        environment="city"
                    >
                        <primitive object={scene} />
                    </Stage>
                    <OrbitControls autoRotate />
                </Suspense>
            </Canvas>
        </div>
    );
};
