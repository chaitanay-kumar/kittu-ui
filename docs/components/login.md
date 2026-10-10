# Login

A production-ready authentication card built with the Kit UI form system, featuring password show/hide, remember me, validation states, and social logins.

## Features

- **Form System Architecture:** Built entirely on top of the modular Kit UI `Form` and `Button` systems.
- **Password Visibility:** One-click eye icon toggles password visibility.
- **Client-side Validation:** Validates required fields and email regex format before calling `onSubmit`.
- **Server Alert Banner:** Smooth spring-animated top alert banner for server authentication errors.
- **Social SSO Integrations:** Ready-made GitHub and Google authentication buttons.
- **Remember Me & Forgot Password:** Built-in hooks and checkboxes for device persistence and password recovery.
- **Atmospheric Glow:** Subtle ambient background glow and rounded-2xl dark slate card surface.

## Installation

```bash
npx shadcn@latest add chaitanay-kumar/kit-ui/login
```

## Basic Usage

```tsx
import React from 'react';
import { Login } from '@/components/ui/login';

export function LoginPage() {
  const handleLogin = async (data: { email: string; password: string; rememberMe: boolean }) => {
    console.log('Logging in:', data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#050505]">
      <Login
        onSubmit={handleLogin}
        onForgotPassword={() => console.log('Forgot password clicked')}
        onSignUpClick={() => console.log('Sign up clicked')}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `'Welcome back'` | Card heading title text. |
| `description` | `string` | `'Sign in to access your Kit UI workspace'` | Subtitle description below the title. |
| `logo` | `React.ReactNode` | `<SparklesIcon />` | Custom logo or brand badge element. |
| `error` | `string \| null` | `null` | Server-side authentication error banner. |
| `isLoading` | `boolean` | `false` | Shows loading spinner on submit button. |
| `onSubmit` | `(data: LoginFormData) => void` | `undefined` | Callback fired on form submission. |
| `onForgotPassword` | `() => void` | `undefined` | Callback when "Forgot password?" is clicked. |
| `onSignUpClick` | `() => void` | `undefined` | Callback for the secondary sign up action link. |
| `showSocialLogins` | `boolean` | `true` | Toggles social login buttons (GitHub & Google). |
| `onSocialLogin` | `(provider: 'github' \| 'google' \| 'apple') => void` | `undefined` | Callback when social SSO button is clicked. |
| `signUpText` | `string` | `"Don't have an account? Sign up"` | Custom label for sign up redirect link. |

## Accessibility

- Semantic form inputs with standard autocomplete attributes (`email`, `current-password`).
- Focus states trigger the Sky-400 outline ring.
- Error alerts have `role="alert"` for screen reader announcements.
- Full keyboard support for Tab order and Enter form submission.
