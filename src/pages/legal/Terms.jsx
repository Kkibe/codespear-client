import { LegalPage } from './LegalPage';

const SECTIONS = [
  {
    heading: '1. Acceptance of terms',
    paragraphs: [
      'By accessing or using Codespear ("we", "us", or "our"), you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our website or services.',
      'These terms apply to all visitors, users, and others who access or use the service.',
    ],
  },
  {
    heading: '2. Use of the service',
    paragraphs: [
      'You may use Codespear only for lawful purposes. You agree not to use the service to:',
    ],
    list: [
      'Violate any applicable local, national, or international law.',
      'Infringe upon the intellectual property rights of others.',
      'Upload or transmit viruses, malware, or any other malicious code.',
      'Attempt to gain unauthorized access to our systems, user accounts, or data.',
      'Harass, abuse, or harm other users.',
    ],
  },
  {
    heading: '3. Accounts',
    paragraphs: [
      'To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.',
      'You must provide accurate and complete information when registering and keep it up to date. We reserve the right to suspend or terminate accounts that violate these terms.',
    ],
  },
  {
    heading: '4. Paid content & subscriptions',
    paragraphs: [
      'Some courses and features require payment. Individual course purchases grant lifetime access to that course. Subscriptions grant access for the duration of your billing period.',
      'All payments are processed securely by Flutterwave. Access to paid content is granted only after your payment has been verified server-side.',
      'Subscription fees are billed in advance on a recurring basis until you cancel. You may cancel at any time, and access continues until the end of the current billing period.',
      'Refunds are handled on a case-by-case basis. If you are unsatisfied with a purchase, contact us within 7 days.',
    ],
  },
  {
    heading: '5. Intellectual property',
    paragraphs: [
      'All content on Codespear — including courses, lessons, articles, graphics, and logos — is the property of Codespear or its licensors and is protected by copyright and other intellectual property laws.',
      'You may not copy, reproduce, redistribute, or resell our content without express written permission. Enrolled users may access content for personal, non-commercial learning.',
    ],
  },
  {
    heading: '6. User-generated content',
    paragraphs: [
      'You retain ownership of content you post (such as comments). By posting, you grant us a non-exclusive license to display and use that content within the service.',
      'You are solely responsible for your posts and must not submit content that is unlawful, defamatory, or infringes on others rights.',
    ],
  },
  {
    heading: '7. Disclaimers',
    paragraphs: [
      'The service is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted, error-free, or secure.',
      'Educational content is provided for informational purposes. We are not responsible for any decisions or outcomes resulting from applying the information learned.',
    ],
  },
  {
    heading: '8. Limitation of liability',
    paragraphs: [
      'To the maximum extent permitted by law, Codespear shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.',
    ],
  },
  {
    heading: '9. Changes to these terms',
    paragraphs: [
      'We may update these terms from time to time. We will notify users of significant changes. Continued use of the service after changes constitutes acceptance of the new terms.',
    ],
  },
  {
    heading: '10. Contact',
    paragraphs: [
      'Questions about these terms? Contact us at hello@codespear.com.',
    ],
  },
];

export const Terms = () => (
  <LegalPage kind="terms" title="Terms & Conditions" updated="July 2026" sections={SECTIONS} />
);
