import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Businessman({
  position = [0, -1.5, 0],
  scale = 1.5,
}) {
  const modelRef = useRef();

  const { scene } = useGLTF("/models/businessman.glb");

  useEffect(() => {
    if (!scene) return;

    scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;

        if (object.material) {
          object.material.side = THREE.FrontSide;
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (!modelRef.current) return;

    const time = state.clock.elapsedTime;

    modelRef.current.position.y =
      position[1] + Math.sin(time * 1.2) * 0.03;

    modelRef.current.rotation.y =
      Math.sin(time * 0.4) * 0.05;
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      position={position}
      scale={scale}
    />
  );
}