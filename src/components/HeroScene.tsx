"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/** Forme signature : tore noué déformé + orbites, réagit à la souris et au scroll. */
function SignatureShape() {
  const groupRef = useRef<THREE.Group>(null);
  const knotRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const ringGeo = useMemo(() => new THREE.TorusGeometry(1.9, 0.012, 8, 128), []);
  const ring2Geo = useMemo(() => new THREE.TorusGeometry(2.45, 0.008, 8, 128), []);

  useFrame((state, delta) => {
    mouse.current.x = (state.pointer.x + mouse.current.x * 4) / 5;
    mouse.current.y = (state.pointer.y + mouse.current.y * 4) / 5;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.current.y * 0.35 + window.scrollY * 0.0004,
        0.06
      );
    }
    if (knotRef.current) {
      knotRef.current.rotation.z += delta * 0.25;
      knotRef.current.position.x = THREE.MathUtils.lerp(
        knotRef.current.position.x,
        mouse.current.x * 0.4,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.55}>
        <mesh ref={knotRef}>
          <torusKnotGeometry args={[1, 0.32, 160, 24, 2, 3]} />
          <meshStandardMaterial
            color="#ff5c1f"
            roughness={0.25}
            metalness={0.75}
            emissive="#3a1500"
          />
        </mesh>
      </Float>
      <mesh geometry={ringGeo} rotation={[Math.PI / 2.4, 0, 0.3]}>
        <meshBasicMaterial color="#2fe0b8" transparent opacity={0.5} />
      </mesh>
      <mesh geometry={ring2Geo} rotation={[-Math.PI / 3, 0.6, 0]}>
        <meshBasicMaterial color="#ece4d6" transparent opacity={0.18} />
      </mesh>
      <Float speed={2} floatIntensity={1.2}>
        <mesh position={[2.6, 1.2, -1]}>
          <icosahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial color="#2fe0b8" flatShading roughness={0.3} />
        </mesh>
      </Float>
      <Float speed={1.8} floatIntensity={1}>
        <mesh position={[-2.4, -1.4, 0.5]}>
          <icosahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial color="#ece4d6" flatShading roughness={0.3} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 4, 4]} intensity={1.4} color="#ffd9c4" />
      <pointLight position={[-4, -2, 2]} intensity={12} color="#2fe0b8" />
      <SignatureShape />
    </Canvas>
  );
}
