import type { Metadata } from 'next';
import { Rubik_Puddles } from 'next/font/google';
import './globals.css';

const rubikBubbles = Rubik_Puddles({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-rubik-bubbles',
});

export const metadata: Metadata = {
  title: 'Scammy',
  description: 'Product Scam detection util',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubikBubbles.variable} antialiased`}>{children}</body>
    </html>
  );
}
