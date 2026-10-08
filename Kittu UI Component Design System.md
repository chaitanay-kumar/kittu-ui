# Kit UI Premium Component Design System

## Purpose

You are building components for a premium animated React component library.

Every component must feel:

- Minimal
- Premium
- Modern
- Intentional
- Smooth
- Responsive
- Accessible
- Performant
- Production-ready
- Easy to integrate
- Visually refined without unnecessary decoration

The goal is **not** to make components look complicated.

The goal is to make simple interfaces feel unusually polished through:

1. Precise geometry
2. Subtle motion
3. Natural physical behavior
4. Strong typography
5. Consistent spacing
6. Carefully controlled color
7. Excellent micro-interactions
8. Responsive behavior
9. Accessibility
10. Performance-conscious implementation

---

# 1. Core Design Philosophy

Follow this rule:

> **Minimal surface, sophisticated behavior.**

A component should look simple when idle and reveal its sophistication through interaction.

Avoid designing something that looks "animated" all the time.

Prefer:

```text
Idle
  ↓
Minimal
  ↓
User interaction
  ↓
Subtle physical response
  ↓
Settled state
```

The animation should feel like part of the component's physical behavior rather than an effect placed on top of it.

---

# 2. Visual Language

## General aesthetic

The visual language should be:

- Clean
- Soft
- Neutral
- Slightly editorial
- Apple-inspired in interaction quality
- Modern developer-tool aesthetic
- High-end SaaS quality
- Minimal but expressive

Avoid:

- Excessive gradients
- Huge shadows
- Neon colors everywhere
- Excessive glassmorphism
- Thick borders
- Giant text
- Excessive rounded cards
- Decorative animations with no purpose
- Constant bouncing
- Random particles
- Over-designed backgrounds

---

# 3. Default Color Philosophy

The component should normally use neutral surfaces and one controlled accent.

Example neutral palette:

```text
Light surface:
#F4F4F9

Dark surface:
#262626

Light background:
white / near-white

Dark background:
black / near-black

Muted text:
#868593

Dark muted text:
#9B9AA7
```

These are references, not mandatory values.

The component should support customization when appropriate.

For example:

```tsx
color?: string
accentColor?: string
activeColor?: string
backgroundColor?: string
```

If the user explicitly gives a color:

> **Use that exact color as the primary accent.**

Do not replace it with a visually similar color.

If the user says:

> "Make it orange"

Use a controlled orange accent rather than making the entire component orange.

The accent should normally appear in:

- Active states
- Focus states
- Selected states
- Important feedback
- Small decorative details
- Motion accents

Do not flood the entire component with the accent color.

---

# 4. Color Rules

Use color hierarchically.

### Level 1 — Base

Neutral surfaces.

```text
#F4F4F9
#262626
white
black
```

### Level 2 — Secondary

Muted foregrounds.

```text
#868593
#9B9AA7
foreground/50
foreground/70
```

### Level 3 — Accent

One strong accent.

Example:

```text
#FC4C01
#FF5F2E
#1A73F2
#39D353
```

### Level 4 — Feedback

Only when required:

```text
Success → green
Error → red
Warning → amber
```

Feedback colors should remain restrained.

---

# 5. Typography

Typography should be quiet and precise.

Prefer:

```tsx
text-sm
text-base
text-lg
font-medium
font-semibold
```

Avoid excessive:

```text
font-black
text-5xl
text-7xl
tracking-wide everywhere
```

Use hierarchy through:

- Size
- Weight
- Opacity
- Spacing

rather than decorative styling.

Example:

```tsx
text-sm font-medium text-foreground/70
```

is often better than:

```tsx
text-sm font-bold text-orange-500 tracking-widest
```

---

# 6. Border Radius

Use rounded geometry consistently.

Typical values:

```text
6px
8px
10px
12px
14px
16px
20px
24px
28px
```

Do not randomly mix radii.

Small controls:

```text
rounded-lg
rounded-xl
```

Large surfaces:

```text
rounded-2xl
rounded-[28px]
```

Circular controls:

```text
rounded-full
```

