import { LegalPage } from './LegalPage';

const SECTIONS = [
  {
    heading: '1. Information we collect',
    paragraphs: [
      'We collect information you provide directly, such as your name, email address, and profile details when you create an account or contact us.',
      'We also collect usage data automatically, including your IP address, browser type, pages visited, and interactions with the service, through cookies and similar technologies.',
    ],
  },
  {
    heading: '2. How we use your information',
    paragraphs: [
      'We use your information to:',
    ],
    list: [
      'Provide, maintain, and improve our services.',
      'Process payments and manage subscriptions.',
      'Track your course progress and personalize your experience.',
      'Send you service updates, notifications, and (with consent) newsletters.',
      'Detect, prevent, and address fraud, abuse, and security issues.',
    ],
  },
  {
    heading: '3. Payment processing',
    paragraphs: [
      'Payments are processed by Flutterwave, our payment provider. We do not store your full card details — those are handled securely by Flutterwave. We retain records of transactions (amount, status, reference) for accounting and support purposes.',
    ],
  },
  {
    heading: '4. Cookies',
    paragraphs: [
      'We use cookies to authenticate sessions, remember your preferences (such as theme), and understand how the service is used. See our Cookie Policy for details.',
    ],
  },
  {
    heading: '5. Data sharing',
    paragraphs: [
      'We do not sell your personal information. We share data only with:',
    ],
    list: [
      'Service providers who help us operate (e.g. Flutterwave for payments, Supabase for hosting).',
      'Authorities when required by law or to protect our rights and safety.',
    ],
  },
  {
    heading: '6. Data security',
    paragraphs: [
      'We use industry-standard measures to protect your data, including encryption in transit, row-level security on our database, and server-side payment verification. No method of transmission over the internet is fully secure, but we work hard to protect your information.',
    ],
  },
  {
    heading: '7. Your rights',
    paragraphs: [
      'Depending on your location, you may have the right to access, correct, export, or delete your personal data. You can update your profile in your dashboard, or contact us to exercise these rights.',
    ],
  },
  {
    heading: '8. Data retention',
    paragraphs: [
      'We retain your data for as long as your account is active, or as needed to provide services and comply with legal obligations. You may request deletion of your account at any time.',
    ],
  },
  {
    heading: '9. Children',
    paragraphs: [
      'Codespear is not directed to children under 13. We do not knowingly collect personal information from children. If you believe we have done so, contact us and we will delete it.',
    ],
  },
  {
    heading: '10. Changes to this policy',
    paragraphs: [
      'We may update this policy from time to time. We will notify you of significant changes. Check this page for the latest version.',
    ],
  },
  {
    heading: '11. Contact',
    paragraphs: [
      'Privacy questions? Contact us at hello@codespear.com.',
    ],
  },
];

export const Privacy = () => (
  <LegalPage kind="privacy" title="Privacy Policy" updated="July 2026" sections={SECTIONS} />
);
