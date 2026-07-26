import { LegalPage } from './LegalPage';

const SECTIONS = [
  {
    heading: '1. What are cookies',
    paragraphs: [
      'Cookies are small text files stored on your device when you visit a website. They allow the site to remember your actions and preferences over time, making your experience more efficient and personalized.',
    ],
  },
  {
    heading: '2. How we use cookies',
    paragraphs: [
      'Codespear uses cookies for the following purposes:',
    ],
    list: [
      'Authentication — to keep you signed in across page loads.',
      'Preferences — to remember your theme (light/dark) and other settings.',
      'Analytics — to understand how visitors use the service so we can improve it.',
      'Security — to protect against fraud and abuse.',
    ],
  },
  {
    heading: '3. Types of cookies we use',
    paragraphs: [
      'Essential cookies are required for the service to function (e.g. session authentication). These cannot be disabled.',
      'Preference cookies remember your settings, such as your chosen theme.',
      'Analytics cookies help us understand usage patterns. These are anonymous and aggregated.',
    ],
  },
  {
    heading: '4. Managing cookies',
    paragraphs: [
      'You can control and delete cookies through your browser settings. Note that disabling essential cookies may prevent the service from working correctly (e.g. you may not stay signed in).',
      'Most browsers allow you to refuse cookies or alert you when cookies are being sent. Refer to your browser help documentation for instructions.',
    ],
  },
  {
    heading: '5. Third-party cookies',
    paragraphs: [
      'Some third-party services we use (such as Flutterwave for payments) may set their own cookies. These are governed by the respective providers privacy policies.',
    ],
  },
  {
    heading: '6. Updates',
    paragraphs: [
      'We may update this Cookie Policy as our use of cookies changes. We will notify users of significant updates.',
    ],
  },
  {
    heading: '7. Contact',
    paragraphs: [
      'Questions about our use of cookies? Contact us at hello@codespear.com.',
    ],
  },
];

export const Cookies = () => (
  <LegalPage kind="cookies" title="Cookie Policy" updated="July 2026" sections={SECTIONS} />
);
