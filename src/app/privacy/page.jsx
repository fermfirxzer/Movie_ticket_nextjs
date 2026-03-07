// server component handles metadata and renders client UI

export const metadata = {
  title: 'Privacy Policy',
  description: 'Read our privacy policy and PDPA compliance information',
};

import PrivacyContent from './PrivacyContent';

export default function PrivacyPage() {
  return <PrivacyContent />;
}
