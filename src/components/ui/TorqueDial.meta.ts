import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Torque Dial',
  description: 'A rotational control dial with realistic physical angular momentum, velocity tracking, and exponential friction deceleration.',
  category: 'Motion',
  tagline: 'Rotational control knob with physical spin momentum',
  badges: ['Framer Motion', 'Physics Simulation', 'Precision Control', 'Forms'],
  createdAt: '2026-08-24',
  features: [
    'Natural angular momentum release with exponential friction deceleration decay',
    'Supports drag rotation, mouse wheel fine-tuning, keyboard arrow adjustments, and double-click centering',
    'Dynamic SVG radial progress ring with continuous value telemetry',
    'Full accessibility with role="slider", aria-valuenow, and keyboard stepping',
  ],
  props: [
    { name: 'value', type: 'number', description: 'Current numeric value' },
    { name: 'min', type: 'number', default: '0', description: 'Minimum dial threshold' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum dial threshold' },
    { name: 'step', type: 'number', default: '1', description: 'Step resolution increment' },
    { name: 'onChange', type: '(val: number) => void', description: 'Callback fired on rotation value updates' },
    { name: 'momentum', type: 'boolean', default: 'true', description: 'Enables velocity-based inertial spin after drag release' },
    { name: 'size', type: 'number', default: '120', description: 'Diameter in pixels' },
    { name: 'unit', type: 'string', default: "''", description: 'Optional unit suffix (e.g. "%", "dB", "°")' },
  ],
  accessibility: [
    'Semantic role="slider" with aria-valuemin, aria-valuemax, and aria-valuenow',
    'Arrow keys, Home, and End support for fine keyboard tuning',
    'Visible focus outline around knob bounding perimeter',
  ],
  usageCode: `import { useState } from "react";
import { TorqueDial } from "@/components/ui/torque-dial";

export function Demo() {
  const [gain, setGain] = useState(48);

  return (
    <div className="p-8 flex items-center justify-center bg-[#090909] rounded-2xl border border-[#1F1F1F]">
      <TorqueDial
        value={gain}
        onChange={setGain}
        min={0}
        max={100}
        unit="%"
        label="Gain Level"
      />
    </div>
  );
}`,
};

export default meta;
