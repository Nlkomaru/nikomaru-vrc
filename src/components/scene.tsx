//https://github.com/pmndrs/zustand/blob/463c9e3ea6229bc61fb39ad850a263a10191bbc3/examples/demo/src/resources/javascript-code.js
"use client";
import { Plane, useAspect, useTexture } from "@react-three/drei";
import { createRoot, events, extend, useFrame } from "@react-three/fiber";
import {
    DepthOfField,
    EffectComposer,
    Vignette,
} from "@react-three/postprocessing";
import { MaskFunction } from "postprocessing";
import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Group, MathUtils, Mesh, PlaneGeometry, Texture, Vector3, MeshBasicMaterial } from "three";
import type { DepthOfFieldEffect } from "postprocessing";
import bearUrl from "./resources/bear.png";
import bgUrl from "./resources/bg.jpg";
import groundUrl from "./resources/ground.png";
import leaves1Url from "./resources/leaves1.png";
import leaves2Url from "./resources/leaves2.png";
import starsUrl from "./resources/stars.png";
function Experience() {
    const scaleN = useAspect(1600, 1000, 1.05);
    const scaleW = useAspect(2200, 1000, 1.05);
    const textureUrls = [
        bgUrl,
        starsUrl,
        groundUrl,
        bearUrl,
        leaves1Url,
        leaves2Url,
    ].map((t) => (typeof t === "string" ? t : (t as { src: string }).src));
    const [bgTex, starsTex, groundTex, bearTex, leaves1Tex, leaves2Tex] =
        (useTexture(textureUrls) as unknown as Texture[]);

    const group = useRef<Group | null>(null);
    const layersRef = useRef<Array<Mesh | null>>([]);
    const [movement] = useState(() => new Vector3());
    const [temp] = useState(() => new Vector3());
    const layers = [
        {
            texture: bgTex,
            x: 0,
            y: 0,
            z: 0,
            factor: 0.005,
            scale: scaleW,
        },
        {
            texture: starsTex,
            x: 0,
            y: 0,
            z: 10,
            factor: 0.005,
            scale: scaleW,
        },
        { texture: groundTex, x: 0, y: 0, z: 20, scale: scaleW },
        {
            texture: bearTex,
            x: 0,
            y: 0,
            z: 30,
            scaleFactor: 0.83,
            scale: scaleN,
        },
        {
            texture: leaves1Tex,
            x: 0,
            y: 0,
            z: 40,
            factor: 0.03,
            scaleFactor: 1,
            wiggle: 0.6,
            scale: scaleW,
        },
        {
            texture: leaves2Tex,
            x: -20,
            y: -20,
            z: 49,
            factor: 0.04,
            scaleFactor: 1.3,
            wiggle: 1,
            scale: scaleW,
        },
    ];

    // Create refs for animated layers (leaves1 and leaves2)
    const leaves1Ref = useRef<Mesh | null>(null);
    const leaves2Ref = useRef<Mesh | null>(null);
    // Store refs in layersRef for easy access in useFrame
    layersRef.current = [
        null,
        null,
        null,
        null,
        leaves1Ref.current,
        leaves2Ref.current,
    ];

    useFrame((state, delta) => {
        movement.lerp(
            temp.set(state.pointer.x, state.pointer.y * 0.2, 0),
            0.2,
        );
        if (!group.current) return;
        group.current.position.x = MathUtils.lerp(
            group.current.position.x,
            state.pointer.x * 20,
            0.05,
        );
        group.current.rotation.x = MathUtils.lerp(
            group.current.rotation.x,
            state.pointer.y / 20,
            0.05,
        );
        group.current.rotation.y = MathUtils.lerp(
            group.current.rotation.y,
            -state.pointer.x / 2,
            0.05,
        );
        // Safely update time uniforms for animated layers
        const l4 = layersRef.current[4] as any;
        const l5 = layersRef.current[5] as any;
        if (l4?.material?.uniforms?.time) {
            l4.material.uniforms.time.value += delta;
        }
        if (l5?.material?.uniforms?.time) {
            l5.material.uniforms.time.value += delta;
        }
    }, 1);

    return (
        <group ref={group}>
            {/*<Fireflies count={20} radius={80} colors={['orange']} />*/}
            {layers.map(
                (
                    {
                        scale,
                        texture,
                        factor = 0,
                        scaleFactor = 1,
                        wiggle = 0,
                        x,
                        y,
                        z,
                    },
                    i,
                ) => (
                    <Plane
                        scale={scale}
                        args={[1, 1, wiggle ? 10 : 1, wiggle ? 10 : 1]}
                        position={[x, y, z]}
                        key={i}
                        // Assign refs only to leaves1 and leaves2 planes
                        ref={i === 4 ? leaves1Ref : i === 5 ? leaves2Ref : undefined}
                    >
                        <meshBasicMaterial
                            attach="material"
                            map={texture}
                            transparent
                        />
                    </Plane>
                ),
            )}
        </group>
    );
}

