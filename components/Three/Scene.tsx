'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  Environment,
  ContactShadows,
  PresentationControls,
  useGLTF,
  Text,
  MeshDistortMaterial,
  Sphere,
} from '@react-three/drei';
import * as THREE from 'three';
// Removed framer-motion-3d import due to version conflicts

// Interactive Torus Knot
const InteractiveTorusKnot = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        scale={clicked ? 1.2 : hovered ? 1.1 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial
          color={hovered ? '#3b82f6' : '#8b5cf6'}
          metalness={0.8}
          roughness={0.2}
          emissive={hovered ? '#1e40af' : '#6d28d9'}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
};

// Glass Sphere
const GlassSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[0.8, 64, 64]} position={[3, 1, -2]}>
        <MeshDistortMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          distort={0.2}
          speed={2}
          roughness={0}
          metalness={0.1}
        />
      </Sphere>
    </Float>
  );
};

// Wireframe Ring
const WireframeRing = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.z += 0.01;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.8} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[-3, -1, 1]}>
        <torusGeometry args={[1.5, 0.1, 16, 100]} />
        <meshBasicMaterial color="#3b82f6" wireframe />
      </mesh>
    </Float>
  );
};

// Floating Text
const FloatingText = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        Full Stack Developer
        <meshStandardMaterial
          color="#ffffff"
          emissive="#3b82f6"
          emissiveIntensity={0.2}
        />
      </Text>
    </Float>
  );
};

// Particle System
const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 100;
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    
    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
    colors[i * 3 + 2] = 1;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Optional GLB Model Loader (placeholder)
const ModelLoader = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <primitive ref={modelRef} object={scene} scale={1.5} />
    </Float>
  );
};

// Main Scene Component
export const Scene = ({ onLoad }: { onLoad?: () => void }) => {
  const { camera } = useThree();
  const [loaded, setLoaded] = useState(false);
  
  // Set camera position
  camera.position.set(0, 0, 8);

  // Signal when scene is loaded
  useEffect(() => {
    if (!loaded) {
      const timer = setTimeout(() => {
        setLoaded(true);
        onLoad?.();
      }, 1000); // Give scene time to render
      return () => clearTimeout(timer);
    }
  }, [loaded, onLoad]);

  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#8b5cf6" />

      {/* Environment */}
      <Environment preset="city" background={false} />

      {/* Interactive Controls */}
      <PresentationControls
        enabled={true}
        global={false}
        cursor={true}
        snap={false}
        speed={1}
        zoom={1}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        {/* 3D Objects */}
        <InteractiveTorusKnot />
        <GlassSphere />
        <WireframeRing />
        <FloatingText />
        
        {/* Uncomment to load a GLB model */}
        {/* <ModelLoader url="/models/placeholder.glb" /> */}
      </PresentationControls>

      {/* Particle Field */}
      <ParticleField />

      {/* Contact Shadows */}
      <ContactShadows
        position={[0, -3, 0]}
        opacity={0.4}
        scale={20}
        blur={2}
        far={3}
      />
    </>
  );
};

// Preload GLB model (uncomment when you have a model)
// useGLTF.preload('/models/placeholder.glb');