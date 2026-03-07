import { redirect } from 'next/navigation';
import { i18n } from '@/lib/i18n-config';

// Root page redirects to default locale
export default function RootPage() {
  redirect(`/${i18n.defaultLocale}`);
}
