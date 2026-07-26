import { LegalPage } from './LegalPage';

const SECTIONS = [
  {
    heading: '1. Our pledge',
    paragraphs: [
      'Codespear is a community of learners and educators. We are committed to providing a welcoming, respectful, and harassment-free environment for everyone, regardless of background, identity, or experience level.',
    ],
  },
  {
    heading: '2. Expected behavior',
    paragraphs: [
      'We expect all community members to:',
    ],
    list: [
      'Be kind, respectful, and constructive in all interactions.',
      'Give and accept feedback gracefully.',
      'Respect differences in opinion and approach.',
      'Credit others for their work and ideas.',
      'Help newcomers feel welcome and supported.',
    ],
  },
  {
    heading: '3. Unacceptable behavior',
    paragraphs: [
      'The following behaviors are unacceptable in our community:',
    ],
    list: [
      'Harassment, discrimination, or hate speech of any kind.',
      'Personal attacks, trolling, or deliberate intimidation.',
      'Publishing others private information without consent.',
      'Spam, self-promotion, or irrelevant commercial content.',
      'Plagiarism or passing off others work as your own.',
      'Any behavior that would make someone feel unsafe.',
    ],
  },
  {
    heading: '4. Enforcement',
    paragraphs: [
      'Moderators may take action against violations, including warning, temporarily suspending, or permanently banning offending accounts. Content that violates this code may be removed without notice.',
      'We take all reports seriously and will review them promptly and fairly.',
    ],
  },
  {
    heading: '5. Reporting',
    paragraphs: [
      'If you witness or experience behavior that violates this Code of Conduct, report it to us at hello@codespear.com. Include as much detail as possible (what happened, when, and who was involved).',
      'Reports are confidential. We will not tolerate retaliation against anyone who reports in good faith.',
    ],
  },
  {
    heading: '6. Scope',
    paragraphs: [
      'This Code of Conduct applies to all Codespear spaces — comments, forums, support channels, and any other community features — as well as behavior directed at our team members outside these spaces.',
    ],
  },
  {
    heading: '7. Contact',
    paragraphs: [
      'Questions about this Code of Conduct? Contact us at hello@codespear.com.',
    ],
  },
];

export const Conduct = () => (
  <LegalPage kind="conduct" title="Code of Conduct" updated="July 2026" sections={SECTIONS} />
);