If a component has animated geometry, the radius should also animate when appropriate.

---

# 7. Shadows

Shadows should communicate depth rather than decoration.

Prefer extremely subtle shadows.

Example:

```tsx
shadow-[0_0.5px_1px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.08)]
```

Dark mode should use a separate shadow treatment.

Avoid:

```text
huge drop shadows
colored glow shadows
multiple strong shadows
```

unless the design specifically requires them.

---

# 8. Motion Philosophy

## Most important rule

> **Never animate something just because you can.**

Every animation must answer:

**Why is this moving?**

Good reasons:

- User interacted
- State changed
- Element appeared
- Element disappeared
- Position changed
- Selection changed
- Data arrived
- Focus changed
- Pointer approached
- User dragged something
- Content expanded
- Content collapsed

Bad reasons:

- "It looks cool"
- "More animation feels premium"
- "The component should always move"

---

# 9. Motion Should Feel Physical

Prefer physical motion over linear motion.

Use:

- Spring
- Ease-out
- Soft acceleration
- Deceleration
- Small overshoot
- Damped movement
- Geometry-aware movement

Avoid unnecessary:

```text
linear
ease-in-out everywhere
```

Example:

```tsx
const SPRING = {
  type: "spring",
  stiffness: 320,
  damping: 34,
  mass: 0.7,
}
```

Springs should generally be:

- Fast enough to feel responsive
- Damped enough to avoid excessive bounce
- Stable enough to feel intentional

---

# 10. Motion Hierarchy

Motion should have hierarchy just like typography.

## Micro motion

Used for:

- Hover
- Press
- Focus
- Icon changes

Typical:

```text
100–250ms
```

## Component motion

Used for:

- Expansion
- Collapse
- Selection
- Position changes

Typical:

```text
250–650ms
```

## Cinematic motion

Used for:

- Reveal
- Large state transitions
- Complex visual transformations

Typical:

```text
400–1000ms+
```

Long animations should still feel responsive.

---

# 11. Press Interaction

Interactive controls should usually have a subtle press response.

Example:

```tsx
whileTap={{ scale: 0.94 }}
```

But do not apply aggressive scaling everywhere.

Typical range:

```text
0.92–0.98
```

A button should feel like it has physical depth.

---

# 12. Hover Interaction

Hover should be subtle.

Good:

```tsx
whileHover={{ scale: 1.03 }}
```

or:

```tsx
whileHover={{ y: -2 }}
```

or:

```tsx
hover:bg-foreground/5
```

Avoid:

```text
scale 1.2
large rotations
huge translations
```

unless the interaction specifically calls for it.

---

# 13. Pointer-Driven Motion

For advanced components, motion can respond continuously to pointer position.

Preferred architecture:

```text
Pointer
   ↓
MotionValue
   ↓
Distance
   ↓
Transform
   ↓
Spring
   ↓
Visual output
```

Example:

```tsx
const distance = useTransform(mouseY, ...)

const targetScale = useTransform(
  distance,
  ...,
)

const scale = useSpring(targetScale, {
  stiffness: 320,
  damping: 34,
})
```

Do not continuously call React state updates for pointer movement when a `MotionValue` can be used.

This keeps the interaction smooth and avoids unnecessary React renders.

---

# 14. Geometry-Driven Animation

Premium components should understand their own geometry.

Use:

```tsx
getBoundingClientRect()
```

when the animation genuinely depends on position.

Examples:

- Tooltip placement
- Sidebar indicators
- Cursor-following elements
- Gooey navigation
- Connecting shapes
- Animated rails
- Drag interactions

Avoid hardcoded pixel positions when the layout is dynamic.

---

# 15. Animation Based on Distance

For proximity effects:

```text
distance = pointer - element
```

Then map distance into a visual range.

For example:

```text
far away
  ↓
small

near
  ↓
larger

center
  ↓
maximum
```

Use clamped transforms.

Never allow the animation to grow without limits.

---

# 16. Staggering

Use stagger carefully.

Good:

```text
0.02s
0.035s
0.05s
0.07s
```

Avoid obvious cascading animations that make the interface feel slow.

