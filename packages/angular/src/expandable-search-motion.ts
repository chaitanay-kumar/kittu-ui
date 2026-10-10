import {
  DestroyRef,
  ElementRef,
  afterEveryRender,
  effect,
  inject,
  type Signal,
} from "@angular/core";
/** Reference 380/30/.5 spring with interrupted velocity retained. */
export function installExpandableSearchMotion(expanded: Signal<boolean>): void {
  const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  const width = { value: 160, target: 160, velocity: 0 },
    color = { value: 0, target: 0, velocity: 0 };
  let frame = 0,
    last = 0,
    pendingWidth = false,
    backgroundAnimation: Animation | undefined,
    badge: HTMLElement | null = null,
    badgeAnimation: Animation | undefined;
  const r1 = -30 + Math.sqrt(140),
    r2 = -30 - Math.sqrt(140);
  const step = (
    axis: typeof width,
    dt: number,
    delta: number,
    speed: number,
  ) => {
    const x = axis.value - axis.target,
      c1 = (axis.velocity - r2 * x) / (r1 - r2),
      c2 = x - c1;
    axis.value = axis.target + c1 * Math.exp(r1 * dt) + c2 * Math.exp(r2 * dt);
    axis.velocity = r1 * c1 * Math.exp(r1 * dt) + r2 * c2 * Math.exp(r2 * dt);
    const done =
      Math.abs(axis.value - axis.target) <= delta &&
      Math.abs(axis.velocity) <= speed;
    if (done) {
      axis.value = axis.target;
      axis.velocity = 0;
    }
    return done;
  };
  const write = () => {
    const node = host.querySelector<HTMLElement>(".k-es-control");
    if (!node) return;
    node.style.width = width.value + "px";
    const channel = (from: number, to: number) =>
      Math.round(
        Math.sqrt(from * from + (to * to - from * from) * color.value),
      );
    const border = channel(31, 74),
      background = channel(14, 20);
    node.style.borderColor = `rgb(${border},${border},${border})`;
    if (typeof node.animate !== "function")
      node.style.backgroundColor = `rgb(${background},${background},${background})`;
  };
  const tick = (time: number) => {
    const dt = Math.max((time - last) / 1000, 0);
    last = time;
    const widthDone = step(width, pendingWidth ? 0 : dt, 0.5, 2);
    pendingWidth = false;
    const colorDone = step(color, dt, 0.005, 0.02);
    write();
    frame = widthDone && colorDone ? 0 : requestAnimationFrame(tick);
  };
  effect(() => {
    const open = expanded();
    const widthTarget = open ? 280 : 160;
    if (width.target !== widthTarget) {
      width.target = widthTarget;
      pendingWidth = true;
      const node = host.querySelector<HTMLElement>(".k-es-control");
      if (node && typeof node.animate === "function") {
        const from = Number(
            getComputedStyle(node).backgroundColor.match(/[\d.]+/g)?.[0] ?? 14,
          ),
          to = open ? 20 : 14;
        const frames = Array.from({ length: 61 }, (_, index) => {
          const time = index / 100,
            p =
              1 -
              (r2 * Math.exp(r1 * time) - r1 * Math.exp(r2 * time)) / (r2 - r1),
            v = Math.round(
              Math.sqrt(from * from + (to * to - from * from) * p),
            );
          return { backgroundColor: `rgb(${v},${v},${v})`, offset: index / 60 };
        });
        frames[60].backgroundColor = `rgb(${to},${to},${to})`;
        backgroundAnimation?.cancel();
        backgroundAnimation = node.animate(frames, {
          duration: 600,
          fill: "forwards",
        });
      }
    }
    const target = open ? 1 : 0;
    if (color.target !== target) {
      color.target = target;
      color.velocity = 0;
    }
    write();
    if (
      typeof requestAnimationFrame === "function" &&
      !frame &&
      (width.value !== width.target || color.value !== color.target)
    ) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }
  });
  afterEveryRender(() => {
    const node = host.querySelector<HTMLElement>(".k-es-shortcut");
    if (node === badge) return;
    badgeAnimation?.cancel();
    badge = node;
    if (!node) return;
    if (typeof node.animate === "function")
      badgeAnimation = node.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 300,
        easing: "cubic-bezier(.25,.1,.35,1)",
        fill: "forwards",
      });
    else node.style.opacity = "1";
  });
  inject(DestroyRef).onDestroy(() => {
    if (frame) cancelAnimationFrame(frame);
    badgeAnimation?.cancel();
    backgroundAnimation?.cancel();
  });
}
