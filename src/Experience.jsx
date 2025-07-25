import {
    Text,
    Html,
    ContactShadows,
    PresentationControls,
    Float,
    Environment,
    useGLTF,
    OrbitControls,
} from "@react-three/drei";
import { useEffect } from "react";
import Coffee from "./components/Coffee";
import Loading from "./libs/Loading";
export default function Experience() {
    const computer = useGLTF(
        // "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
        "/desktop_computer/scene.gltf"
    );

    const loadding = new Loading();
    useEffect(() => {
        loadding.trigger("loadedSource", ["computer", 2, 3]);
    }, [computer]);

    const iframeLoadding = (e) => {
        loadding.trigger("loadedSource", ["innerSite", 3, 3]);
    };

    return (
        <>
            {/* <OrbitControls makeDefault></OrbitControls> */}
            <color args={["#241a1a"]} attach="background" />

            <Environment preset="city" />

            <PresentationControls
                global
                rotation={[0.13, 0.1, 0]}
                polar={[-0.4, 0.2]}
                azimuth={[-1, 0.75]}
                damping={0.1}
                snap
            >
                {/* <Float rotationIntensity={0.4}> */}
                {/* <rectAreaLight
                    width={2.5}
                    height={1.65}
                    intensity={65}
                    color={"#ff6900"}
                    rotation={[-0.1, Math.PI, 0]}
                    position={[0, 0.55, -1.15]}
                /> */}

                <primitive
                    object={computer.scene}
                    position={[0.2, -1.1, -0.1]}
                    rotation={[-0.345, -0.68, -0.16]}
                >
                    <Html
                        transform
                        wrapperClass="htmlScreen"
                        distanceFactor={1.17}
                        position={[-0, 1.45, -0.24]}
                        rotation={[-0, -0, -0.0]}
                    >
                        <iframe
                            src="https://42.192.112.223:9002/"
                            onLoad={iframeLoadding}
                        />
                    </Html>
                </primitive>

                <Text
                    font="./bangers-v20-latin-regular.woff"
                    fontSize={1}
                    position={[3, 0.15, 1.85]}
                    rotation-y={-1.25}
                    maxWidth={2}
                >
                    MHR
                </Text>
                {/* </Float> */}

                <Coffee
                    position={[1.4, -1, 1.64]}
                    scale={3}
                    rotation={[-0.2, 0, -0.1]}
                ></Coffee>
            </PresentationControls>

            <ContactShadows
                position-y={-1.4}
                opacity={0.4}
                scale={5}
                blur={2.4}
            />
        </>
    );
}