Stagger should create rhythm, not delay usability.

---

# 17. Enter Animations

When an element enters:

Prefer combinations like:

```text
opacity
scale
x/y
blur
```

Example:

```tsx
initial={{
  opacity: 0,
  scale: 0.9,
  y: 8,
}}
animate={{
  opacity: 1,
  scale: 1,
  y: 0,
}}
```

Avoid large entrance movements.

---

# 18. Exit Animations

Exit animations should usually be faster than entrance animations.

Example:

```text
Enter: 400ms
Exit: 250ms
```

The user should not feel blocked by disappearing UI.

---

# 19. Layout Animation

Use Motion layout animations when the actual layout changes.

Examples:

```tsx
<motion.div layout />
```

Useful for:

- Expanding panels
- Tabs
- Navigation
- Lists
- Reordering
- Dynamic cards

Do not animate layout manually if Motion's layout system can handle it reliably.

---

# 20. SVG Animation

SVG is strongly encouraged when geometry is easier to express with vectors.

Use SVG for:

- Rings
- Lines
- Curves
- Icons
- Connecting shapes
- Progress indicators
- Animated borders
- Gooey seams

Useful properties:

```text
pathLength
strokeDasharray
strokeDashoffset
transform
opacity
```

For example:

```tsx
initial={{ pathLength: 0 }}
animate={{ pathLength: 1 }}
```

This often creates a cleaner result than CSS tricks.

---

# 21. Canvas

Use Canvas when the component involves many visual elements.

Good use cases:

- Particle systems
- Procedural effects
- Image processing
- Pixel transitions
- Large grids
- Complex visualizations

Avoid creating hundreds of React DOM nodes for effects that can be rendered efficiently on Canvas.

---

# 22. WebGL

Use WebGL when the visual requires shader-level procedural rendering.

Good use cases:

- Fluid effects
- Noise
- Organic surfaces
- Distortion
- Advanced gradients
- Procedural backgrounds

Keep WebGL isolated from React state.

Use React primarily for:

- Lifecycle
- Configuration
- Mounting
- Cleanup

The animation loop should run outside normal React rendering.

---

# 23. React State

Use React state for semantic UI state:

```text
open
closed
active
selected
status
loaded
error
```

Do not use React state for high-frequency animation values.

Bad:

```tsx
setMouseX(event.clientX)
```

for every pointer movement.

Prefer:

```tsx
motionValue.set(event.clientX)
```

---

# 24. Refs

Use refs for:

- DOM measurement
- Animation targets
- Timers
- Previous values
- Canvas
- WebGL
- Imperative Motion APIs

Example:

```tsx
const elementRef = useRef<HTMLDivElement>(null)
```

---

# 25. Performance

Every component must be performance-conscious.

Rules:

- Avoid unnecessary renders
- Avoid state updates inside animation loops
- Use MotionValues for continuous motion
- Use `requestAnimationFrame` where appropriate
- Clean up animation frames
- Clean up observers
- Clean up timers
- Clean up event listeners
- Use `ResizeObserver` for responsive geometry
- Use `IntersectionObserver` for expensive offscreen animations
- Stop animations when they are no longer needed
- Avoid unnecessary DOM nodes
- Avoid recreating expensive objects every render

---

# 26. IntersectionObserver

If an animation is expensive and can be offscreen:

```text
visible → animate
hidden → pause
```

This is especially useful for:

- Canvas
- WebGL
- Particle systems
- Large visualizations
- Scroll animations

Give the observer a small root margin when appropriate.

---

# 27. ResizeObserver

If geometry depends on component dimensions:

Use:

```tsx
const observer = new ResizeObserver(...)
```

Do not assume a component has a fixed width.

Components must work inside:

```text
small cards
large cards
mobile
desktop
sidebars
full-width containers
```

---

# 28. Responsive Design

Every component must be responsive by default.

Think about:

### Mobile

- Reduced spacing
- Smaller controls
- Smaller typography where necessary
- Touch-friendly targets
- No hover dependency
- No overflowing content

### Tablet

- Intermediate geometry

### Desktop

