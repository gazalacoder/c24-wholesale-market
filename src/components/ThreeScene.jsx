import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Stars,
  useGLTF,
} from "@react-three/drei";
import {
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import "./ThreeScene.css";
const ASSET_BASE = import.meta.env.BASE_URL;

/* =====================================================
   GALAXY PORTAL
===================================================== */

function GalaxyPortal({ showroom }) {
  const portal = useRef();
  const outerRing = useRef();
  const innerRing = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (outerRing.current) {
      outerRing.current.rotation.z =
        t * 0.45;

      outerRing.current.rotation.x =
        Math.sin(t * 0.25) * 0.15;
    }

    if (innerRing.current) {
      innerRing.current.rotation.z =
        -t * 0.65;

      innerRing.current.rotation.y =
        Math.cos(t * 0.3) * 0.12;
    }

    if (portal.current) {
      const pulse =
        1 +
        Math.sin(t * 2) * 0.04;

      const target =
        showroom ? 2.8 : pulse;

      portal.current.scale.lerp(
        new THREE.Vector3(
          target,
          target,
          target
        ),
        showroom ? 0.035 : 0.02
      );
    }
  });

  return (
    <group ref={portal}>

      {/* DEEP SPACE */}

      <Stars
        radius={85}
        depth={55}
        count={6000}
        factor={4}
        saturation={0}
        fade
        speed={0.8}
      />

      {/* BLUE GALAXY CORE */}

      <mesh
        position={[0, 0, -5]}
      >
        <sphereGeometry
          args={[3.3, 64, 64]}
        />

        <meshBasicMaterial
          color="#063b72"
          transparent
          opacity={0.22}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
        />
      </mesh>

      {/* OUTER PORTAL */}

      <mesh
        ref={outerRing}
        position={[0, 0, -4]}
      >
        <torusGeometry
          args={[
            2.8,
            0.13,
            32,
            180,
          ]}
        />

        <meshBasicMaterial
          color="#00cfff"
          transparent
          opacity={0.9}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      {/* SECOND RING */}

      <mesh
        ref={innerRing}
        position={[0, 0, -4.1]}
      >
        <torusGeometry
          args={[
            2.25,
            0.07,
            24,
            140,
          ]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.75}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      {/* RED ACCENT RING */}

      <mesh
        position={[0, 0, -4.2]}
        rotation={[0, 0, Math.PI / 3]}
      >
        <torusGeometry
          args={[
            2.5,
            0.035,
            20,
            120,
          ]}
        />

        <meshBasicMaterial
          color="#ff1648"
          transparent
          opacity={0.7}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      {/* CENTER LIGHT */}

      <pointLight
        position={[0, 0, -2]}
        intensity={40}
        distance={25}
        color="#00cfff"
      />

      <pointLight
        position={[2, 1, -2]}
        intensity={20}
        distance={18}
        color="#ff1744"
      />

      <pointLight
        position={[-2, -1, -2]}
        intensity={15}
        distance={18}
        color="#ffffff"
      />

    </group>
  );
}

/* =====================================================
   BUSINESSMAN
===================================================== */