function Effects() {
    const ref = useRef<DepthOfFieldEffect | null>(null);
    useLayoutEffect(() => {
        if (!ref.current) return;
        const maskMaterial = (ref.current as any).maskPass.getFullscreenMaterial();
        maskMaterial.maskFunction = MaskFunction.MULTIPLY_RGB_SET_ALPHA;
    });
    return (
        <EffectComposer enableNormalPass={false} multisampling={0}>
            <DepthOfField
                ref={ref}
                target={[0, 0, 30]}
                bokehScale={8}
                focalLength={0.2}
                width={1024}
            />
            <Vignette />
        </EffectComposer>
    );
}

function FallbackScene() {
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#010101",
            }}
        >
            <img
                src="/ogimage.jpg"
                alt="Zustand Bear"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
        </div>
    );
}

export default function Scene() {
    const [error, setError] = useState<unknown>(null);

    if (error) {
        return <FallbackScene />;
    }

    return (
        <Canvas onError={setError}>
            <Experience />
            <Effects />
        </Canvas>
    );
}

type CanvasProps = { children: ReactNode; onError?: (e: unknown) => void };

function Canvas({ children, onError }: CanvasProps) {
    extend({ Mesh, PlaneGeometry, Group, MeshBasicMaterial });
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const root = useRef<ReturnType<typeof createRoot> | null>(null);
    useLayoutEffect(() => {
        try {
            if (!root.current) {
                if (!canvas.current) return;
                root.current = createRoot(canvas.current);
                root.current.configure({
                    events,
                    orthographic: true,
                    gl: { antialias: false },
                    camera: {
                        zoom: 5,
                        position: [0, 0, 200],
                        far: 300,
                        near: 50,
                    },
                    onCreated: (state) => {
                        const ev = state.events as any;
                        if (canvas.current && ev && typeof ev.connect === "function") {
                            ev.connect(canvas.current);
                        }
                        if (state.setEvents) {
                            state.setEvents({
                                compute: (event, state) => {
                                    state.pointer.set(
                                        (event.clientX / state.size.width) * 2 -
                                            1,
                                        -(
                                            event.clientY / state.size.height
                                        ) * 2 + 1,
                                    );
                                    state.raycaster.setFromCamera(
                                        state.pointer,
                                        state.camera,
                                    );
                                },
                            });
                        }
                    },
                });
                // 初期サイズを即時反映
                root.current.configure({
                    size: {
                        width: window.innerWidth,
                        height: window.innerHeight,
                        top: 0,
                        left: 0,
                    },
                });
            }
            const resize = () =>
                root.current?.configure({
                    size: {
                        width: window.innerWidth,
                        height: window.innerHeight,
                        top: 0,
                        left: 0,
                    },
                });
            window.addEventListener("resize", resize);
            root.current?.render(children);
            return () => window.removeEventListener("resize", resize);
        } catch (e) {
            onError?.(e);
        }
    }, [children, onError]);

    return (
        <canvas
            ref={canvas}
            style={{
                position: "absolute",
                inset: 0,
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                display: "block",
            }}
        />
    );
}
