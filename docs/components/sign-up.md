# Sign Up

A comprehensive user registration card with live password strength telemetry, password confirmation matching, terms validation, and social onboarding.

## Features

- **Password Strength Telemetry:** Live 4-bar strength indicator calculating character length, uppercase, numbers, and symbols.
- **Password Match Verification:** Automatically compares password and confirm password inputs.
- **Terms & Privacy Agreement:** Checkbox with customizable terms of service links.
- **Social Onboarding:** One-click GitHub and Google sign-up buttons.
- **Password Visibility:** Independent visibility toggle for password fields.
- **Loading Spinner:** Integrated monochrome button spinner during account creation.
- **Responsive Layout:** Elegantly formatted for mobile screens and desktop viewports.

## Installation

```bash
npx shadcn@latest add chaitanay-kumar/kittu-ui/sign-up
```

## Basic Usage

```tsx
import React from 'react';
import { SignUp } from '@/components/ui/sign-up';

export function SignUpPage() {
  const handleSignUp = async (data: any) => {
    console.log('Account registration data:', data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#050505]">
      <SignUp
        onSubmit={handleSignUp}
        onSignInClick={() => console.log('Redirect to sign in')}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `'Create an account'` | Card header title text. |
| `description` | `string` | `'Join Kittu UI to access components and templates'` | Subtitle description text. |
| `logo` | `React.ReactNode` | `<SparklesIcon />` | Custom logo/icon displayed at top. |
| `error` | `string \| null` | `null` | Server-side registration error message. |
| `isLoading` | `boolean` | `false` | Submitting state with button loader. |
| `onSubmit` | `(data: SignUpFormData) => void` | `undefined` | Callback fired on valid submission. |
| `onSignInClick` | `() => void` | `undefined` | Callback for switching to login view. |
| `showSocialSignUp` | `boolean` | `true` | Toggles GitHub and Google sign-up buttons. |
| `requireConfirmPassword` | `boolean` | `true` | Renders confirm password field and checks match. |
| `termsText` | `React.ReactNode` | `Terms links` | Custom agreement label text or JSX. |
| `signInText` | `string` | `'Already have an account? Sign in'` | Text for sign in redirect. |

## Accessibility

- Semantic `<form>` with `aria-required` and autocomplete hints (`name`, `email`, `new-password`).
- Live password strength metric has clear contrast and text label.
- Error messages display with `role="alert"` and smooth spring transitions.
- Sky-400 focus ring on all focusable inputs.
