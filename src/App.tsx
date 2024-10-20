import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { ThreeElement } from "./ThreeElement";

function App() {
  return (
    <>
      <Canvas
        id="main-canva"
        camera={{ zoom: 1, position: [5, 5, 5], far: 15, near: 0.5 }}
      >
        <color attach="background" args={["#fafafa"]} />
        <OrbitControls />
        <axesHelper args={[6]} />
        <gridHelper args={[10, 10, "#000000", "red"]} />
        <ThreeElement />
      </Canvas>
    </>
  );
}

export default App;
