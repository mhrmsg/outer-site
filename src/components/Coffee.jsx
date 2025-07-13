import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

import coffeeSmokeVertexShader from "../shaders/coffee/vertex.glsl";
import coffeeSmokeFragmentShader from "../shaders/coffee/fragment.glsl";
import perlinTextureImg from "/perlin.png";

/**
 * 定义 ShaderMaterial
 */
const CoffeeSmokeMaterial = shaderMaterial(
    {
        uPerlinTexture: null,
        uTime: 0,
    },
    coffeeSmokeVertexShader,
    coffeeSmokeFragmentShader
);

extend({ CoffeeSmokeMaterial });

export default function Scene({ scale = 1, position = [0, 0, 0] }) {
    const smokeMaterialRef = useRef();

    /**
     * 加载纹理
     */
    const perlinTexture = useLoader(THREE.TextureLoader, perlinTextureImg);
    perlinTexture.wrapS = THREE.RepeatWrapping;
    perlinTexture.wrapT = THREE.RepeatWrapping;

    /**
     * 加载 glTF 模型
     */
    const gltf = useGLTF("/cup.gltf");
    const smokeRef = useRef();
    /**
     * 更新动画
     */
    useFrame((state) => {
        if (smokeMaterialRef.current) {
            smokeMaterialRef.current.uTime = state.clock.elapsedTime;
        }
    });

    return (
        <group position={position} rotation={[-0.2, 0, -0.1]}>
            <primitive object={gltf.scene} scale={[scale, scale, scale]} />
            <mesh
                position={[0, 1.4, 0]}
                scale={[0.04 * scale, 0.72 * scale, 0.14 * scale]}
                ref={smokeRef}
            >
                <planeGeometry args={[1, 1, 16, 64]} />
                <coffeeSmokeMaterial
                    ref={smokeMaterialRef}
                    uPerlinTexture={perlinTexture}
                    transparent={true}
                    depthWrite={false}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
}
