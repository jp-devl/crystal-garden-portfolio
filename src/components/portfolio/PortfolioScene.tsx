import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls, Stars } from "@react-three/drei";
import { layoutRadius, type Project } from "@/data/projects";
import { Crystal } from "./Crystal";

interface PortfolioSceneProps {
  projects: Project[];
  selectedId: string | null;
  onSelect: (project: Project) => void;
  onClear: () => void;
}

export function PortfolioScene({ projects, selectedId, onSelect, onClear }: PortfolioSceneProps) {
  const dist = layoutRadius(projects.length) * 2.3 + 4;
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.5, dist], fov: 50 }}
      onPointerMissed={onClear}
      onCreated={({ gl }) => gl.domElement.parentElement?.setAttribute("data-scene-ready", "")}
    >
      <color attach="background" args={["#0d1117"]} />
      <fog attach="fog" args={["#0d1117", 10, 22]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-6, 2, -3]} intensity={20} color="#58a6ff" />
      <Environment>
        <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
        <Lightformer intensity={1} color="#88aaff" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
      </Environment>
      <Stars radius={60} depth={40} count={1500} factor={3} fade speed={0.5} />

      {projects.map((p, i) => (
        <Crystal key={p.id} project={p} index={i} selected={selectedId === p.id} onSelect={onSelect} />
      ))}

      <ContactShadows position={[0, -layoutRadius(projects.length) * 0.75 - 1, 0]} opacity={0.5} scale={16} blur={2.4} far={4} />
      <OrbitControls enableDamping dampingFactor={0.06} minDistance={4} maxDistance={14} enablePan={false} />
    </Canvas>
  );
}
