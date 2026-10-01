"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

function LiquidImageMesh({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  const [hovered, setHover] = useState(false);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uHoverState: { value: 0 },
    }),
    [texture]
  );

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
          uniform float uTime;
          uniform float uHoverState;
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // Liquid wave effect based on hover state
            float wave = sin(pos.x * 5.0 + uTime * 2.0) * 0.1 * uHoverState;
            pos.z += wave;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D uTexture;
          uniform float uHoverState;
          uniform float uTime;
          varying vec2 vUv;
          
          void main() {
            vec2 uv = vUv;
            // RGB shift on hover
            float r = texture2D(uTexture, uv + vec2(0.02 * uHoverState * sin(uTime), 0.0)).r;
            float g = texture2D(uTexture, uv).g;
            float b = texture2D(uTexture, uv - vec2(0.02 * uHoverState * cos(uTime), 0.0)).b;
            
            gl_FragColor = vec4(r, g, b, 1.0);
          }
        `,
      }),
    [uniforms]
  );

  useFrame((state) => {
    if (material) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly interpolate hover state
      material.uniforms.uHoverState.value = THREE.MathUtils.lerp(
        material.uniforms.uHoverState.value,
        hovered ? 1 : 0,
        0.1
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export default function ImageShader({ imageUrl, alt }: { imageUrl: string; alt: string }) {
  return (
    <div className="w-full h-full relative" aria-label={alt}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <LiquidImageMesh imageUrl={imageUrl} />
      </Canvas>
    </div>
  );
}
