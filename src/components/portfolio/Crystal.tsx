import { useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import type { Group } from "three";
import type { Project } from "@/data/projects";
import { PANEL_H, PANEL_W, useCoverTexture } from "./useCoverTexture";

const FLOAT_AMPLITUDE = 0.25;
const FLOAT_SPEED = 1.1;
const SWAY = 0.18;

interface ProjectPanelProps {
  project: Project;
  index: number;
  selected: boolean;
  onSelect: (project: Project) => void;
}

/** Painel 3D flutuante com a capa do repositório (ou fallback com o nome). */
export function Crystal({ project, index, selected, onSelect }: ProjectPanelProps) {
  const ref = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useCoverTexture(project.coverUrl, project.name, project.color);
  const [baseX, baseY, baseZ] = project.position;

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime + index * 1.3;
    g.position.y = baseY + Math.sin(t * FLOAT_SPEED) * FLOAT_AMPLITUDE;
    g.rotation.y = Math.sin(t * 0.6) * SWAY;
    g.rotation.x = Math.cos(t * 0.5) * SWAY * 0.4;
    const target = selected ? 1.25 : hovered ? 1.1 : 1;
    const s = g.scale.x + (target - g.scale.x) * (1 - Math.exp(-8 * dt));
    g.scale.setScalar(s);
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(project);
  };

  return (
    <group
      ref={ref}
      userData={{ projectPanel: true }}
      position={[baseX, baseY, baseZ]}
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
      {/* moldura */}
      <mesh castShadow position={[0, 0, -0.04]}>
        <boxGeometry args={[PANEL_W + 0.12, PANEL_H + 0.12, 0.06]} />
        <meshPhysicalMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={selected || hovered ? 0.6 : 0.15}
          roughness={0.25}
          metalness={0.5}
          clearcoat={1}
        />
      </mesh>
      {/* capa */}
      <mesh>
        <planeGeometry args={[PANEL_W, PANEL_H]} />
        {texture ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshStandardMaterial color="#161b22" />
        )}
      </mesh>
    </group>
  );
}