- Full interaction
- More generous spacing
- Hover/proximity interactions

Never make a component responsive only by shrinking everything.

Instead, preserve the component's visual hierarchy.

---

# 29. Touch Devices

Hover-only interactions must have a fallback.

If a component uses:

```text
hover
pointer proximity
cursor position
```

make sure it still works on touch devices.

Possible strategies:

- Tap
- Press
- Focus
- Selected state
- Simplified motion

---

# 30. Accessibility

Accessibility is mandatory.

Use:

```text
button
nav
input
a
ul
li
```

where semantically appropriate.

Avoid using:

```tsx
<div onClick={...}>
```

when a button should be used.

---

# 31. Keyboard Support

Interactive components should support:

```text
Tab
Enter
Space
Arrow keys
Home
End
Escape
```

when appropriate.

For composite controls, implement proper keyboard navigation.

---

# 32. ARIA

Use ARIA when it provides missing semantic information.

Examples:

```tsx
aria-label
aria-current
aria-expanded
aria-controls
aria-live
aria-hidden
role="menu"
role="menuitem"
```

Do not add ARIA attributes randomly.

Use native semantics first.

---

# 33. Focus States

Never remove focus without replacing it.

Good:

```tsx
focus-visible:ring-2
```

Focus should be:

- Visible
- Subtle
- Consistent with the accent system
- Keyboard-only where appropriate

---

# 34. Reduced Motion

Every animated component must respect:

```text
prefers-reduced-motion
```

With Motion:

```tsx
const reduceMotion = useReducedMotion()
```

When reduced motion is enabled:

- Remove unnecessary movement
- Remove large transitions
- Remove particle effects
- Remove continuous animations
- Prefer opacity/state changes
- Jump to final positions where appropriate

Example:

```tsx
const transition = reduceMotion
  ? { duration: 0 }
  : SPRING
```

---

# 35. Animation Cleanup

Every imperative animation must be cleaned up.

For example:

```tsx
return () => {
  cancelAnimationFrame(frame)
  observer.disconnect()
  animation.stop()
}
```

Timers must also be cleared.

Never leave:

- Animation frames
- Intervals
- Observers
- Event listeners
- WebGL loops

running after unmount.

---

# 36. Dark Mode

Components should support both:

```text
light
dark
```

Use Tailwind dark mode.

Example:

```tsx
bg-[#F4F4F9] dark:bg-[#262626]
```

Do not simply invert colors.

Dark mode often needs:

- Different surface contrast
- Different shadows
- Slightly adjusted muted text
- Different border opacity

---

# 37. Component API

Components should have a clean API.

Prefer:

```tsx
<Component
  size="md"
  color="#FC4C01"
  ...
/>
```

over many deeply nested configuration objects.

Good APIs expose meaningful design controls.

Examples:

```tsx
size?: "sm" | "md" | "lg"
color?: string
disabled?: boolean
className?: string
```

For controlled state:

```tsx
value?
defaultValue?
onChange?
```

For callbacks:

```tsx
onComplete?
onOpenChange?
onSelect?
onReact?
```

---

# 38. Controlled + Uncontrolled State

When appropriate, support both.

Pattern:

```tsx
value?: T
defaultValue?: T
onChange?: (value: T) => void
```

Use:

```tsx
const active = value ?? internalValue
```

This makes the component flexible for both simple and advanced users.

---

# 39. Class Name Customization

Expose:

```tsx
className?: string
```

and merge using:

```tsx
cn(...)
```

when the project provides a `cn` utility.

Also expose targeted class overrides only when there is a real use case.

Avoid exposing 20 customization props.

---

# 40. Avoid Over-Abstraction

Do not create unnecessary abstractions.

A component should be understandable by another developer.

Prefer:

```text
small helper functions
clear constants
typed props
logical subcomponents
```

Avoid:

```text
generic animation engines
unnecessary factories
massive configuration systems
```

unless the complexity is genuinely reusable.

---

# 41. Constants

Put design constants near the top.

Example:

```tsx
const SPRING = {
  type: "spring",
  stiffness: 320,
  damping: 34,
}
```

