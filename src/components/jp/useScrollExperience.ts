import { useEffect } from "react";

/**
 * Scroll + pointer choreography shared by the editorial sections.
 * Everything is written as CSS custom properties so React does not re-render
 * on scroll and reduced-motion users can opt out purely in CSS.
 */
export function useScrollExperience(reduced: boolean) {
  useEffect(() => {
    const root = document.documentElement;
    const chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    const tracks = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-track]"));
    const horizontals = Array.from(document.querySelectorAll<HTMLElement>("[data-horizontal]"));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav]"));
    const railSteps = Array.from(document.querySelectorAll<HTMLElement>("[data-rail]"));
    const finePointer = !reduced && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let scrollFrame = 0;
    let pointerFrame = 0;
    let lastCaption = "";
    let disposed = false;

    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

    const updateScroll = () => {
      scrollFrame = 0;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty("--scroll", clamp01(scrollY / maxScroll).toFixed(4));

      // Active chapter for the fixed navigation and the progress rail.
      const marker = scrollY + window.innerHeight * 0.38;
      let activeId = chapters[0]?.id ?? "";
      for (const chapter of chapters) {
        const top = chapter.getBoundingClientRect().top + scrollY;
        if (top <= marker) activeId = chapter.id;
      }
      root.dataset.chapter = activeId;
      for (const link of navLinks) {
        const isActive = link.getAttribute("href") === `#${activeId}`;
        link.toggleAttribute("data-active", isActive);
        if (isActive) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      }
      for (const step of railSteps) step.toggleAttribute("data-active", step.dataset.rail === activeId);

      // Section-local progress, used for parallax and scroll-linked composition.
      for (const section of tracks) {
        const rect = section.getBoundingClientRect();
        if (rect.bottom < -window.innerHeight || rect.top > window.innerHeight * 2) continue;
        const distance = Math.max(1, section.offsetHeight - window.innerHeight);
        section.style.setProperty("--p", clamp01(-rect.top / distance).toFixed(4));
      }

      // Pinned project strip: derive travel from real layout, not hard-coded vw.
      for (const section of horizontals) {
        const viewport = section.querySelector<HTMLElement>("[data-horizontal-viewport]");
        const track = section.querySelector<HTMLElement>("[data-horizontal-track]");
        if (!viewport || !track) continue;

        const panels = Array.from(track.querySelectorAll<HTMLElement>("[data-project-panel]"));
        const caption = section.querySelector<HTMLElement>("[data-project-caption]");
        const horizontal = !reduced && window.matchMedia("(min-width: 1024px)").matches;

        // On tablet/mobile the panels stack vertically, so no scroll-linked
        // transform is written and the caption returns to the first project.
        if (!horizontal) {
          section.style.removeProperty("--travel");
          section.style.removeProperty("--shift");
          section.removeAttribute("data-active-panel");
          const firstTitle = panels[0]?.dataset.title;
          if (caption && firstTitle && firstTitle !== lastCaption) {
            caption.textContent = firstTitle;
            lastCaption = firstTitle;
          }
          continue;
        }

        const travel = Math.max(0, track.scrollWidth - viewport.clientWidth);
        const progress = clamp01(Number(section.style.getPropertyValue("--p")) || 0);
        section.style.setProperty("--travel", `${Math.round(travel)}px`);
        section.style.setProperty("--shift", `${Math.round(-travel * progress)}px`);

        if (!panels.length) continue;

        // Track the panel closest to the viewport centre instead of assuming
        // every panel owns an equal slice of the scroll range.
        const viewportRect = viewport.getBoundingClientRect();
        const centre = viewportRect.left + viewportRect.width / 2;
        let index = 0;
        let closest = Number.POSITIVE_INFINITY;
        panels.forEach((panel, i) => {
          const rect = panel.getBoundingClientRect();
          const distance = Math.abs(rect.left + rect.width / 2 - centre);
          if (distance < closest) {
            closest = distance;
            index = i;
          }
        });
        section.dataset.activePanel = String(index + 1);

        const title = panels[index]?.dataset.title;
        if (caption && title && title !== lastCaption) {
          caption.textContent = title;
          lastCaption = title;
        }
      }
    };

    const requestScrollUpdate = () => {
      if (disposed || scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateScroll);
    };

    const updatePointer = () => {
      pointerFrame = 0;
      root.style.setProperty("--pointer-x", `${pointer.x}px`);
      root.style.setProperty("--pointer-y", `${pointer.y}px`);
      root.style.setProperty("--px", ((pointer.x / window.innerWidth) * 2 - 1).toFixed(3));
      root.style.setProperty("--py", ((pointer.y / window.innerHeight) * 2 - 1).toFixed(3));
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(updatePointer);
    };

    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate);
    if (finePointer) window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Track width changes when the display font finishes loading; ResizeObserver
    // keeps the strip travel exact without re-rendering React on scroll.
    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(requestScrollUpdate);
    if (resizeObserver) {
      for (const section of horizontals) {
        const viewport = section.querySelector("[data-horizontal-viewport]");
        const track = section.querySelector("[data-horizontal-track]");
        if (viewport) resizeObserver.observe(viewport);
        if (track) resizeObserver.observe(track);
      }
    }
    document.fonts?.ready.then(() => requestScrollUpdate()).catch(() => {});

    // Paint the initial progress synchronously; the first frame should not
    // depend on a scroll event that may never fire.
    if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;
    updateScroll();

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", requestScrollUpdate);
      window.removeEventListener("pointermove", onPointerMove);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      root.removeAttribute("data-chapter");
      root.style.removeProperty("--scroll");
      root.style.removeProperty("--pointer-x");
      root.style.removeProperty("--pointer-y");
      root.style.removeProperty("--px");
      root.style.removeProperty("--py");
      for (const section of tracks) section.style.removeProperty("--p");
      for (const link of navLinks) {
        link.removeAttribute("data-active");
        link.removeAttribute("aria-current");
      }
      for (const step of railSteps) step.removeAttribute("data-active");
      for (const section of horizontals) {
        section.style.removeProperty("--p");
        section.style.removeProperty("--travel");
        section.style.removeProperty("--shift");
        section.removeAttribute("data-active-panel");
      }
    };
  }, [reduced]);
}
