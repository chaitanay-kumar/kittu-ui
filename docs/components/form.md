# Form System

A modular, composable form system with accessible inputs, textareas, custom selects, checkboxes, radio groups, switches, and animated validation messages.

## Features

- **Composable Architecture:** Form primitives (`Form`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`) allow arbitrary layout structures.
- **Rich Control Set:** `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `RadioGroupItem`, and `Switch`.
- **Spring Animations:** Validation messages and interactive controls use Framer Motion springs for tactile responsiveness.
- **Password Toggle:** Built-in eye icon toggle for password inputs with `showPasswordToggle`.
- **Validation Styling:** Built-in error states with border highlights and accessible alert announcements.
- **Consistent Tokens:** Inputs feature `#0A0A0A` base background, `#111111` active focus, and Sky-400 focus ring.

## Installation

```bash
npx shadcn@latest add chaitanay-kumar/kittu-ui/form
```

## Basic Usage

```tsx
import React, { useState } from 'react';
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Input,
  Checkbox,
  Switch,
  Select,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

export function Demo() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
    } else {
      setError('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <FormItem>
        <FormLabel required>Email Address</FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
          />
        </FormControl>
        <FormDescription>Used for account authentication.</FormDescription>
        <FormMessage error={error} />
      </FormItem>

      <Button type="submit" variant="primary" fullWidth>
        Save Changes
      </Button>
    </Form>
  );
}
```

## Components & Props

### `<Form>`
Root `<form>` element with `noValidate` enabled by default to facilitate custom UI validation.

### `<FormItem>`
Vertical layout container providing consistent `space-y-1.5` field spacing.

### `<FormLabel>`
Accessible label with optional `required` asterisk indicator.

### `<Input>`
- `leftIcon?: React.ReactNode` — Icon placed inside the start of the input.
- `rightIcon?: React.ReactNode` — Icon placed inside the end of the input.
- `error?: string | boolean` — Triggers danger border styling.
- `showPasswordToggle?: boolean` — Adds an interactive eye toggle for `type="password"`.

### `<Textarea>`
- Standard textarea with `#0A0A0A` background and smooth focus transitions.

### `<Select>`
- Custom styled select with chevron icon and `#0A0A0A` dropdown surface.

### `<Checkbox>`
- `label?: React.ReactNode` — Label text or custom element.
- `description?: string` — Helper description below the label.
- Tactile spring checkmark animation.

### `<RadioGroup>` & `<RadioGroupItem>`
- Custom styled radio button with layoutId spring indicator dot.

### `<Switch>`
- iOS/macOS inspired smooth toggle switch with Framer Motion spring physics.

## Accessibility

- Semantic HTML associations between labels and input fields.
- Animated error messages have `role="alert"`.
- Focus outlines use restrained `focus-ring` (Sky-400 at 50% opacity).
- Full keyboard support for checkboxes, radio options, and switches (Space/Enter).