Also define:

```text
sizes
durations
radii
motion ranges
colors
thresholds
```

This makes tuning easier.

---

# 42. Naming

Use descriptive names.

Good:

```text
SPRING
FADE_IN
PANEL_WIDTH
MAX_PARTICLES
RADIUS
activeIndex
hoveredIndex
placement
```

Bad:

```text
x1
foo
temp
thing
anim2
```

---

# 43. Comments

Comments should explain **why**, not what.

Good:

```tsx
// Keep the gap open only near the active seam so adjacent segments merge naturally.
```

Bad:

```tsx
// Set gap to span.
```

Explain unusual implementation decisions.

---

# 44. Motion Should Match Geometry

If an element moves from A → B:

Do not simply animate:

```tsx
x: 100
```

if its actual destination changes dynamically.

Measure the geometry.

Use:

```tsx
getBoundingClientRect()
```

or Motion layout systems.

The animation should remain correct if:

- Text changes
- Screen resizes
- Font loads
- Container width changes
- Items are added
- Items are removed

---

# 45. Micro-Interaction Quality

Premium feel often comes from tiny details:

- Slight press compression
- Soft hover lift
- Subtle opacity transition
- Animated focus ring
- Small icon rotation
- Smooth caret
- Delayed success ring
- Controlled stagger
- Small overshoot
- Proper exit timing
- Geometry-aware tooltip
- Smooth color transition

These details matter more than large visual effects.

---

# 46. Avoid Generic Animation Recipes

Do NOT automatically add:

```tsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

to every component.

First determine the interaction model.

Possible models:

```text
spring movement
morphing geometry
proximity response
scroll response
drag physics
particle burst
procedural rendering
state choreography
layout transition
SVG drawing
```

Choose the model that fits the component.

---

# 47. Interaction Model Selection

Before writing code, ask internally:

### Is the interaction spatial?

Use:

```text
MotionValue
distance
transform
spring
```

### Is it a state transition?

Use:

```text
AnimatePresence
variants
layout
spring/ease
```

### Is it a geometric shape?

Consider:

```text
SVG
pathLength
motion paths
```

### Is it many visual elements?

Consider:

```text
Canvas
```

### Is it procedural?

Consider:

```text
WebGL
shader
requestAnimationFrame
```

### Is it navigation?

Use:

```text
active state
geometry
scroll detection
keyboard
ARIA
```

---

# 48. Animation Timing

Use timing deliberately.

Typical premium values:

```text
Press:
120–220ms

Hover:
150–250ms

Small state change:
200–350ms

Panel:
350–650ms

Large transformation:
500–800ms

Cinematic reveal:
600–1200ms
```

These are guidelines, not hard rules.

---

# 49. Easing

Useful easing:

```tsx
ease: [0.32, 0.72, 0, 1]
```

or:

```tsx
ease: [0.22, 1, 0.36, 1]
```

For physical interactions prefer springs.

For deterministic transitions prefer cubic-bezier easing.

---

# 50. Avoid Excessive Bounce

Bounce can quickly make a component feel cheap.

Use:

```text
small bounce
high damping
short travel
```

instead of:

```text
large overshoot
low damping
long oscillation
```

Premium motion should usually settle quickly.

---

# 51. Layered Motion

Complex components can have multiple animation layers.

For example:

```text
Container
  ↓
Panel
  ↓
Icon
  ↓
Content
```

Each layer should have slightly different timing.

Example:

```text
Container → 600ms
Panel → 440ms
Children → 300ms
Icon → 220ms
```

This creates depth without making the animation feel slow.

---

# 52. State Choreography

For components with multiple states:

```text
idle
↓
active
↓
success
```

or:

```text
closed
↓
opening
↓
open
↓
confirm
↓
success
```

Design the complete transition sequence.

Do not animate individual elements independently without considering the overall state.

---

# 53. Example: Premium Delete Interaction

A delete control might behave like:

```text
Idle
  ↓ click
Container expands
  ↓
Lid opens
  ↓
Confirm / Cancel appear
  ↓
Confirm
  ↓
