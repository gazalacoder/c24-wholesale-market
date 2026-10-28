import { Suspense } from "react";

import { Canvas } from "@react-three/fiber";

import {
  Environment,
  OrbitControls,
} from "@react-three/drei";

import Businessman from "./Businessman";

export default function Store3D() {
  return (
    <div className="store3d">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [0, 1.2, 5],
          fov: 40,
        }}
      >
        <Suspense fallback={null}>

          {/* AMBIENT LIGHT */}
          <ambientLight
            intensity={2}
          />

          {/* MAIN LIGHT */}
          <directionalLight
            position={[4, 6, 5]}
            intensity={3}
            castShadow
          />

          {/* FRONT LIGHT */}
          <directionalLight
            position={[-4, 3, 4]}
            intensity={2}
          />

          {/* CHARACTER */}

          <Businessman />

          {/* ENVIRONMENT */}

          <Environment
            preset="city"
          />

          {/* CAMERA */}

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />

        </Suspense>
      </Canvas>
    </div>
  );
}