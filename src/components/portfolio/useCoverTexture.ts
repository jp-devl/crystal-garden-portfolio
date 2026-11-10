import { useEffect, useState } from "react";
import { CanvasTexture, SRGBColorSpace, TextureLoader, type Texture } from "three";

export const PANEL_W = 2.4;
export const PANEL_H = 1.5;

/** Textura de fallback: gradiente escuro com o nome do projeto. */
function makeFallbackTexture(name: string, color: string): Texture {
  const w = 768;
  const h = Math.round((w * PANEL_H) / PANEL_W);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new CanvasTexture(canvas);
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#161b22");
  g.addColorStop(1, "#0d1117");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  const glow = ctx.createRadialGradient(w * 0.85, h * 0.1, 0, w * 0.85, h * 0.1, w * 0.7);
  glow.addColorStop(0, `${color}55`);
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = color;
  ctx.fillRect(48, 56, 72, 8);

  ctx.fillStyle = "#e6edf3";
  let size = 64;
  ctx.font = `600 ${size}px ui-monospace, monospace`;
  while (ctx.measureText(name).width > w - 96 && size > 26) {
    size -= 2;
    ctx.font = `600 ${size}px ui-monospace, monospace`;
  }
  ctx.textBaseline = "middle";
  ctx.fillText(name, 48, h / 2, w - 96);
  ctx.fillStyle = "#8b949e";
  ctx.font = "400 26px ui-monospace, monospace";
  ctx.fillText("github.com/jp-devl", 48, h - 60);

  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

/** Carrega a capa; em erro (404, CORS) usa o fallback. Nunca suspende nem quebra a cena. */
export function useCoverTexture(url: string, name: string, color: string) {
  const [texture, setTexture] = useState<Texture | null>(null);

  useEffect(() => {
    let cancelled = false;
    let current: Texture | null = null;
    const apply = (t: Texture) => {
      if (cancelled) return t.dispose();
      current = t;
      setTexture(t);
    };
    const loader = new TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      url,
      (t) => {
        t.colorSpace = SRGBColorSpace;
        apply(t);
      },
      undefined,
      () => apply(makeFallbackTexture(name, color)),
    );
    return () => {
      cancelled = true;
      current?.dispose();
    };
  }, [url, name, color]);

  return texture;
}