Icon morphs into check
  ↓
Success settles
```

Every stage should have purpose.

---

# 54. Example: Premium Navigation

Navigation can use:

```text
Active item
  ↓
Geometry measurement
  ↓
Indicator moves
  ↓
Spring / curved path
  ↓
New item settles
```

This is preferable to simply changing:

```text
background-color
```

when the design calls for richer interaction.

---

# 55. Example: Proximity Navigation

For a pointer-sensitive navigation:

```text
Pointer Y
   ↓
distance from item
   ↓
normalized influence
   ↓
target width
   ↓
spring
   ↓
dash expansion
```

The visual response should decay naturally with distance.

---

# 56. Example: Emoji / Particle Interaction

For a reaction component:

```text
Press
 ↓
reaction selected
 ↓
particle burst
 ↓
particles rise
 ↓
fade + blur
 ↓
settle/remove
```

Keep particle count controlled.

Use:

```text
MAX_PARTICLES
```

and clean completed particles.

---

# 57. Example: Image Reveal

For complex image reveals:

```text
placeholder
 ↓
procedural grid
 ↓
progressive split
 ↓
image color sampling
 ↓
detail-based reveal ordering
 ↓
photo fade
 ↓
settled image
```

This is much better than:

```text
opacity 0 → 1
```

when the design calls for a distinctive reveal.

---

# 58. Image / Media Components

Images must:

- Handle loading
- Handle failure
- Preserve aspect ratio
- Work responsively
- Avoid layout shift
- Respect CORS constraints where applicable
- Avoid expensive repeated decoding
- Provide meaningful alt text

---

# 59. Data Components

For data-driven components:

- Accept data as props
- Provide sensible empty states
- Avoid hardcoded data
- Support loading
- Handle missing values
- Keep visualization responsive
- Provide accessible labels

---

# 60. External Data

If a component fetches data:

- Make fetching optional
- Prefer externally supplied data
- Handle loading state
- Handle errors
- Avoid unnecessary requests
- Clean up stale async results

Pattern:

```text
props data exists
→ use props

otherwise
→ optional fetch
```

---

# 61. Component Should Degrade Gracefully

If an advanced API isn't available:

```text
ResizeObserver missing
→ still render

IntersectionObserver missing
→ still render

WebGL unavailable
→ fallback

Canvas unavailable
→ fallback

Reduced motion
→ static/instant state
```

Never let an enhancement break the component.

---

# 62. Browser Compatibility

Avoid assuming every modern API exists.

Guard APIs such as:

```tsx
typeof ResizeObserver === "function"
```

and:

```tsx
typeof IntersectionObserver === "function"
```

when necessary.

---

# 63. Loading States

Loading should feel like part of the design.

Prefer:

- Soft skeleton
- Shimmer
- Procedural placeholder
- Progressive reveal

Avoid excessive:

```text
spinner everywhere
```

when a contextual loading animation is more appropriate.

---

# 64. Error States

Errors should be:

- Clear
- Brief
- Visually restrained
- Accessible

Use animation only when it improves comprehension.

For example:

```text
error → subtle shake
```

can communicate failure effectively.

---

# 65. Success States

Success can use:

- Checkmark drawing
- Border animation
- Small scale settle
- Color transition
- Icon morph

Avoid:

```text
confetti everywhere
```

unless explicitly requested.

---

# 66. Component Structure

Preferred structure:

```tsx
"use client"

import ...

const CONSTANTS = ...

type ...

function helper() ...

function SubComponent() ...

export function Component() {
  ...
}

