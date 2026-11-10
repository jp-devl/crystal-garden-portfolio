import { describe, expect, it } from "vitest";
import { wheelZoomFactor } from "@/components/portfolio/zoom";

describe("Cursor wheel zoom", () => {
  it("moves closer on negative wheel delta and farther on positive delta", () => {
    expect(wheelZoomFactor(-100, 0, 20, 80)).toBeLessThan(1);
    expect(wheelZoomFactor(100, 0, 20, 80)).toBeGreaterThan(1);
  });
  it("normalizes line deltas into pixel deltas", () => {
    expect(wheelZoomFactor(1, 1, 20, 80)).toBe(wheelZoomFactor(16, 0, 20, 80));
  });
  it("gives the same zoom for many small trackpad events as one equivalent event", () => {
    let distance = 20;
    for (let i = 0; i < 10; i++) distance *= wheelZoomFactor(-10, 0, distance, 80);
    expect(distance).toBeCloseTo(20 * wheelZoomFactor(-100, 0, 20, 80));
  });
  it("keeps the camera within its distance limits", () => {
    expect(20 * wheelZoomFactor(-100000, 0, 20, 80)).toBe(4);
    expect(20 * wheelZoomFactor(100000, 0, 20, 80)).toBe(80);
  });
});