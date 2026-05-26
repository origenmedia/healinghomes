import type { Metadata } from 'next';
import { inter, fraunces, jetbrainsMono } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Healing Homes Mexico',
  description: 'The home is the medicine. The craft is how we make it.',
};

const themeScript = `(function(){try{var t=localStorage.getItem('healinghomes:theme')||'light';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