export default Component
```

Keep the main component readable.

Extract internal subcomponents when they represent a meaningful conceptual unit.

---

# 67. TypeScript

Use strong TypeScript types.

Prefer:

```tsx
type Size = "sm" | "md" | "lg"
```

instead of:

```tsx
size: string
```

Use:

```tsx
ComponentProps<"div">
```

when extending native props.

Use:

```tsx
Omit<...>
```

when overriding native handlers.

---

# 68. No Unnecessary Dependencies

Use the project's existing dependencies.

Preferred animation library when the project uses it:

```text
motion/react
```

Do not add another animation library just for one effect.

Use existing:

```text
lucide-react
radix
cn
```

when already available.

---

# 69. Tailwind

Use Tailwind for:

- Layout
- Spacing
- Typography
- Colors
- Radius
- Responsive behavior
- States

Use inline styles only when values are dynamic.

Examples:

```tsx
style={{ width }}
style={{ x }}
style={{ backgroundColor: color }}
```

Do not create hundreds of arbitrary Tailwind classes dynamically.

---

# 70. Dynamic Styles

If a value comes from props:

```tsx
style={{ backgroundColor: color }}
```

is often preferable to constructing:

```tsx
`bg-[${color}]`
```

Tailwind cannot reliably statically detect arbitrary runtime class names.

---

# 71. DOM Structure

Keep the DOM as small as possible.

Every wrapper should have a purpose:

- Positioning
- Clipping
- Layout
- Accessibility
- Animation
- Measurement

Remove unnecessary wrappers.

---

# 72. Overflow

Use:

```tsx
overflow-hidden
```

when animations need clipping.

Use:

```tsx
overflow-visible
```

when elements intentionally escape their container.

Think carefully about:

- Tooltips
- Particles
- SVG
- Shadows
- Transforms

---

# 73. Z-Index

Use a simple layering hierarchy.

Example:

```text
background → 0
content → 10
interactive → 20
popover → 30
tooltip → 50
```

Do not randomly use:

```text
z-[999999]
```

---

# 74. Tooltips / Floating UI

Floating elements should calculate their position rather than assume enough room exists.

Account for:

- Viewport edges
- Alignment
- Trigger position
- Tooltip width
- Top/bottom available space

Prefer flipping:

```text
top
↓ if insufficient room
bottom
```

rather than clipping.

---

# 75. Touch / Pointer Events

Use pointer events when supporting:

- Mouse
- Touch
- Pen

Avoid building separate mouse and touch implementations unless necessary.

---

# 76. Interaction Guarding

Complex pointer interactions often require guarding against duplicate events.

For example:

```text
pointerdown
→ open menu
→ pointerup
→ selection
→ click
```

Prevent the same action from firing twice.

Use refs for ephemeral interaction guards rather than React state when appropriate.

---

# 77. Avoid State Cascades

Do not create unnecessary effects that update state based on state.

When possible:

- derive values during render
- use refs for transient values
- use callbacks
- use MotionValues
- use layout measurements

This reduces render cascades.

---

# 78. Async Safety

For async operations:

```tsx
let active = true

...

if (active) setData(...)

return () => {
  active = false
}
```

or use an appropriate abort mechanism.

Never allow stale async results to update an unmounted component.

---

# 79. User Request Priority

When the user gives a design instruction, follow it above generic defaults.

For example:

> "Use #8B5CF6"

Use:

```text
#8B5CF6
```

Do not substitute another purple.

If the user specifies:

> "No bounce"

Do not add bounce.

If the user says:

> "Very subtle"

Reduce:

- Distance
- Scale
- Opacity change
- Spring bounce
- Duration

If the user says:

> "Cinematic"

Allow:

- Longer timing
- Layered motion
- More pronounced reveal
- More complex sequencing

---

# 80. When Given an Image

If the user provides an image/reference:

Recreate the visual language as accurately as practical.

Analyze:

```text
Layout
Spacing
Typography
Colors
Borders
Radius
Shadows
Iconography
Geometry
Motion implication
Hierarchy
```

Do not merely imitate the broad concept.

Aim for:

```text
same visual rhythm
same proportions
same interaction intent
same hierarchy
```

while still writing clean reusable code.

---

# 81. Pixel-Accurate Rule

If the user specifically requests:

> "pixel accurate"

prioritize:

- Exact spacing
- Exact radius
- Exact colors
- Exact proportions
- Exact alignment
- Exact icon size
- Exact border thickness
- Exact typography hierarchy

Do not "improve" the design unless asked.

---

# 82. Motion Matching

If a reference component is supplied, identify its motion model.

For example:

```text
Fluid Orb
→ procedural shader motion

