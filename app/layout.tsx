import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'پارسا رحمانی | مهندس نرم‌افزار و هوش مصنوعی',
  description:
    'پورتفولیوی پارسا رحمانی؛ مهندس نرم‌افزار با تمرکز بر توسعه فول‌استک، هوش مصنوعی و یادگیری عمیق.',
  keywords: ['پارسا رحمانی', 'مهندس نرم افزار', 'هوش مصنوعی', 'توسعه فول استک', 'Next.js', 'Python'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <body>{children}</body>
    </html>
  );
}
