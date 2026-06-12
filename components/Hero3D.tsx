'use client';

import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, Sparkles, OrbitControls } from '@react-three/drei';

export function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Particle effects */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.3} color="#00ffff" />
        
        {/* Floating Abstract 3D Object */}
        <Float speed={2} rotationIntensity={2} floatIntensity={3}>
          <Sphere args={[1.2, 64, 64]} position={[1.5, 0, -2]}>
            <MeshDistortMaterial
              color="#4a00e0"
              envMapIntensity={1}
              clearcoat={1}
              clearcoatRoughness={0.1}
              metalness={0.8}
              roughness={0.2}
              distort={0.4}
              speed={2}
            />
          </Sphere>
        </Float>

        <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
          <Sphere args={[0.8, 64, 64]} position={[-2, 1, -4]}>
            <MeshDistortMaterial
              color="#00ffff"
              envMapIntensity={1}
              clearcoat={1}
              clearcoatRoughness={0.2}
              metalness={0.9}
              roughness={0.1}
              distort={0.5}
              speed={3}
            />
          </Sphere>
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
