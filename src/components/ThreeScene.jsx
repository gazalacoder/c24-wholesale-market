import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
} from "@react-three/drei";
import {
  Suspense,
  useEffect,
  useRef,
} from "react";
import * as THREE from "three";

import "./ThreeScene.css";

const ASSET_BASE = import.meta.env.BASE_URL;

/* =====================================================
   MODEL PATHS
===================================================== */

const BUSINESSMAN_MODEL =
  `${ASSET_BASE}models/businessman.glb`;

const TV_MODEL =
  `${ASSET_BASE}models/smart_tv.glb`;

const FAN_MODEL =
  `${ASSET_BASE}models/fan.glb`;

const WASHING_MACHINE_MODEL =
  `${ASSET_BASE}models/washing_machine.glb`;

const MIXER_MODEL =
  `${ASSET_BASE}models/mixer.glb`;


/* =====================================================
   SHOWROOM ENVIRONMENT
===================================================== */

function ShowroomEnvironment() {
  return (
    <group>

      {/* FLOOR */}

      <mesh
        position={[0, -2.15, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry
          args={[24, 18]}
        />

        <meshStandardMaterial
          color="#05070a"
          metalness={0.85}
          roughness={0.28}
        />
      </mesh>


      {/* BACK WALL */}

      <mesh
        position={[0, 2.5, -4]}
      >
        <boxGeometry
          args={[18, 9, 0.25]}
        />

        <meshStandardMaterial
          color="#07090d"
          metalness={0.55}
          roughness={0.4}
        />
      </mesh>


      {/* LEFT WALL */}

      <mesh
        position={[-9, 2.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry
          args={[18, 9, 0.25]}
        />

        <meshStandardMaterial
          color="#05070a"
          metalness={0.5}
          roughness={0.45}
        />
      </mesh>


      {/* RIGHT WALL */}

      <mesh
        position={[9, 2.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry
          args={[18, 9, 0.25]}
        />

        <meshStandardMaterial
          color="#05070a"
          metalness={0.5}
          roughness={0.45}
        />
      </mesh>


      {/* BACK GLASS */}

      <mesh
        position={[0, 1.2, -3.82]}
      >
        <planeGeometry
          args={[11, 5]}
        />

        <meshBasicMaterial
          color="#061923"
          transparent
          opacity={0.65}
        />
      </mesh>


      {/* RED HORIZONTAL NEON */}

      <mesh
        position={[0, -1.45, -3.65]}
      >
        <boxGeometry
          args={[11, 0.035, 0.035]}
        />

        <meshBasicMaterial
          color="#ff1744"
        />
      </mesh>


      {/* CYAN HORIZONTAL NEON */}

      <mesh
        position={[0, -1.52, -3.65]}
      >
        <boxGeometry
          args={[7, 0.018, 0.018]}
        />

        <meshBasicMaterial
          color="#00d9ff"
        />
      </mesh>


      {/* LEFT VERTICAL NEON */}

      <mesh
        position={[-5.2, 1, -3.6]}
      >
        <boxGeometry
          args={[0.035, 6, 0.035]}
        />

        <meshBasicMaterial
          color="#00d9ff"
        />
      </mesh>


      {/* RIGHT VERTICAL NEON */}

      <mesh
        position={[5.2, 1, -3.6]}
      >
        <boxGeometry
          args={[0.035, 6, 0.035]}
        />

        <meshBasicMaterial
          color="#ff1744"
        />
      </mesh>


      {/* CEILING LIGHTS */}

      <mesh
        position={[-3, 4.5, -1]}
      >
        <boxGeometry
          args={[4, 0.04, 0.04]}
        />

        <meshBasicMaterial
          color="#ffffff"
        />
      </mesh>


      <mesh
        position={[3, 4.5, -1]}
      >
        <boxGeometry
          args={[4, 0.04, 0.04]}
        />

        <meshBasicMaterial
          color="#ffffff"
        />
      </mesh>


      {/* SHOWROOM LIGHTS */}

      <pointLight
        position={[5, 2, -2]}
        intensity={10}
        distance={16}
        color="#ff1744"
      />

      <pointLight
        position={[-5, 2, -2]}
        intensity={10}
        distance={16}
        color="#00cfff"
      />

      <pointLight
        position={[0, 4, -2]}
        intensity={8}
        distance={14}
        color="#ffffff"
      />

    </group>
  );
}


/* =====================================================
   BUSINESSMAN
===================================================== */

function Businessman() {
  const modelRef = useRef();

  const { scene } =
    useGLTF(BUSINESSMAN_MODEL);


  useEffect(() => {
    scene.traverse((child) => {

      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }

    });
  }, [scene]);


  useFrame(({ clock }) => {

    if (!modelRef.current) {
      return;
    }

    const t =
      clock.getElapsedTime();


    /* Gentle floating */

    modelRef.current.position.y =
      -1.25 +
      Math.sin(t * 1.5) * 0.04;


    /* Small natural movement */

    modelRef.current.rotation.y =
      Math.sin(t * 0.55) * 0.10;

  });


  return (
    <group
      ref={modelRef}
      position={[0.9, -1.25, 0]}
      scale={2.8}
    >

      <primitive
        object={scene}
      />

    </group>
  );
}


/* =====================================================
   PRODUCT
===================================================== */

function Product({
  path,
  position,
  scale,
  delay = 0,
}) {

  const modelRef = useRef();

  const { scene } =
    useGLTF(path);


  useEffect(() => {

    scene.traverse((child) => {

      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }

    });

  }, [scene]);


  useFrame(({ clock }) => {

    if (!modelRef.current) {
      return;
    }

    const t =
      clock.getElapsedTime();


    /*
      Product entrance
    */

    const startTime =
      0.8 + delay * 0.35;

    const elapsed =
      Math.max(
        0,
        t - startTime
      );

    const progress =
      Math.min(
        elapsed / 1.2,
        1
      );

    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );


    const startZ =
      position[2] - 2;


    modelRef.current.position.x =
      position[0];

    modelRef.current.position.y =
      position[1] +
      Math.sin(
        t * 1.1 + delay
      ) * 0.06;

    modelRef.current.position.z =
      THREE.MathUtils.lerp(
        startZ,
        position[2],
        eased
      );


    modelRef.current.rotation.y =
      Math.sin(
        t * 0.6 + delay
      ) * 0.12;


    const currentScale =
      THREE.MathUtils.lerp(
        0.01,
        scale,
        eased
      );

    modelRef.current.scale.setScalar(
      currentScale
    );

  });


  return (
    <group
      ref={modelRef}
      position={[
        position[0],
        position[1],
        position[2] - 2,
      ]}
      scale={0.01}
    >

      <primitive
        object={scene}
      />

    </group>
  );
}


/* =====================================================
   PRODUCTS
===================================================== */

function Products() {
  return (
    <>

      {/* SMART TV */}

      <Product
        path={TV_MODEL}
        position={[-3.0, 1.05, -0.8]}
        scale={0.70}
        delay={0}
      />


      {/* FAN */}

      <Product
        path={FAN_MODEL}
        position={[3.0, 1.35, -0.7]}
        scale={0.70}
        delay={1}
      />


      {/* WASHING MACHINE */}

      <Product
        path={WASHING_MACHINE_MODEL}
        position={[-3.0, -1.30, 0]}
        scale={0.70}
        delay={2}
      />


      {/* MIXER */}

      <Product
        path={MIXER_MODEL}
        position={[3.0, -1.35, 0]}
        scale={0.65}
        delay={3}
      />

    </>
  );
}


/* =====================================================
   PRODUCT GLOW
===================================================== */

function ProductGlow({
  position,
  color,
}) {

  const glowRef = useRef();


  useFrame(({ clock }) => {

    if (!glowRef.current) {
      return;
    }

    const pulse =
      1 +
      Math.sin(
        clock.getElapsedTime() * 2
      ) * 0.10;

    glowRef.current.scale.setScalar(
      pulse
    );

  });


  return (
    <mesh
      ref={glowRef}
      position={position}
    >

      <sphereGeometry
        args={[0.8, 32, 32]}
      />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.07}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />

    </mesh>
  );
}


/* =====================================================
   CAMERA
===================================================== */

function CameraController() {

  useFrame(({ camera, clock }) => {

    const t =
      clock.getElapsedTime();


    camera.position.x =
      THREE.MathUtils.lerp(
        camera.position.x,
        Math.sin(t * 0.18) * 0.25,
        0.025
      );


    camera.position.y =
      THREE.MathUtils.lerp(
        camera.position.y,
        0.1 +
          Math.sin(t * 0.20) * 0.05,
        0.025
      );


    camera.position.z =
      THREE.MathUtils.lerp(
        camera.position.z,
        9,
        0.025
      );


    camera.lookAt(
      0,
      -0.35,
      -1.2
    );

  });


  return null;
}


/* =====================================================
   SCENE CONTENT
===================================================== */

function SceneContent() {

  return (
    <>

      <ShowroomEnvironment />

      <CameraController />

      <Businessman />

      <Products />


      <ProductGlow
        position={[-3, 1.05, -0.8]}
        color="#00cfff"
      />

      <ProductGlow
        position={[3, 1.35, -0.7]}
        color="#ff1744"
      />

      <ProductGlow
        position={[-3, -1.3, 0]}
        color="#00cfff"
      />

      <ProductGlow
        position={[3, -1.35, 0]}
        color="#ff1744"
      />

    </>
  );
}


/* =====================================================
   MAIN THREE SCENE
===================================================== */

export default function ThreeScene() {

  return (
    <section className="three-showroom">

      <Canvas
        camera={{
          position: [0, 0, 14],
          fov: 42,
        }}

        dpr={[1, 1.5]}

        gl={{
          antialias: true,
          powerPreference:
            "high-performance",
        }}

        shadows
      >

        <color
          attach="background"
          args={["#000208"]}
        />


        {/* MAIN LIGHT */}

        <ambientLight
          intensity={1.5}
        />


        <directionalLight
          position={[5, 7, 6]}
          intensity={3}
          castShadow
        />


        {/* CYAN */}

        <pointLight
          position={[-4, 2, 4]}
          intensity={14}
          distance={18}
          color="#00cfff"
        />


        {/* RED */}

        <pointLight
          position={[4, 2, 4]}
          intensity={14}
          distance={18}
          color="#ff1744"
        />


        {/* FRONT WHITE LIGHT
            Businessman clearly visible */}

        <pointLight
          position={[0, 2, 6]}
          intensity={10}
          distance={16}
          color="#ffffff"
        />


        <Environment
          preset="city"
        />


        <Suspense fallback={null}>

          <SceneContent />

        </Suspense>

      </Canvas>


      <div className="floor-line" />

    </section>
  );
}


/* =====================================================
   PRELOAD MODELS
===================================================== */

useGLTF.preload(
  BUSINESSMAN_MODEL
);

useGLTF.preload(
  TV_MODEL
);

useGLTF.preload(
  FAN_MODEL
);

useGLTF.preload(
  WASHING_MACHINE_MODEL
);

useGLTF.preload(
  MIXER_MODEL
);