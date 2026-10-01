"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function GlassSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  // Calculate resolution dynamically or fallback (using standard props below)
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={1}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.2}
          ior={1.5}
          color="#CCFF00"
        />
      </mesh>
    </Float>
  );
}

export default function RefractingSphere() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-60 md:opacity-100">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        dpr={[1, 1.5]} // Limit dpr for mobile sensitivity
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Environment preset="city" />
        <GlassSphere />
      </Canvas>
    </div>
  );
}
