import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, Point, MeshDistortMaterial, Float } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useMousePosition } from "../../hooks/useMousePosition";

// Component to handle scroll-driven camera and light motion
function SceneController({ mousePos, isLight }) {
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
      <ambientLight intensity={isLight ? 0.65 : 0.15} />
      <directionalLight position={[10, 10, 10]} intensity={isLight ? 0.8 : 0.4} color="#ffedd5" />
      <pointLight 
        ref={lightRef} 
        position={[0, 0, 3]} 
        intensity={isLight ? 1.2 : 2.5} 
        distance={8} 
        color="#ff5e00" 
      />
      <pointLight 
        position={[-3, -3, -2]} 
        intensity={isLight ? 0.4 : 0.8} 
        color="#00ffff" 
      />
    </>
  );
}

// 3D Particles drift mesh
function FloatingParticles({ mousePos, isLight }) {
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
        size={isLight ? 0.022 : 0.035}
        color={isLight ? "#cc4b00" : "#ff9d00"}
        transparent
        opacity={isLight ? 0.35 : 0.45}
        sizeAttenuation={true}
        depthWrite={false}
        blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Interactive center grid sphere representing AI and network nodes
function CoreGeometry({ mousePos, isLight }) {
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
            color={isLight ? "#faf8f5" : "#080808"}
            roughness={isLight ? 0.15 : 0.1}
            metalness={isLight ? 0.1 : 0.9}
            distort={0.45}
            speed={2.2}
            clearcoat={isLight ? 0.85 : 1.0}
            clearcoatRoughness={isLight ? 0.04 : 0.1}
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
          opacity={isLight ? 0.12 : 0.08}
          blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function BackgroundCanvas() {
  const mousePos = useMousePosition();
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains("light"));
    };

    checkTheme(); // Initial check

    // Set up a MutationObserver to listen to class additions/removals on the html tag
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full h-screen -z-10 pointer-events-none select-none transition-colors duration-500 ${isLight ? "bg-[#FAF8F5]" : "bg-[#030303]"}`}>
      {/* Premium grain/noise overlay for tactical material feel */}
      <div className="noise-overlay" />

      {/* Premium warm cinematic background ambient light blobs in light theme */}
      {isLight && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Warm ivory radial glow top-left */}
          <div className="absolute -top-[20%] -left-[20%] w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle,rgba(255,247,237,0.85)_0%,rgba(255,110,26,0.06)_60%,transparent_100%)] blur-[90px] animate-float opacity-80" />
          
          {/* Central diffused peach/orange blob behind the hero header area */}
          <div 
            className="absolute top-[10%] left-[20%] w-[60%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(255,140,0,0.15)_0%,rgba(255,94,0,0.02)_60%,transparent_100%)] blur-[80px]"
          />

          {/* Soft glowing amber blob center-right */}
          <div 
            className="absolute top-[25%] -right-[15%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(255,237,213,0.7)_0%,rgba(255,110,26,0.04)_50%,transparent_100%)] blur-[100px] animate-float" 
            style={{ animationDelay: "-2.5s", animationDuration: "9s" }} 
          />

          {/* Soft gold/cream radial glow bottom-left */}
          <div 
            className="absolute -bottom-[15%] left-[5%] w-[65%] h-[65%] rounded-full bg-[radial-gradient(circle,rgba(254,243,199,0.75)_0%,rgba(255,110,26,0.04)_70%,transparent_100%)] blur-[90px] animate-float" 
            style={{ animationDelay: "-5s", animationDuration: "11s" }} 
          />
        </div>
      )}

      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <SceneController mousePos={mousePos} isLight={isLight} />
        <FloatingParticles mousePos={mousePos} isLight={isLight} />
        <CoreGeometry mousePos={mousePos} isLight={isLight} />
      </Canvas>
      
      {/* Subtle grid and dark gradient overlay HUD layers */}
      <div className="absolute inset-0 bg-dots-cyber pointer-events-none opacity-30 mix-blend-overlay" />
      <div className={`absolute inset-0 bg-gradient-to-b via-transparent pointer-events-none ${isLight ? "from-[#FAF8F5]/30 to-[#FAF8F5]" : "from-[#030303]/30 to-[#030303]"}`} />
      <div className={`absolute inset-0 bg-gradient-to-r via-transparent pointer-events-none ${isLight ? "from-[#FAF8F5] to-[#FAF8F5]/80" : "from-[#030303] to-[#030303]/80"}`} />
    </div>
  );
}
