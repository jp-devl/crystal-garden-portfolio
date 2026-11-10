import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Plane, Raycaster, Vector2, Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { Project } from "@/data/projects";
import { PANEL_H, PANEL_W } from "./useCoverTexture";
import { MIN_DISTANCE, wheelZoomFactor, ZOOM_SMOOTHING } from "./zoom";

export function CursorCamera({ projects }: { projects: Project[] }) {
  const { camera, size, gl, scene, invalidate } = useThree();
  const controls = useRef<OrbitControlsImpl>(null);
  const [distance, setDistance] = useState(30);
  const goal = useRef<{ position: Vector3; target: Vector3 } | null>(null);
  const tools = useMemo(() => ({ ray: new Raycaster(), mouse: new Vector2(), plane: new Plane(), normal: new Vector3(), anchor: new Vector3() }), []);

  useLayoutEffect(() => {
    const halfWidth = Math.max(...projects.map((p) => Math.abs(p.position[0]))) + PANEL_W * 0.75;
    const halfHeight = Math.max(...projects.map((p) => Math.abs(p.position[1]))) + PANEL_H * 0.75 + 0.25;
    const tangent = Math.tan((50 * Math.PI) / 360);
    const aspect = size.width / Math.max(1, size.height);
    const fitted = Math.max(halfHeight / tangent, halfWidth / (tangent * aspect)) * 1.12 + 1;
    goal.current = null;
    camera.position.set(0, 0, fitted);
    controls.current?.target.set(0, 0, 0);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    setDistance(fitted);
    invalidate();
  }, [camera, size.width, size.height, projects, invalidate]);

  useEffect(() => {
    const element = gl.domElement;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const orbit = controls.current;
      if (!orbit || event.deltaY === 0) return;
      const rect = element.getBoundingClientRect();
      tools.mouse.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
      camera.updateMatrixWorld();
      scene.updateMatrixWorld(true);
      tools.ray.setFromCamera(tools.mouse, camera);
      const panels = scene.children.filter((object) => object.userData['projectPanel']);
      const hit = tools.ray.intersectObjects(panels, true)[0];
      if (hit) tools.anchor.copy(hit.point);
      else {
        camera.getWorldDirection(tools.normal);
        tools.plane.setFromNormalAndCoplanarPoint(tools.normal, orbit.target);
        if (!tools.ray.ray.intersectPlane(tools.plane, tools.anchor)) return;
      }
      const position = goal.current?.position.clone() ?? camera.position.clone();
      const target = goal.current?.target.clone() ?? orbit.target.clone();
      const factor = wheelZoomFactor(event.deltaY, event.deltaMode, position.distanceTo(target), distance * 2);
      position.sub(tools.anchor).multiplyScalar(factor).add(tools.anchor);
      target.sub(tools.anchor).multiplyScalar(factor).add(tools.anchor);
      goal.current = { position, target };
      invalidate();
    };
    const cancel = () => { goal.current = null; };
    element.addEventListener("wheel", onWheel, { passive: false, capture: true });
    element.addEventListener("pointerdown", cancel);
    return () => {
      element.removeEventListener("wheel", onWheel, true);
      element.removeEventListener("pointerdown", cancel);
    };
  }, [camera, gl, scene, tools, distance, invalidate]);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const debug = { read: () => ({ position: camera.position.toArray(), target: controls.current?.target.toArray(), distance: camera.position.distanceTo(controls.current?.target ?? new Vector3()), moving: Boolean(goal.current) }) };
    Object.assign(window, { __portfolioCamera: debug });
    return () => { Reflect.deleteProperty(window, "__portfolioCamera"); };
  }, [camera]);

  useFrame((_, delta) => {
    const next = goal.current;
    const orbit = controls.current;
    if (!next || !orbit) return;
    const alpha = 1 - Math.exp(-ZOOM_SMOOTHING * Math.min(delta, 0.05));
    camera.position.lerp(next.position, alpha);
    orbit.target.lerp(next.target, alpha);
    orbit.update();
    if (camera.position.distanceToSquared(next.position) < 0.000001 && orbit.target.distanceToSquared(next.target) < 0.000001) goal.current = null;
  });

  return <OrbitControls ref={controls} enableDamping dampingFactor={0.06} minDistance={MIN_DISTANCE} maxDistance={distance * 2} enablePan={false} />;
}