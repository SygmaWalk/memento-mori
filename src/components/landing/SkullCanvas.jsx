import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Float,
  Environment,
  Sparkles,
} from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

let mouse = { x: 0, y: 0 };
let lastMove = Date.now();

function Skull() {
  const { scene } = useGLTF("/models/skull.glb");

  const group = useRef();
  const jaw = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;

    const idle = Date.now() - lastMove > 1800;

    // cuando el mouse se queda quieto vuelve a mirar al frente
    const targetX = idle ? 0 : mouse.x * 0.45;
    const targetY = idle ? 0 : mouse.y * 0.18;

    // rotación suave
    group.current.rotation.y +=
      (targetX - group.current.rotation.y) * 0.04;

    group.current.rotation.x +=
      (-targetY - group.current.rotation.x) * 0.04;

    // movimiento sutil flotando lateral
    group.current.position.x +=
      (2.4 + mouse.x * 0.25 - group.current.position.x) * 0.03;

    group.current.position.y +=
      (mouse.y * 0.18 - group.current.position.y) * 0.03;

    // respiración leve
    const scalePulse = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.015;
    group.current.scale.setScalar(scalePulse);

    // mandíbula sutil
    if (jaw.current) {
      jaw.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 1.8) * 0.03;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.22}>
      <group ref={group}>
        <primitive object={scene} ref={jaw} />

        {/* brillo interior */}
        <pointLight
          position={[0, 0.5, 1]}
          intensity={1.4}
          distance={4}
          color="#ffffff"
        />

        {/* ojos */}
        <pointLight
          position={[-0.25, 0.22, 0.65]}
          intensity={1.5}
          distance={1.4}
          color="#60a5fa"
        />

        <pointLight
          position={[0.25, 0.22, 0.65]}
          intensity={1.5}
          distance={1.4}
          color="#60a5fa"
        />
      </group>
    </Float>
  );
}

export default function SkullCanvas() {
  useEffect(() => {
    const move = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
      lastMove = Date.now();
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
    >
      {/* niebla sutil */}
      <fog attach="fog" args={["#000000", 6, 14]} />

      {/* luces base */}
      <ambientLight intensity={0.8} />

      <directionalLight
        position={[3, 2, 5]}
        intensity={2.2}
      />

      <directionalLight
        position={[-4, -1, 2]}
        intensity={0.8}
      />

      {/* halo trasero */}
      <pointLight
        position={[0, 1, -3]}
        intensity={1.8}
        color="#6366f1"
      />

      {/* partículas */}
      <Sparkles
        count={40}
        scale={1}
        size={2}
        speed={0.25}
      />

      <Environment preset="night" />

      <Skull />
    </Canvas>
  );
}