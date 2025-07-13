import { useTexture, useVideoTexture, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// const SCREEN_SIZE = { w: 1300, h: 650 };
const SCREEN_SIZE = { w: 13, h: 6.5 };

export default function Plane() {
    const screenSize = new THREE.Vector2(SCREEN_SIZE.w, SCREEN_SIZE.h);
    const videoTextures = {};
    // const position = new THREE.Vector3(1, 1, 1);
    const rotation = new THREE.Euler(
        5 * THREE.MathUtils.DEG2RAD,
        2 * THREE.MathUtils.DEG2RAD,
        0 * THREE.MathUtils.DEG2RAD
    );
    const scale = new THREE.Vector3(1, 1, 1);

    const position = new THREE.Vector3(0, 1.8, -6);

    function getVideoTextures(videoId) {
        const video = document.getElementById(videoId);
        if (!video) {
            setTimeout(() => {
                getVideoTextures(videoId);
            }, 100);
        } else {
            videoTextures[videoId] = new THREE.VideoTexture(video);
        }
    }

    /**
     * Offsets a position vector by another vector
     * @param position the position to offset
     * @param offset the offset to apply
     * @returns the new offset position
     */
    function offsetPosition(position, offset) {
        const newPosition = new THREE.Vector3();
        newPosition.copy(position);
        newPosition.add(offset);
        return newPosition;
    }

    /**
     * Adds a texture layer to the screen
     * @param texture the texture to add
     * @param blending the blending mode
     * @param opacity the opacity of the texture
     * @param offset the offset of the texture, higher values are further from the screen
     */
    function addTextureLayer(texture, blendingMode, opacity, offset) {
        // Create material
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            blending: blendingMode,
            side: THREE.DoubleSide,
            opacity,
            transparent: true,
        });

        // Create geometry
        const geometry = new THREE.PlaneGeometry(
            screenSize.width,
            screenSize.height
        );

        // Create mesh
        const mesh = new THREE.Mesh(geometry, material);

        // Copy position and apply the depth offset
        mesh.position.copy(
            offsetPosition(position, new THREE.Vector3(0, 0, offset))
        );

        // Copy rotation
        mesh.rotation.copy(rotation);
        mesh.scale.copy(scale);

        return mesh;
    }

    function createTextureLayers() {
        const monitorSmudgeTexture = useTexture(
            "../../assets/monitor/layers/compressed/smudges.jpg"
        );
        const monitorShadowTexture = useTexture(
            "../../assets/monitor/layers/compressed/shadow-compressed.png"
        );
        getVideoTextures("video-1");
        getVideoTextures("video-2");
        // Scale factor to multiply depth offset by
        const scaleFactor = 4;

        // Construct the texture layers
        const layers = {
            smudge: {
                texture: monitorSmudgeTexture,
                blending: THREE.AdditiveBlending,
                opacity: 0.12,
                offset: 0.24,
            },
            innerShadow: {
                texture: monitorShadowTexture,
                blending: THREE.NormalBlending,
                opacity: 1,
                offset: 0.05,
            },
            video: {
                texture: videoTextures["video-1"],
                blending: THREE.AdditiveBlending,
                opacity: 0.5,
                offset: 0.1,
            },
            video2: {
                texture: videoTextures["video-2"],
                blending: THREE.AdditiveBlending,
                opacity: 0.1,
                offset: 0.15,
            },
        };

        // Declare max offset
        let maxOffset = -1;

        // Add the texture layers to the screen
        const meshs = [];
        for (const [_, layer] of Object.entries(layers)) {
            const offset = layer.offset * scaleFactor;
            meshs.push(
                addTextureLayer(
                    layer.texture,
                    layer.blending,
                    layer.opacity,
                    offset
                )
            );
            // Calculate the max offset
            if (offset > maxOffset) maxOffset = offset;
        }

        // Return the max offset
        return {
            maxOffset,
            meshs,
        };
    }
    const layers = createTextureLayers();

    return (
        <>
            {layers.meshs.map((item, index) => {
                return <primitive object={item} key={index} />;
            })}
        </>
    );
}