OTP
→ spring + state choreography

Gooey Nav
→ geometry + SVG morph

Grid Reveal
→ procedural canvas + progressive split

Hook Sidebar
→ animated rail geometry

Bounce Sidebar
→ curved spring movement

Delete Button
→ staged state choreography

Emoji Reaction
→ gesture + particle burst

Proximity Sidebar
→ distance-based spring scaling
```

Do not copy the exact implementation blindly.

Copy the **interaction principles** and adapt them to the new component.

---

# 83. Premium Component Checklist

Before delivering a component, verify:

### Visual

- [ ] Minimal
- [ ] Good spacing
- [ ] Consistent radius
- [ ] Controlled color
- [ ] Strong hierarchy
- [ ] Light mode
- [ ] Dark mode

### Motion

- [ ] Purposeful animation
- [ ] Smooth easing/spring
- [ ] No excessive bounce
- [ ] Good enter/exit
- [ ] Good press state
- [ ] Good hover state
- [ ] Good state transitions
- [ ] Reduced-motion support

### Responsive

- [ ] Mobile works
- [ ] Tablet works
- [ ] Desktop works
- [ ] No overflow
- [ ] Touch works
- [ ] Hover is not required

### Accessibility

- [ ] Semantic HTML
- [ ] Keyboard support
- [ ] Focus visible
- [ ] ARIA where necessary
- [ ] Screen-reader behavior
- [ ] Reduced motion

### Performance

- [ ] No unnecessary renders
- [ ] MotionValues for continuous animation
- [ ] Cleanup implemented
- [ ] Observers cleaned up
- [ ] Timers cleaned up
- [ ] Animation frames cleaned up
- [ ] Offscreen animation paused where useful

### Code quality

- [ ] TypeScript
- [ ] Reusable props
- [ ] Clean API
- [ ] No unnecessary dependencies
- [ ] Clear constants
- [ ] Helpful comments
- [ ] No magic numbers without explanation
- [ ] Production-ready

---

# 84. Final AI Instruction

When asked to create a component, follow this process:

## Step 1 — Understand

Identify:

```text
What is the component?
What is the primary interaction?
What is the visual hierarchy?
What should move?
What should remain stable?
What is the user's intent?
```

## Step 2 — Choose the Motion Model

Select the most appropriate model:

```text
Spring
Ease
Layout animation
SVG
MotionValue
Proximity
Scroll
Canvas
WebGL
Particle
Gesture
State choreography
```

Do not automatically use every technique.

## Step 3 — Establish Visual Tokens

Define:

```text
colors
sizes
spacing
radius
shadows
motion constants
```

near the top of the file.

## Step 4 — Build the Static UI

Make the component look excellent with animations disabled.

If the static component looks bad, animation will not fix it.

## Step 5 — Add Interaction

Add the smallest motion necessary to communicate the interaction.

## Step 6 — Add Physical Refinement

Use:

```text
spring
damping
small overshoot
geometry
stagger
```

only where it improves the experience.

## Step 7 — Add Accessibility

Implement:

```text
keyboard
focus
ARIA
semantic elements
reduced motion
```

## Step 8 — Add Responsive Behavior

Test mentally at:

```text
320px
375px
768px
1024px
1440px+
```

## Step 9 — Optimize

Check:

```text
render count
animation loops
observers
event listeners
timers
DOM count
```

## Step 10 — Final Polish

Ask:

> Does this feel expensive?

Not:

> Does this have enough animation?

The correct result should feel:

**simple at first glance, sophisticated during interaction.**

---

# 85. Golden Rule

> **Premium UI is not more decoration. Premium UI is better decisions.**

Use fewer visual elements.

Use better spacing.

Use one strong accent.

Use subtle depth.

Use motion that understands geometry.

Use springs when something should feel physical.

Use easing when something should feel intentional.

Use state choreography when something changes.

Use Canvas/WebGL only when the visual actually benefits from it.

Respect reduced motion.

Respect accessibility.

Respect performance.

And above all:

> **Make the component feel inevitable — as if that is exactly how the interface should behave.**