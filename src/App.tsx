import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { ThreeElement } from "./ThreeElement";
import { useState } from "react";

function App() {
  const [isRotating, setIsRotating] = useState(false);
  const toggleRotation = () => setIsRotating((prev) => !prev);
  return (
    <>
      <button onClick={toggleRotation} id="rotateButton">
        {isRotating ? "Stop Rotation" : "Start Rotation"}
      </button>
      <Canvas
        id="main-canva"
        camera={{ position: [5, 5, 5], far: 20, near: 0.5 }}
      >
        <color attach="background" args={["#fafafa"]} />
        <OrbitControls autoRotate={isRotating} />
        <axesHelper args={[6]} />
        <gridHelper args={[10, 10]} />
        <ThreeElement />
      </Canvas>
    </>
  );
}

export default App;
