'use client';
import './globals.css';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import ScrollProgress from '@/components/ScrollProgress';
// import CustomCursor from '@/components/CustomCursor';
import ParticleBackground from '../components/PracticleBackground';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <title>Muzammil Makandar | Full Stack Developer</title>
        <Analytics />
      </head>
      <body className={`${poppins.className}`} suppressHydrationWarning>
        <ThemeProvider attribute="class" enableSystem={true} defaultTheme="light">
          <div className="bg-gray-100/50 dark:bg-grey-900 text-black dark:text-white overflow-x-hidden">
            {/* <CustomCursor /> */}
            <ParticleBackground />
            <ScrollProgress />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
