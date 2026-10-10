import { DestroyRef, ElementRef, afterEveryRender, inject } from '@angular/core';

/** Sample the React 300/32/0.6 overdamped spring without a motion dependency. */
const progress = Array.from({ length: 41 }, (_, index) => {
  const time = index * .015, omega = Math.sqrt(300 / .6), zeta = 32 / (2 * Math.sqrt(300 * .6));
  const root = Math.sqrt(zeta * zeta - 1), r1 = -omega * (zeta - root), r2 = -omega * (zeta + root);
  return { offset: index / 40, value: 1 - (r2 * Math.exp(r1 * time) - r1 * Math.exp(r2 * time)) / (r2 - r1) };
});
interface Snapshot { parent: HTMLElement; height: number; width: number; }
export function installAgentActivityMotion(): void {
  const host: HTMLElement = inject(ElementRef).nativeElement;
  let previous = new Map<HTMLElement, Snapshot>();
  const rotations = new Map<HTMLElement, number>();
  const animations = new Set<Animation>(), ghosts = new Set<HTMLElement>();
  const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function animate(node: HTMLElement, frames: Keyframe[], finish?: () => void): void {
    if (typeof node.animate !== 'function' || reduced()) { finish?.(); return; }
    const animation = node.animate(frames, { duration: 600, easing: 'linear' });
    animations.add(animation);
    animation.finished.catch(() => {}).finally(() => { animations.delete(animation); finish?.(); });
  }
  const render = afterEveryRender(() => {
    const current = new Map<HTMLElement, Snapshot>();
    for (const node of Array.from(host.querySelectorAll<HTMLElement>('.k-aa-disclosure:not([data-leaving])'))) {
      const rect = node.getBoundingClientRect();
      current.set(node, { parent: node.parentElement!, height: rect.height, width: rect.width });
      if (!previous.has(node)) animate(node, progress.map(({ offset, value }) => ({ offset, height: rect.height * value + 'px', opacity: value })));
    }
    for (const [node, snapshot] of previous) {
      if (current.has(node) || !host.contains(snapshot.parent) || reduced()) continue;
      const ghost = node.cloneNode(true) as HTMLElement;
      ghost.dataset['leaving'] = ''; ghost.setAttribute('aria-hidden', 'true'); ghost.setAttribute('inert', '');
      ghost.style.width = snapshot.width + 'px'; snapshot.parent.append(ghost); ghosts.add(ghost);
      animate(ghost, progress.map(({ offset, value }) => ({ offset, height: snapshot.height * (1 - value) + 'px', opacity: 1 - value, marginTop: 12 * (1 - value) + 'px' })), () => { ghost.remove(); ghosts.delete(ghost); });
    }
    previous = current;
    for (const chevron of Array.from(host.querySelectorAll<HTMLElement>('.k-aa-chevron'))) {
      const angle = chevron.classList.contains('k-aa-chevron-expanded') ? 180 : 0;
      const before = rotations.get(chevron) ?? angle; rotations.set(chevron, angle);
      if (before !== angle) animate(chevron, progress.map(({ offset, value }) => ({ offset, transform: `rotate(${before + (angle - before) * value}deg)` })));
    }
    for (const node of rotations.keys()) if (!host.contains(node)) rotations.delete(node);
  });
  inject(DestroyRef).onDestroy(() => { render.destroy(); for (const animation of animations) animation.cancel(); for (const ghost of ghosts) ghost.remove(); animations.clear(); ghosts.clear(); previous.clear(); rotations.clear(); });
}
