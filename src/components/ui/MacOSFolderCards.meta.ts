import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'macOS Folder Cards',
  description: 'An authentic porcelain-white macOS Finder folder icon that unrolls interactive cards with fluid Apple spring physics.',
  category: 'Motion',
  tagline: 'macOS folder icon with fluid spring card reveal',
  badges: ['macOS Folder', 'Spring Morphing', 'Expandable', 'Minimal'],
  createdAt: '2026-08-28',
  features: [
    'Porcelain-white macOS folder silhouette with 3D flap hinge and cards peeking from pocket',
    'Interactive hover parallax lifts cards and tilts folder flap in 3D perspective',
    'Opens into a minimal, seamless card grid with Apple fluid spring easing',
    'Crisp pure white icons and Kit UI dark surface harmony',
  ],
  props: [
    { name: 'folderTitle', type: 'string', default: "'Components'", description: 'Title label of the folder icon' },
    { name: 'folderCategory', type: 'string', default: "'Pipeline'", description: 'Category breadcrumb for expanded header' },
    { name: 'items', type: 'MacOSFolderCardItem[]', default: 'demo items', description: 'Cards rendered in the expanded grid' },
    { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial open/expanded state' },
  ],
  accessibility: [
    'Uses aria-expanded state and keyboard activation (Enter/Space/Escape)',
    'Reduced motion replaces 3D transforms with clean opacity transitions',
  ],
  usageCode: `import { MacOSFolderCards } from "@/components/ui/macos-folder-cards";

export function Demo() {
  return (
    <MacOSFolderCards
      folderTitle="Components"
      folderCategory="Pipeline"
      items={[
        { id: '1', title: 'Registry Sync', description: 'Catalog reacts to source changes.', meta: '01' },
        { id: '2', title: 'SEO Audit', description: 'Metadata verified before release.', meta: '02' },
      ]}
    />
  );
}`,
};

export default meta;
