import { useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import type { Mesh } from "three";
import type { Project } from "@/data/projects";

const FLOAT_AMPLITUDE = 0.35;
const FLOAT_SPEED = 1.2;
const SPIN_SPEED = 0.4;

interface CrystalProps {
  project: Project;
  index: number;
  selected: boolean;
  onSelect: (project: Project) => void;
}

export function Crystal({ project, index, selected, onSelect }: CrystalProps) {
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [baseX, baseY, baseZ] = project.position;

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    mesh.rotation.x += dt * SPIN_SPEED;
    mesh.rotation.y += dt * SPIN_SPEED * (selected ? 3 : 1.4);
    mesh.position.y = baseY + Math.sin(t * FLOAT_SPEED + index * 1.3) * FLOAT_AMPLITUDE;
    const target = selected ? 1.35 : hovered ? 1.15 : 1;
    const s = mesh.scale.x + (target - mesh.scale.x) * (1 - Math.exp(-8 * dt));
    mesh.scale.setScalar(s);
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(project);
  };

  return (
    <mesh
      ref={ref}
      position={[baseX, baseY, baseZ]}
      castShadow
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <icosahedronGeometry args={[0.8, 0]} />
      <meshPhysicalMaterial
        color={project.color}
        emissive={project.color}
        emissiveIntensity={selected || hovered ? 0.45 : 0.12}
        roughness={0.15}
        metalness={0.3}
        clearcoat={1}
        flatShading
      />
    </mesh>
  );
}
