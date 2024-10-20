import { useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { Group, Mesh, NearestFilter } from "three";

export const ThreeElement = () => {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  const controls = useControls({
    thickness: { value: 0.1, min: 0.1, max: 10, step: 0.1 },
    roughness: { value: 0.1, min: 0.1, max: 1, step: 0.1 },
    metalness: { value: 0.1, min: 0.1, max: 1, step: 0.1 },
    clearcoat: { value: 0.1, min: 0.1, max: 1, step: 0.1 },
    clearcoatRoughness: { value: 0.1, min: 0.1, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0.1, max: 1, step: 0.1 },
    ior: { value: 1.5, min: 0.1, max: 2.33, step: 0.1 },
  });

  const matpCap = useTexture("./bloodMatCap.jpg");
  const tone = useTexture("./threeTone.jpg");
  tone.minFilter = NearestFilter;
  tone.magFilter = NearestFilter;

  useEffect(() => {
    if (groupRef.current && meshRef.current) {
      const meshLength = groupRef.current.children.length;

      for (let i = 0; i < meshLength; i++) {
        const mesh = groupRef.current.children[i] as Mesh;
        mesh.geometry = meshRef.current.geometry;
        mesh.position.x = (i % (meshLength / 2)) * 2 - 4;
        mesh.position.z = 0;
        if (i >= meshLength / 2) {
          mesh.position.z = 2;
        }
      }
    }
    // if (meshRef.current && meshRefCopy1.current && meshRefCopy2.current) {
    //    meshRefCopy1.current.geometry = meshRef.current.geometry;
    //    meshRefCopy2.current.geometry = meshRef.current.geometry;
    // }
  }, []);
  return (
    <>
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* <fog attach="fog" args={["blue", 0, 15]} /> */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.5, 0.1]} />
        <meshBasicMaterial color="green" visible={false} />
      </mesh>
      <group ref={groupRef}>
        <mesh>
          <meshMatcapMaterial matcap={matpCap} />
        </mesh>
        <mesh>
          <meshToonMaterial gradientMap={tone} color={"pink"} />
        </mesh>
        <mesh>
          <meshDepthMaterial />
        </mesh>
        <mesh>
          <meshStandardMaterial
            color="red"
            emissive="black"
            roughness={1}
            metalness={0}
            fog
          />
        </mesh>
        <mesh>
          <meshPhysicalMaterial
            fog
            color="#fff"
            emissive="black"
            visible
            opacity={1}
            transparent
            alphaTest={1}
            depthTest
            depthWrite
            roughness={controls.roughness}
            metalness={controls.metalness}
            clearcoat={controls.clearcoat}
            clearcoatRoughness={controls.clearcoatRoughness}
            transmission={controls.transmission}
            thickness={controls.thickness}
            ior={controls.ior}
          />
        </mesh>
        <mesh>
          <meshBasicMaterial color="green" wireframe />
        </mesh>
        <mesh>
          <meshBasicMaterial color="red" fog />
        </mesh>
        <mesh>
          <meshLambertMaterial color="yellow" emissive="red" />
        </mesh>
        <mesh>
          <meshPhongMaterial
            color="blue"
            emissive="black"
            fog
            specular="white"
            shininess={40}
          />
        </mesh>
        <mesh>
          <meshNormalMaterial />
        </mesh>
      </group>
    </>
  );
};
