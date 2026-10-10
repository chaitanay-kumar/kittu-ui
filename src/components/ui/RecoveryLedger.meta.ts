import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Recovery Ledger',
  description: 'An archival audit timeline and state recovery ledger with chronological snapshot markers, diff inspection, and one-click rollback triggers.',
  category: 'Feedback',
  tagline: 'Version history timeline & state recovery ledger',
  badges: ['Framer Motion', 'Timeline', 'Audit Log', 'Accessible'],
  createdAt: '2026-08-24',
  features: [
    'Chronological version ledger with vertical timeline rail and active head marker',
    'One-click state rollback action with loading animation feedback',
    'Expandable code diff viewer and snapshot metadata inspection drawer',
    'Full keyboard tab access and screen reader timestamp announcements',
  ],
  props: [
    { name: 'entries', type: 'LedgerEntry[]', description: 'Array of version history records (id, timestamp, action, description, author, details, restorable)' },
    { name: 'currentEntryId', type: 'string', default: 'undefined', description: 'Active head snapshot identifier' },
    { name: 'onRestore', type: '(id: string) => Promise<void> | void', default: 'undefined', description: 'Callback fired on version revert action' },
    { name: 'onSelect', type: '(id: string) => void', default: 'undefined', description: 'Callback when an entry is clicked' },
    { name: 'variant', type: "'timeline' | 'compact'", default: "'timeline'", description: 'Display format' },
  ],
  accessibility: [
    'Accessible timestamps formatted for clear assistive technology reading',
    'Proper <button> elements with clear action labels',
    'Contrast compliant with WCAG AA standards',
  ],
  usageCode: `import { useState } from "react";
import { RecoveryLedger } from "@/components/ui/recovery-ledger";

export function Demo() {
  const [currentId, setCurrentId] = useState('v3');
  const entries = [
    { id: 'v3', timestamp: '2m ago', action: 'Schema Migration', description: 'Added tenant_id column to organization tables.', author: 'Alex W.', details: { diff: '+ ALTER TABLE org ADD COLUMN tenant_id UUID;' } },
    { id: 'v2', timestamp: '1h ago', action: 'API Auth Refactor', description: 'Upgraded JWT verification to RS256 algorithm.', author: 'Sarah K.', details: { diff: '- alg: HS256\n+ alg: RS256' } },
    { id: 'v1', timestamp: 'Yesterday', action: 'Initial Release', description: 'Base schema initialized in primary region.', author: 'Alex W.' },
  ];

  return (
    <RecoveryLedger
      entries={entries}
      currentEntryId={currentId}
      onRestore={async (id) => setCurrentId(id)}
    />
  );
}`,
};

export default meta;
