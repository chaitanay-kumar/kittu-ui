import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Login',
  description: 'A production-ready authentication card built with the Kittu UI form system, featuring password show/hide, remember me, validation states, and social logins.',
  category: 'Auth',
  tagline: 'Refined authentication card with validation & social SSO',
  badges: ['Authentication', 'Forms', 'Responsive', 'Accessible'],
  featured: true,
  createdAt: '2026-08-19',
  features: [
    'Built with Kittu UI Form & Button architecture',
    'Interactive password visibility toggle with Lucide icons',
    'Form validation for required fields & email regex format',
    'Spring-animated error banners and inline field alerts',
    'Configurable social SSO buttons (GitHub & Google)',
    'Remember me checkbox and "Forgot password?" callback hooks',
    'Responsive mobile/desktop dimensions with atmospheric glow header',
  ],
  props: [
    { name: 'title', type: 'string', default: "'Welcome back'", description: 'Primary card title text' },
    { name: 'description', type: 'string', default: "'Sign in to access your Kittu UI workspace'", description: 'Subtitle description below the title' },
    { name: 'logo', type: 'React.ReactNode', default: '<SparklesIcon />', description: 'Brand badge or logo displayed at the top' },
    { name: 'error', type: 'string | null', default: 'null', description: 'Server-side or authentication error banner message' },
    { name: 'isLoading', type: 'boolean', default: 'false', description: 'Submitting state displaying loader on submit button' },
    { name: 'onSubmit', type: '(data: LoginFormData) => void', default: 'undefined', description: 'Form submission callback with email, password, rememberMe' },
    { name: 'onForgotPassword', type: '() => void', default: 'undefined', description: 'Callback when forgot password link is clicked' },
    { name: 'onSignUpClick', type: '() => void', default: 'undefined', description: 'Callback for secondary sign up switch action' },
    { name: 'showSocialLogins', type: 'boolean', default: 'true', description: 'Toggles GitHub and Google SSO buttons' },
    { name: 'onSocialLogin', type: "(provider: 'github' | 'google' | 'apple') => void", default: 'undefined', description: 'Callback when social login button is pressed' },
  ],
  accessibility: [
    'Accessible input labels and autocomplete attributes (email, current-password)',
    'ARIA alert role on dynamic validation and server error banners',
    'Proper form submission handling with Enter key activation',
    'Sky-400 focus ring on all interactive elements',
  ],
  usageCode: `import { Login } from "@/components/ui/login";

export function Demo() {
  const handleLogin = async (data: { email: string; password: string; rememberMe: boolean }) => {
    console.log("Authenticating:", data);
  };

  return (
    <div className="py-8 flex justify-center">
      <Login
        onSubmit={handleLogin}
        onForgotPassword={() => alert("Redirect to forgot password")}
        onSignUpClick={() => alert("Redirect to sign up")}
      />
    </div>
  );
}`,
};

export default meta;
