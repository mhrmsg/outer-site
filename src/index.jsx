import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
    <>
        <Canvas
            className="r3f"
            style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                zIndex: 10,
            }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 2000,
                position: [-3, 1.5, 4],
            }}
        >
            <Experience />
        </Canvas>

        {/* <Canvas
            className="r3f"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: 100,
            }}
        >
            <Plane></Plane>
        </Canvas> */}
    </>
);
