/** Native spring samples use React's springSnappy constants (380 / 30 / .5). */
function springFrames(from: number, to: number, property: (value: number) => Keyframe): Keyframe[] {
  const stiffness = 380, damping = 30, mass = .5;
  const root = Math.sqrt(damping * damping - 4 * mass * stiffness);
  const a = (-damping + root) / (2 * mass), b = (-damping - root) / (2 * mass);
  return Array.from({ length: 61 }, (_, index) => {
    const offset = index / 60;
    const remaining = (b * Math.exp(a * offset * .6) - a * Math.exp(b * offset * .6)) / (b - a);
    return { ...property(index === 60 ? to : to + (from - to) * remaining), offset };
  });
}
interface Snapshot { node: HTMLElement; rect: DOMRect; }
/** FLIP preserves React-like insertion/removal and movement without a React runtime. */
export class ActivityFeedMotion {
  private previous = new Map<string, Snapshot>();
  private animations = new Set<Animation>();
  private ghosts = new Set<HTMLElement>();
  private initialized = false;
  update(host: HTMLElement): void {
    const list = host.querySelector<HTMLElement>('.k-af-events');
    if (!list) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const next = new Map<string, Snapshot>();
    for (const node of Array.from(list.querySelectorAll<HTMLElement>('.k-af-event:not([data-leaving])'))) {
      const id = node.dataset['eventId']!;
      const rect = node.getBoundingClientRect();
      next.set(id, { node, rect });
      if (reduced || !this.initialized) continue;
      const old = this.previous.get(id);
      if (!old) {
        this.animate(node, springFrames(0, 1, value => ({ opacity: value, transform: `translateY(${(1-value)*-8}px) scale(${.98+.02*value})` })));
      } else {
        const dy = old.rect.top - rect.top;
        if (Math.abs(dy) > .5) this.animate(node, springFrames(dy, 0, value => ({ transform: `translateY(${value}px)` })));
      }
    }
    if (!reduced && this.initialized) {
      const parent = list.getBoundingClientRect();
      for (const [id, old] of this.previous) {
        if (next.has(id)) continue;
        const ghost = old.node.cloneNode(true) as HTMLElement;
        ghost.setAttribute('data-leaving', '');
        ghost.setAttribute('aria-hidden', 'true');
        for (const control of Array.from(ghost.querySelectorAll('[title]'))) control.removeAttribute('title');
        ghost.inert = true;
        Object.assign(ghost.style, { position: 'absolute', pointerEvents: 'none', margin: '0', top: `${old.rect.top-parent.top+list.scrollTop}px`, left: '0', width: `${old.rect.width}px`, height: `${old.rect.height}px` });
        list.appendChild(ghost);
        this.ghosts.add(ghost);
        this.animate(ghost, springFrames(1, 0, value => ({ opacity: value, transform: `scale(${.95+.05*value})` })), () => { ghost.remove(); this.ghosts.delete(ghost); });
      }
    }
    this.previous = next;
    this.initialized = true;
  }
  private animate(node: HTMLElement, frames: Keyframe[], done?: () => void): void {
    const animation = node.animate(frames, { duration: 600, easing: 'linear' });
    this.animations.add(animation);
    animation.finished.then(() => { this.animations.delete(animation); done?.(); }, () => { this.animations.delete(animation); done?.(); });
  }
  destroy(): void {
    for (const animation of this.animations) animation.cancel();
    for (const ghost of this.ghosts) ghost.remove();
    this.animations.clear(); this.ghosts.clear(); this.previous.clear();
  }
}
