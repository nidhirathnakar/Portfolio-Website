import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, Point, MeshDistortMaterial, Float } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useMousePosition } from "../../hooks/useMousePosition";

// Component to handle scroll-driven camera and light motion
function SceneController({ mousePos }) {
  const { camera } = useThree();
  const lightRef = useRef();
  
  // Track scroll position
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    // 1. Camera path coordinates interpolation based on scroll progress (0 to 1)
    let targetCamX = 0;
    let targetCamY = 0;
    let targetCamZ = 6.5;

    // Smooth transitions between sections
    if (scrollProgress < 0.2) {
      // Hero section: centered, facing forward, slightly further back
      const t = scrollProgress / 0.2;
      targetCamX = THREE.MathUtils.lerp(0, -1.8, t);
      targetCamY = THREE.MathUtils.lerp(0, 0.5, t);
      targetCamZ = THREE.MathUtils.lerp(6.5, 6.0, t);
    } else if (scrollProgress < 0.4) {
      // About section: camera shifted to the side
      const t = (scrollProgress - 0.2) / 0.2;
      targetCamX = THREE.MathUtils.lerp(-1.8, 1.8, t);
      targetCamY = THREE.MathUtils.lerp(0.5, -0.5, t);
      targetCamZ = THREE.MathUtils.lerp(6.0, 5.5, t);
    } else if (scrollProgress < 0.6) {
      // Skills section: zoom in towards the particle mesh grid
      const t = (scrollProgress - 0.4) / 0.2;
      targetCamX = THREE.MathUtils.lerp(1.8, 0, t);
      targetCamY = THREE.MathUtils.lerp(-0.5, 0, t);
      targetCamZ = THREE.MathUtils.lerp(5.5, 4.0, t);
    } else if (scrollProgress < 0.8) {
      // Projects section: wide dramatic angle, looking down
      const t = (scrollProgress - 0.6) / 0.2;
      targetCamX = THREE.MathUtils.lerp(0, -2.2, t);
      targetCamY = THREE.MathUtils.lerp(0, 1.2, t);
      targetCamZ = THREE.MathUtils.lerp(4.0, 7.0, t);
    } else {
      // Contact section: floating center-right looking slightly up
      const t = (scrollProgress - 0.8) / 0.2;
      targetCamX = THREE.MathUtils.lerp(-2.2, 1.2, t);
      targetCamY = THREE.MathUtils.lerp(1.2, 0.2, t);
      targetCamZ = THREE.MathUtils.lerp(7.0, 5.8, t);
    }

    // Camera inertia lag (smooth camera movement)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.05);
    
    // Always look slightly towards the origin, but offset with mouse parallax
    const targetLookAt = new THREE.Vector3(
      mousePos.normalizedX * 0.4, 
      mousePos.normalizedY * 0.4, 
      0
    );
    state.camera.lookAt(targetLookAt);

    // 2. Mouse-reactive lighting: make the point light follow cursor
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, mousePos.normalizedX * 3.5, 0.08);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, mousePos.normalizedY * 3.5, 0.08);
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[10, 10, 10]} intensity={0.4} color="#ffedd5" />
      <pointLight 
        ref={lightRef} 
        position={[0, 0, 3]} 
        intensity={2.5} 
        distance={8} 
        color="#ff5e00" 
      />
      <pointLight 
        position={[-3, -3, -2]} 
        intensity={0.8} 
        color="#00ffff" 
      />
    </>
  );
}

// 3D Particles drift mesh
function FloatingParticles({ mousePos }) {
  const pointsRef = useRef();
  
  // Dynamically scale down particles on mobile to improve render performance
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const particleCount = isMobile ? 400 : 1200;
  
  const positions = useRef(new Float32Array(particleCount * 3));

  // Initialize random positions
  useEffect(() => {
    for (let i = 0; i < particleCount; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 15;
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
  }, [particleCount]);

  useFrame((state) => {
    if (pointsRef.current) {
      // Drifting rotation based on time
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.005;
      
      // Mouse interaction drift
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, mousePos.normalizedX * 0.3, 0.03);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, mousePos.normalizedY * 0.3, 0.03);
    }
  });

  return (
    <Points ref={pointsRef} positions={positions.current} stride={3}>
      <pointsMaterial
        size={0.035}
        color="#ff9d00"
        transparent
        opacity={0.45}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Interactive center grid sphere representing AI and network nodes
function CoreGeometry({ mousePos }) {
  const meshRef = useRef();
  const gridRef = useRef();

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const sphereSegments = isMobile ? 32 : 64;
  const ringSegments = isMobile ? 16 : 24;

  useFrame((state) => {
    if (meshRef.current) {
      // Rotation animations
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.08;
      
      // Scale pulse
      const scale = 1.6 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
    
    if (gridRef.current) {
      gridRef.current.rotation.y = -state.clock.getElapsedTime() * 0.05;
      gridRef.current.rotation.z = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Distorted Liquid Sphere Core */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1, sphereSegments, sphereSegments]} />
          <MeshDistortMaterial
            color="#080808"
            roughness={0.1}
            metalness={0.9}
            distort={0.45}
            speed={2.2}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>

      {/* Holographic sci-fi outer node rings */}
      <mesh ref={gridRef}>
        <sphereGeometry args={[2.0, ringSegments, ringSegments]} />
        <meshBasicMaterial
          color="#ff5e00"
          wireframe
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function BackgroundCanvas() {
  const mousePos = useMousePosition();

  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10 pointer-events-none select-none bg-[#030303]">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 60 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <SceneController mousePos={mousePos} />
        <FloatingParticles mousePos={mousePos} />
        <CoreGeometry mousePos={mousePos} />
      </Canvas>
      
      {/* Subtle grid and dark gradient overlay HUD layers */}
      <div className="absolute inset-0 bg-dots-cyber pointer-events-none opacity-30 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/30 via-transparent to-[#030303] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}
