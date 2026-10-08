import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Sign Up',
  description: 'A comprehensive registration card with live password strength metrics, password confirmation matching, terms validation, and social onboarding.',
  category: 'Auth',
  tagline: 'Multi-step capable user registration with strength telemetry',
  badges: ['Registration', 'Forms', 'Password Strength', 'Accessible'],
  featured: true,
  createdAt: '2026-08-19',
  features: [
    'Integrated live 4-tier password strength indicator bar',
    'Password confirmation matching validation',
    'Interactive eye icons for show/hide password visibility',
    'Terms of service and privacy agreement checkbox validation',
    'Customizable social onboarding SSO buttons (GitHub & Google)',
    'Submitting state with monochrome button spinner',
    'Responsive layout with atmospheric glow and dark slate tokens',
  ],
  props: [
    { name: 'title', type: 'string', default: "'Create an account'", description: 'Primary card title text' },
    { name: 'description', type: 'string', default: "'Join Kit UI to access components and templates'", description: 'Subtitle description below the title' },
    { name: 'logo', type: 'React.ReactNode', default: '<SparklesIcon />', description: 'Brand badge or logo displayed at the top' },
    { name: 'error', type: 'string | null', default: 'null', description: 'Server-side registration error banner message' },
    { name: 'isLoading', type: 'boolean', default: 'false', description: 'Submitting state displaying loader on submit button' },
    { name: 'onSubmit', type: '(data: SignUpFormData) => void', default: 'undefined', description: 'Form submission callback with name, email, password, confirmPassword, agreeToTerms' },
    { name: 'onSignInClick', type: '() => void', default: 'undefined', description: 'Callback for switching to login view' },
    { name: 'showSocialSignUp', type: 'boolean', default: 'true', description: 'Toggles GitHub and Google SSO buttons' },
    { name: 'requireConfirmPassword', type: 'boolean', default: 'true', description: 'Includes confirmation password field and checks match' },
    { name: 'termsText', type: 'React.ReactNode', default: 'Default Terms & Privacy links', description: 'Custom agreement label text or JSX' },
  ],
  accessibility: [
    'Accessible input labels with required indicators and autocomplete values (name, email, new-password)',
    'Role="alert" for validation errors with smooth Framer Motion spring entrances',
    'Keyboard navigable form submission and checkbox selection',
    'Sky-400 focus ring on all focusable controls',
  ],
  usageCode: `import { SignUp } from "@/components/ui/sign-up";

export function Demo() {
  const handleSignUp = async (data: any) => {
    console.log("Registering account:", data);
  };

  return (
    <div className="py-8 flex justify-center">
      <SignUp
        onSubmit={handleSignUp}
        onSignInClick={() => alert("Redirect to sign in")}
      />
    </div>
  );
}`,
};

export default meta;