function Businessman({ showroom }) {
  const ref = useRef();

  const { scene } = useGLTF(
    `${ASSET_BASE}models/businessman.glb`
  );

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t =
      clock.getElapsedTime();

    /*
      BEFORE SHOWROOM:
      character remains behind portal
    */

    const targetX = showroom
      ? 1.15
      : 4.5;

    const targetZ = showroom
      ? 0
      : -5;

    const targetY = -1.25;

    ref.current.position.x =
      THREE.MathUtils.lerp(
        ref.current.position.x,
        targetX,
        0.025
      );

    ref.current.position.y =
      THREE.MathUtils.lerp(
        ref.current.position.y,
        targetY +
          Math.sin(t * 1.4) *
            0.025,
        0.025
      );

    ref.current.position.z =
      THREE.MathUtils.lerp(
        ref.current.position.z,
        targetZ,
        0.025
      );

    /*
      CINEMATIC BODY MOTION
    */

    ref.current.rotation.y =
      Math.sin(t * 0.65) *
      0.08;

    ref.current.rotation.z =
      Math.sin(t * 1.1) *
      0.012;

    /*
      SLIGHT PRESENTATION MOVEMENT
    */

    if (showroom) {
      ref.current.rotation.y =
        Math.sin(t * 0.8) *
        0.12;
    }
  });

  return (
    <group
      ref={ref}
      position={[
        4.5,
        -1.25,
        -5,
      ]}
      scale={2.8}
    >
      <primitive object={scene} />
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
  delay,
}) {
  const ref = useRef();

  const { scene } = useGLTF(path);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t =
      clock.getElapsedTime() +
      delay;

    /*
      FLOAT
    */

    ref.current.position.y =
      position[1] +
      Math.sin(t * 1.15) *
        0.10;

    /*
      ROTATION
    */

    ref.current.rotation.y =
      Math.sin(t * 0.7) *
      0.15;

    ref.current.rotation.x =
      Math.sin(t * 0.45) *
      0.025;
  });

  return (
    <group
      ref={ref}
      position={position}
      scale={scale}
    >
      <primitive object={scene} />
    </group>
  );
}

/* =====================================================
   PRODUCTS
===================================================== */

function Products() {
  return (
    <>
      {/* TV */}

      <Product
        path={`${ASSET_BASE}models/smart_tv.glb`}
        position={[
          3.1,
          1.15,
          -0.8,
        ]}
        scale={0.72}
        delay={0}
      />

      {/* FAN */}

      <Product
        path={`${ASSET_BASE}models/fan.glb`}
        position={[
          -3.0,
          1.45,
          -0.7,
        ]}
        scale={0.72}
        delay={1}
      />

      {/* WASHING MACHINE */}

      <Product
        path={`${ASSET_BASE}models/washing_machine.glb`}
        position={[
          3.0,
          -1.35,
          0,
        ]}
        scale={0.72}
        delay={2}
      />

      {/* MIXER */}

      <Product
        path={`${ASSET_BASE}models/mixer.glb`}
        position={[
          -3.0,
          -1.35,
          0,
        ]}
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
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const pulse =
      1 +
      Math.sin(
        clock.getElapsedTime() * 2
      ) *
        0.12;

    ref.current.scale.setScalar(
      pulse
    );
  });

  return (
    <mesh
      ref={ref}
      position={position}
    >
      <sphereGeometry
        args={[
          0.8,
          32,
          32,
        ]}
      />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.075}
        blending={
          THREE.AdditiveBlending
        }
        depthWrite={false}
      />
    </mesh>
  );
}

/* =====================================================
   CAMERA CINEMATIC MOVEMENT
===================================================== */

function CameraController({
  showroom,
}) {
  useFrame(
    ({ camera, clock }) => {
      const t =
        clock.getElapsedTime();

      /*
        GALAXY SHOT
      */

      const targetZ = showroom
        ? 9
        : 14;

      const targetY = showroom
        ? 0.2
        : 0;

      camera.position.z =
        THREE.MathUtils.lerp(
          camera.position.z,
          targetZ,
          0.025
        );

      camera.position.x =
        THREE.MathUtils.lerp(
          camera.position.x,
          Math.sin(
            t * 0.18
          ) * 0.15,
          0.025
        );

      camera.position.y =
        THREE.MathUtils.lerp(
          camera.position.y,
          targetY +
            Math.cos(
              t * 0.15
            ) *
              0.08,
          0.025
        );

      camera.lookAt(
        0,
        -0.15,
        0
      );
    }
  );

  return null;
}

/* =====================================================
   SCENE CONTENT
===================================================== */

