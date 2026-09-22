"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Tore plat errant — écho direct du tore noué du hero, désorienté. */
function LostTorus() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m) return;
    m.rotation.x += delta * 0.4;
    m.rotation.z += delta * 0.18;
    m.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.35;
    m.position.x = Math.cos(state.clock.elapsedTime * 0.4) * 0.5;
  });
  return (
    <mesh ref={mesh}>
      <torusGeometry args={[1.4, 0.45, 24, 96]} />
      <meshStandardMaterial
        color="#ff5c1f"
        roughness={0.3}
        metalness={0.7}
        emissive="#3a1500"
      />
    </mesh>
  );
}

/** Scène 3D de la 404 — réutilise la grammaire du hero, version « perdue ». */
export default function NotFoundScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
      className="absolute inset-0"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 4]} intensity={1.2} color="#ffd9c4" />
      <pointLight position={[-3, -2, 2]} intensity={10} color="#2fe0b8" />
      <LostTorus />
    </Canvas>
  );
}
