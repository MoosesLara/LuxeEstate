import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import { getServerLocale } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'LuxeEstate - Premium Real Estate',
  description:
    'Find your sanctuary. Discover curated luxury properties for buy or rent.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialLocale = await getServerLocale();

  return (
    <html lang={initialLocale} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="bg-[#EEF6F6] text-[#19322F] font-display antialiased selection:bg-[#006655] selection:text-white min-h-screen w-full max-w-full overflow-x-hidden"
      >
        <I18nProvider initialLocale={initialLocale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
