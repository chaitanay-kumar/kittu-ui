import {afterEveryRender, DestroyRef, ElementRef, effect, inject, type Signal} from '@angular/core';

/** Source translation spring; the press deformation itself follows its motion values directly. */
export function installStretchSwitchMotion(current: Signal<boolean>, pressed: Signal<boolean>): void {
  const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  const root1 = -30 + Math.sqrt(140), root2 = -30 - Math.sqrt(140);
  let initialized = false, value = 0, velocity = 0, target = 0, last = 0;
  let frame: number | ReturnType<typeof setTimeout> | undefined;
  const nativeFrames = typeof requestAnimationFrame === 'function';
  const write = () => {
    const thumb = host.querySelector<HTMLElement>('.k-stretch-thumb');
    if (thumb) thumb.style.transform = `translateX(${value}px) scaleX(${pressed() ? 1.18 : 1}) scaleY(${pressed() ? .86 : 1})`;
  };
  const schedule = () => nativeFrames ? requestAnimationFrame(tick) : setTimeout(() => tick(performance.now()), 16);
  const tick = (time: number) => {
    frame = undefined;
    const dt = Math.max(0, (time - last) / 1000); last = time;
    const distance = value - target;
    const c1 = (velocity - root2 * distance) / (root1 - root2), c2 = distance - c1;
    value = target + c1 * Math.exp(root1 * dt) + c2 * Math.exp(root2 * dt);
    velocity = root1 * c1 * Math.exp(root1 * dt) + root2 * c2 * Math.exp(root2 * dt);
    const done = Math.abs(value - target) <= .5 && Math.abs(velocity) <= 2;
    if (done) {value = target; velocity = 0;}
    write();
    if (!done) frame = schedule();
  };
  effect(() => {
    const next = current() ? 18 : 0; pressed();
    if (!initialized) {initialized = true; value = next; target = next;}
    else if (target !== next) {
      target = next; last = performance.now();
      if (frame === undefined) frame = schedule();
    }
    write();
  });
  afterEveryRender(write);
  inject(DestroyRef).onDestroy(() => {
    if (frame !== undefined) {
      if (nativeFrames) cancelAnimationFrame(frame as number); else clearTimeout(frame as ReturnType<typeof setTimeout>);
    }
  });
}
