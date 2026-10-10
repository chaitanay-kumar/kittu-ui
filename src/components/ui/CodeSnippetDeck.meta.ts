import type { KitUIComponentMeta } from '../../types/component';

const meta: KitUIComponentMeta = {
  title: 'Code Snippet Deck',
  description: 'An interactive multi-runtime developer code snippet deck with runtime switching (cURL, TypeScript, Python, Go, Rust), live dynamic parameter customizations, and line highlighting.',
  category: 'Buttons',
  tagline: 'Multi-language code runner snippet deck with live variable tuning',
  badges: ['Code Runner', 'Multi-Runtime', 'Live Customizer'],
  createdAt: '2026-08-19',
  features: [
    'Seamless multi-runtime tab switching (cURL, TypeScript, Python, Go, Rust)',
    'Dynamic parameter tuning drawer that updates generated code in real time',
    'Configurable line numbers and selective line highlighting',
    'macOS terminal-inspired window header with traffic dots and copy system',
    'Zero layout shift spring transition on tab changes',
  ],
  props: [
    { name: 'snippets', type: 'SnippetItem[]', default: '[]', description: 'Collection of language snippets and generator functions' },
    { name: 'parameters', type: 'SnippetParameter[]', default: '[]', description: 'Configurable runtime variables (checkboxes, dropdowns, inputs)' },
    { name: 'defaultLanguage', type: 'string', default: 'snippets[0]?.language', description: 'Initially selected language key' },
    { name: 'showLineNumbers', type: 'boolean', default: 'true', description: 'Whether to display code line numbering' },
    { name: 'showWindowBar', type: 'boolean', default: 'true', description: 'Whether to render macOS window bar header' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Custom CSS container classes' },
  ],
  accessibility: [
    'Semantic region container with ARIA code viewer roles',
    'Accessible tablist and tab roles with keyboard navigation',
    'High contrast accessible code text styling',
  ],
  usageCode: `import { CodeSnippetDeck } from "@/components/ui/code-snippet-deck";

const snippets = [
  {
    language: "typescript",
    label: "TypeScript",
    filename: "client.ts",
    highlightLines: [4, 5],
    code: (p: any) => \`import { ExampleClient } from "./example-client";

const client = new ExampleClient({
  apiKey: "\${p.apiKey || "sk_live_9981"}",
  streaming: \${p.stream ? "true" : "false"},
});

const response = await client.completions.create({
  model: "example-model",
  prompt: "Generate modern dark UI",
});\`,
  },
  {
    language: "curl",
    label: "cURL",
    filename: "request.sh",
    code: (p: any) => \`curl https://api.example.com/v1/completions \\
  -H "Authorization: Bearer \${p.apiKey || "sk_live_9981"}" \\
  -H "Content-Type: application/json" \\
  -d '{"model": "example-model", "stream": \${p.stream ? "true" : "false"}}'\`,
  },
];

const parameters = [
  { id: "stream", label: "Stream response", type: "boolean" as const, defaultValue: true },
  { id: "apiKey", label: "API Key", type: "text" as const, defaultValue: "sk_live_demo" },
];

export function Demo() {
  return <CodeSnippetDeck snippets={snippets} parameters={parameters} />;
}`,
};

export default meta;