function SceneContent({
  showroom,
}) {
  return (
    <>
      <GalaxyPortal
        showroom={showroom}
      />

      <CameraController
        showroom={showroom}
      />

      <Businessman
        showroom={showroom}
      />

      {showroom && (
        <>
          <Products />

          <ProductGlow
            position={[
              3.1,
              1.15,
              -0.8,
            ]}
            color="#00cfff"
          />

          <ProductGlow
            position={[
              -3,
              1.45,
              -0.7,
            ]}
            color="#ff1744"
          />

          <ProductGlow
            position={[
              3,
              -1.35,
              0,
            ]}
            color="#00cfff"
          />

          <ProductGlow
            position={[
              -3,
              -1.35,
              0,
            ]}
            color="#ff1744"
          />
        </>
      )}
    </>
  );
}

/* =====================================================
   MAIN THREE SCENE
===================================================== */

export default function ThreeScene() {
  const [showroom, setShowroom] =
    useState(false);

  useEffect(() => {
    /*
      0–3 sec:
      GALAXY PORTAL
    */

    const timer =
      setTimeout(() => {
        setShowroom(true);
      }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="three-showroom">

      {/* =============================================
          3D SCENE
      ============================================= */}

      <Canvas
        camera={{
          position: [
            0,
            0,
            14,
          ],
          fov: 42,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference:
            "high-performance",
        }}
      >

        <color
          attach="background"
          args={[
            "#000208",
          ]}
        />

        {/* LIGHTING */}

        <ambientLight
          intensity={1.6}
        />

        <directionalLight
          position={[
            5,
            7,
            6,
          ]}
          intensity={3}
        />

        <directionalLight
          position={[
            -5,
            4,
            3,
          ]}
          intensity={1.5}
          color="#ff3155"
        />

        <pointLight
          position={[
            -4,
            2,
            4,
          ]}
          intensity={14}
          distance={15}
          color="#00cfff"
        />

        <pointLight
          position={[
            4,
            2,
            4,
          ]}
          intensity={14}
          distance={15}
          color="#ff1744"
        />

        <Environment
          preset="city"
        />

        <Suspense fallback={null}>
          <SceneContent
            showroom={
              showroom
            }
          />
        </Suspense>

      </Canvas>

      {/* =============================================
          GALAXY TEXT
      ============================================= */}

      <div
        className={`galaxy-title ${
          showroom
            ? "galaxy-title-hide"
            : ""
        }`}
      >

        <span>
          WELCOME TO
        </span>

        <strong>
          C24
        </strong>

        <b>
          HOME APPLIANCES
        </b>

      </div>

      {/* =============================================
          HERO CONTENT
      ============================================= */}

      <div
        className={`hero-content ${
          showroom
            ? "hero-show"
            : ""
        }`}
      >

        <small>
          PREMIUM WHOLESALE
        </small>

        <h1>
          C24 Home
          <br />
          Appliances
        </h1>

        <p>
          Premium electronics &
          home appliances for
          wholesale buyers.
        </p>

        <div className="hero-buttons">

          <button>
            Explore Products
          </button>

          <button className="secondary">
            Wholesale Enquiry
          </button>

        </div>

      </div>

      {/* =============================================
          FLOOR LIGHT
      ============================================= */}

      <div className="floor-line" />

      {/* =============================================
          TOP BADGE
      ============================================= */}

      <div className="c24-badge">
        C24 PRO
      </div>

    </section>
  );
}

/* =====================================================
   PRELOAD MODELS
===================================================== */

useGLTF.preload(
  `${ASSET_BASE}models/businessman.glb`
);

useGLTF.preload(
  `${ASSET_BASE}models/smart_tv.glb`
);

useGLTF.preload(
  `${ASSET_BASE}models/washing_machine.glb`
);

useGLTF.preload(
  `${ASSET_BASE}models/mixer.glb`
);

useGLTF.preload(
  `${ASSET_BASE}models/fan.glb`
);