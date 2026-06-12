import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Rushikesh Davange | Data Analyst Portfolio',
  description: 'Premium data analyst portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.',
  metadataBase: new URL('https://rushikesh-davange-portfolio.vercel.app'),
  openGraph: {
    title: 'Rushikesh Davange | Data Analyst Portfolio',
    description: 'A refined AI and data science portfolio experience with dual theme support.',
    type: 'website'
  },
  icons: {
    icon: '/favicon.svg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
