import {
  Directive,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from "@angular/core";

/** Canvas lifecycle shared by native visual ports; no timers survive destruction. */
@Directive()
export abstract class KittuCanvasController {
  readonly label = input("Interactive visual");
  readonly density = input(90);
  readonly speed = input(1);
  readonly color = input("");
  readonly paused = input(false);
  readonly disabled = input(false);
  readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>("canvas");
  readonly pointer = signal({ x: 0.5, y: 0.5 });
  readonly running = signal(true);
  readonly mode: string = "dots";
  private frame = 0;
  private destroyed = false;
  private visible = true;
  private reduced = false;
  private draw?: () => void;
  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      const canvas = this.canvas()?.nativeElement;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const media = matchMedia("(prefers-reduced-motion: reduce)");
      this.reduced = media.matches;
      const resize = () => {
        const r = canvas.getBoundingClientRect();
        const dpr = Math.min(devicePixelRatio || 1, 2);
        canvas.width = Math.max(1, Math.round(r.width * dpr));
        canvas.height = Math.max(1, Math.round(r.height * dpr));
        this.schedule();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(canvas);
      const intersection = new IntersectionObserver((entries) => {
        this.visible = entries[0]?.isIntersecting ?? false;
        this.schedule();
      });
      intersection.observe(canvas);
      const preference = () => {
        this.reduced = media.matches;
        this.schedule();
      };
      media.addEventListener("change", preference);
      const visibility = () => this.schedule();
      document.addEventListener("visibilitychange", visibility);
      let time = 0,
        last = 0;
      this.draw = () => {
        if (this.destroyed) return;
        const now = performance.now();
        const delta = Math.min(50, now - (last || now));
        last = now;
        const animate =
          !this.reduced &&
          !this.paused() &&
          this.running() &&
          this.visible &&
          !document.hidden;
        if (animate)
          time += delta * 0.001 * Math.max(0, Math.min(5, this.speed()));
        this.paint(ctx, canvas.width, canvas.height, time);
        if (animate) this.frame = requestAnimationFrame(this.draw!);
        else this.frame = 0;
      };
      resize();
      destroy.onDestroy(() => {
        observer.disconnect();
        intersection.disconnect();
        media.removeEventListener("change", preference);
        document.removeEventListener("visibilitychange", visibility);
      });
    });
    effect(() => {
      this.paused();
      this.running();
      this.density();
      this.color();
      this.speed();
      this.pointer();
      this.schedule();
    });
    destroy.onDestroy(() => {
      this.destroyed = true;
      cancelAnimationFrame(this.frame);
    });
  }
  private schedule(): void {
    if (this.destroyed || !this.draw) return;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(this.draw);
  }
  move(event: PointerEvent): void {
    if (this.disabled()) return;
    const r = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.pointer.set({
      x: Math.max(0, Math.min(1, (event.clientX - r.left) / r.width)),
      y: Math.max(0, Math.min(1, (event.clientY - r.top) / r.height)),
    });
  }
  reset(): void {
    this.pointer.set({ x: 0.5, y: 0.5 });
  }
  protected paint(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    t: number,
  ): void {
    ctx.clearRect(0, 0, w, h);
    const color = this.color() || getComputedStyle(ctx.canvas).color;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    const count = Math.max(1, Math.min(400, Math.round(this.density())));
    const p = this.pointer();
    const mode = this.mode;
    const random = (i: number) => {
      const n = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      return n - Math.floor(n);
    };
    if (mode === "eye") {
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.ellipse(
          w / 2,
          h / 2,
          w * (0.3 - i * 0.065),
          h * (0.35 - i * 0.065),
          0,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = ["#153b66", "#f7f8fb", "#5bbbd5", "#17232e"][i];
        ctx.fill();
      }
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(
        w / 2 + (p.x - 0.5) * w * 0.09,
        h / 2 + (p.y - 0.5) * h * 0.09,
        w * 0.018,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      return;
    }
    if (mode === "nimbu") {
      const swing = Math.sin(t) * 0.08;
      ctx.save();
      ctx.translate(w / 2, h * 0.15);
      ctx.rotate(swing + (p.x - 0.5) * 0.15);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, h * 0.65);
      ctx.stroke();
      for (let i = 0; i < 7; i++) {
        ctx.fillStyle = i === 3 ? "#d7cd36" : "#56873c";
        ctx.beginPath();
        ctx.ellipse(
          Math.sin(i) * 9,
          h * 0.15 + i * h * 0.065,
          i === 3 ? 24 : 8,
          i === 3 ? 21 : 20,
          0.45,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      ctx.restore();
      return;
    }
    if (mode === "orb") {
      const radius = Math.min(w, h) * (0.24 + 0.025 * Math.sin(t * 2));
      const g = ctx.createRadialGradient(w / 2, h / 2, 2, w / 2, h / 2, radius);
      g.addColorStop(0, color);
      g.addColorStop(0.5, color);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.4;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.ellipse(
          w / 2,
          h / 2,
          radius * 1.4,
          radius * 0.5,
          t * 0.3 + (i * Math.PI) / 3,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      return;
    }
    if (mode === "blob") {
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const a = (i / 120) * Math.PI * 2;
        const r =
          Math.min(w, h) *
          (0.29 + 0.045 * Math.sin(a * 3 + t) + 0.02 * Math.cos(a * 5 - t));
        const x = w / 2 + Math.cos(a) * r,
          y = h / 2 + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      const g = ctx.createRadialGradient(
        w * 0.45,
        h * 0.4,
        5,
        w / 2,
        h / 2,
        Math.min(w, h) * 0.4,
      );
      g.addColorStop(0, color);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fill();
      return;
    }
    if (mode === "corridor") {
      const vanX = w * (0.5 + (p.x - 0.5) * 0.2),
        vanY = h * 0.5;
      for (let i = 0; i < 18; i++) {
        const scale = ((i / 18 + t * 0.08) % 1) ** 2;
        ctx.globalAlpha = scale;
        ctx.strokeRect(
          vanX - (w * scale) / 2,
          vanY - (h * scale) / 2,
          w * scale,
          h * scale,
        );
      }
      ctx.globalAlpha = 1;
      return;
    }
    if (mode === "rocket" && t % 3 < 1) {
      const y = h * (0.9 - (t % 3) * 0.65);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(w / 2, y - 20);
      ctx.lineTo(w / 2 - 9, y + 12);
      ctx.lineTo(w / 2 + 9, y + 12);
      ctx.fill();
      ctx.strokeStyle = "#fbbf24";
      ctx.beginPath();
      ctx.moveTo(w / 2, y + 12);
      ctx.lineTo(w / 2, y + 42);
      ctx.stroke();
      return;
    }
    for (let i = 0; i < count; i++) {
      const rx = random(i + 1),
        ry = random(i + 503);
      let x = rx * w,
        y = ry * h;
      ctx.globalAlpha = 0.2 + 0.7 * random(i + 999);
      if (mode === "warp") {
        const angle = rx * Math.PI * 2,
          r = ((ry + t * 0.25) % 1) * Math.hypot(w, h) * 0.6;
        x = w / 2 + Math.cos(angle) * r;
        y = h / 2 + Math.sin(angle) * r;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
          x + Math.cos(angle) * r * 0.12,
          y + Math.sin(angle) * r * 0.12,
        );
        ctx.stroke();
        continue;
      }
      if (mode === "meteors" || mode === "shooting") {
        if (mode === "shooting" && i > 2) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }
        x = ((rx + t * (mode === "shooting" ? 0.3 : 0.12)) % 1) * w;
        y = ((ry + t * (mode === "shooting" ? 0.1 : 0.18)) % 1) * h;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
          x - (mode === "shooting" ? 65 : 24),
          y - (mode === "shooting" ? 12 : 40),
        );
        ctx.stroke();
        continue;
      }
      if (mode === "burst" || mode === "rocket") {
        const angle = rx * Math.PI * 2,
          r =
            mode === "rocket"
              ? Math.max(0, ((t % 3) - 1) / 2)
              : (t * 0.4 + ry) % 1;
        x = w / 2 + Math.cos(angle) * r * w * 0.45;
        y =
          h * (mode === "rocket" ? 0.25 : 0.7) +
          Math.sin(angle) * r * h * 0.6 +
          r * r * h * 0.2;
        ctx.fillStyle = ["#a78bfa", "#38bdf8", "#fbbf24", "#fb7185"][i % 4];
      }
      if (mode === "orbit") {
        const a = rx * Math.PI * 2 + t * (0.3 + ry);
        x = w / 2 + Math.cos(a) * w * (0.15 + ry * 0.3);
        y = h / 2 + Math.sin(a) * h * (0.15 + ry * 0.3);
      }
      if (mode === "glyph") {
        ctx.font = `${Math.max(10, w / 35)}px monospace`;
        const chars = "01KITTU<>/{}";
        ctx.fillText(
          chars[Math.floor((rx * 100 + t * 4) % chars.length)],
          (Math.floor(rx * 30) * w) / 30,
          ((ry + t * 0.1) % 1) * h,
        );
        continue;
      }
      let radius = 1 + random(i + 5) * 2;
      if (mode === "dots" || mode === "shader" || mode === "density") {
        const cols = Math.max(4, Math.round(Math.sqrt((count * w) / h)));
        x = (((i % cols) + 0.5) * w) / cols;
        y = ((Math.floor(i / cols) + 0.5) * h) / Math.ceil(count / cols);
        const d = Math.hypot(x / w - p.x, y / h - p.y);
        radius =
          mode === "density"
            ? 1 + Math.max(0, 1 - d * 4) * 8
            : mode === "shader"
              ? 2 + Math.sin(x * 0.015 + y * 0.01 + t * 2) * 2
              : 1 + Math.max(0, 1 - d * 3) * 5;
      }
      if (mode === "sparkles" || mode === "stars") {
        radius *= 0.5 + 0.5 * Math.sin(t * 2 + rx * 10);
      }
      ctx.beginPath();
      ctx.arc(x, y, Math.max(0.4, radius), 0, Math.PI * 2);
      ctx.fill();
      if (mode === "sparkles" && i % 5 === 0) {
        ctx.beginPath();
        ctx.moveTo(x - radius * 3, y);
        ctx.lineTo(x + radius * 3, y);
        ctx.moveTo(x, y - radius * 3);
        ctx.lineTo(x, y + radius * 3);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }
}
