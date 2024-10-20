import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Group, MathUtils, Mesh } from "three";

export const ThreeElement = () => {
  const { size, gl, scene, camera } = useThree();
  const purpleRef = useRef<Mesh>(null);
  const tealRef = useRef<Mesh>(null);
  const greenRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  const earthRef = useRef<Group>(null);

  useFrame((state, delta, xrFrame) => {
    if (
      purpleRef.current &&
      tealRef.current &&
      greenRef.current &&
      groupRef.current
    ) {
      purpleRef.current.rotation.x += 0.01;
      tealRef.current.rotation.y += 0.01;
      greenRef.current.rotation.z += 0.01;
      groupRef.current.rotation.y += 0.01;
    }
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.01;
    }
  });
  return (
    <>
      <group
        position={[0, 0, 0]}
        rotation={[
          MathUtils.degToRad(0),
          MathUtils.degToRad(45),
          MathUtils.degToRad(0),
        ]}
        ref={groupRef}
      >
        <mesh
          ref={purpleRef}
          position={[0, 0, 0]}
          scale={[1, 1, 1]}
          rotation={[
            MathUtils.degToRad(0),
            MathUtils.degToRad(0),
            MathUtils.degToRad(0),
          ]}
        >
          <directionalLight position={[1, 0, 0]} intensity={3} />
          <sphereGeometry />
          <meshLambertMaterial color="gold" />
        </mesh>
        <group position={[4, 0, 0]} ref={earthRef}>
          <mesh
            ref={tealRef}
            position={[2, 1, 0]}
            scale={[0.5, 0.5, 0.5]}
            rotation={[
              MathUtils.degToRad(0),
              MathUtils.degToRad(0),
              MathUtils.degToRad(0),
            ]}
          >
            <sphereGeometry />
            <meshLambertMaterial color="#fafafa" />
          </mesh>
          <mesh
            ref={greenRef}
            position={[0, 0, 0]}
            scale={[1, 1, 1]}
            rotation={[
              MathUtils.degToRad(0),
              MathUtils.degToRad(0),
              MathUtils.degToRad(0),
            ]}
          >
            <sphereGeometry />
            <meshLambertMaterial color="teal" />
          </mesh>
        </group>
      </group>
    </>
  );
};
