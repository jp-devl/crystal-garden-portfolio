import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

const COPPER = "#CF6A3A";
const TERRACOTTA = "#BE673E";
const SUNSET = "#EF822F";
const STEEL = "#BAC6BD";

function letterShapes() {
  // J: haste vertical + gancho inferior
  const j = new THREE.Shape();
  j.moveTo(0.35, 1.2); j.lineTo(0.85, 1.2); j.lineTo(0.85, -0.55);
  j.absarc(0.2, -0.55, 0.65, 0, -Math.PI, true);
  j.lineTo(-0.45, -0.35); j.lineTo(0.05, -0.35); j.lineTo(0.05, -0.55);
  j.absarc(0.2, -0.55, 0.15, Math.PI, 0, false);
  j.lineTo(0.35, 1.2);
  // P: haste + bojo com furo
  const p = new THREE.Shape();
  p.moveTo(0, -1.2); p.lineTo(0, 1.2); p.lineTo(0.55, 1.2);
  p.absarc(0.55, 0.6, 0.6, Math.PI / 2, -Math.PI / 2, true);
  p.lineTo(0.5, 0); p.lineTo(0.5, -1.2); p.lineTo(0, -1.2);
  const hole = new THREE.Path();
  hole.moveTo(0.5, 0.75); hole.lineTo(0.55, 0.75);
  hole.absarc(0.55, 0.6, 0.15, Math.PI / 2, -Math.PI / 2, true);
  hole.lineTo(0.5, 0.45); hole.lineTo(0.5, 0.75);
  p.holes.push(hole);
  return { j, p };
}

function Emblem({ reduced }: { reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const cage = useRef<THREE.LineSegments>(null);
  const dust = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const { j, p } = letterShapes();
    const opts = { depth: 0.45, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.05, bevelSegments: 4, curveSegments: 24 };
    const gj = new THREE.ExtrudeGeometry(j, opts); gj.translate(-1.25, 0, -0.22);
    const gp = new THREE.ExtrudeGeometry(p, opts); gp.translate(0.15, 0, -0.22);
    return { gj, gp };
  }, []);

  const cageGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.6, 1)), []);
  const particles = useMemo(() => {
    const n = 420, a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 3 + Math.random() * 2.4, t = Math.random() * Math.PI * 2, y = (Math.random() - 0.5) * 2.4;
      a.set([Math.cos(t) * r, y, Math.sin(t) * r], i * 3);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(a, 3)); return g;
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05) * (reduced ? 0.15 : 1);
    const t = state.clock.elapsedTime;
    const g = root.current; if (!g) return;
    const k = 1 - Math.exp(-3 * Math.min(delta, 0.05));
    g.rotation.y += ((state.pointer.x * 0.5 + Math.sin(t * 0.3) * 0.25) - g.rotation.y) * k;
    g.rotation.x += ((-state.pointer.y * 0.3) - g.rotation.x) * k;
    g.position.y = reduced ? 0 : Math.sin(t * 0.8) * 0.12;
    if (ringA.current) ringA.current.rotation.z += dt * 0.4;
    if (ringB.current) ringB.current.rotation.z -= dt * 0.25;
    if (cage.current) { cage.current.rotation.y += dt * 0.08; cage.current.rotation.x += dt * 0.04; }
    if (dust.current) dust.current.rotation.y += dt * 0.05;
  });

  return (
    <group ref={root}>
      <mesh geometry={geo.gj}><meshStandardMaterial color={COPPER} metalness={0.85} roughness={0.25} emissive={COPPER} emissiveIntensity={0.25} /></mesh>
      <mesh geometry={geo.gp}><meshStandardMaterial color={SUNSET} metalness={0.85} roughness={0.3} emissive={TERRACOTTA} emissiveIntensity={0.25} /></mesh>
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[2.3, 0.025, 16, 160]} />
        <meshStandardMaterial color={SUNSET} metalness={1} roughness={0.2} emissive={SUNSET} emissiveIntensity={0.4} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.8, -0.5, 0]}>
        <torusGeometry args={[2.8, 0.012, 12, 180]} />
        <meshStandardMaterial color={STEEL} metalness={0.8} roughness={0.3} />
      </mesh>
      <lineSegments ref={cage} geometry={cageGeo}>
        <lineBasicMaterial color={STEEL} transparent opacity={0.18} />
      </lineSegments>
      <points ref={dust} geometry={particles}>
        <pointsMaterial color={SUNSET} size={0.035} transparent opacity={0.8} sizeAttenuation />
      </points>
    </group>
  );
}

export default function JPEmblem({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 7.5], fov: 40 }} gl={{ alpha: true, antialias: true }}
      onCreated={({ gl }) => gl.domElement.parentElement?.setAttribute("data-scene-ready", "")}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 3, 5]} intensity={2} color={SUNSET} />
      <pointLight position={[-4, -2, 3]} intensity={18} color={STEEL} />
      <Environment resolution={128}>
        <Lightformer intensity={3} color={SUNSET} position={[0, 4, 2]} scale={[10, 3, 1]} />
        <Lightformer intensity={1.5} color={STEEL} position={[-5, 0, 1]} rotation-y={Math.PI / 2} scale={[10, 2, 1]} />
        <Lightformer intensity={2} color="#ffd9b8" position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[6, 6, 1]} />
      </Environment>
      <Emblem reduced={reduced} />
    </Canvas>
  );
}
