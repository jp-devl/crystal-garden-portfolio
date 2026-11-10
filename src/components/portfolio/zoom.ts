export const MIN_DISTANCE = 4;
export const ZOOM_INTENSITY = 0.0015;
export const ZOOM_SMOOTHING = 10;

export function wheelZoomFactor(delta: number, mode: number, distance: number, maxDistance: number) {
  const pixels = delta * (mode === 1 ? 16 : mode === 2 ? 100 : 1);
  const next = Math.min(maxDistance, Math.max(MIN_DISTANCE, distance * Math.exp(pixels * ZOOM_INTENSITY)));
  return next / Math.max(distance, 0.0001);
}