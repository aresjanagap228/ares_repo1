import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nea Quiachon & Associates Law Firm',
  description: 'Preventing Disputes. Protecting Interests. A general practice law firm dedicated to delivering exceptional legal services with professionalism, responsiveness, and integrity.',
  keywords: 'NQa Law Firm, Nea Quiachon, law firm, Bacolod, Negros Occidental, legal services',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}