import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050C16',
}

export const metadata: Metadata = {
  title: 'Frace Solutions — Automatización WhatsApp con IA para tu negocio',
  description:
    'Responde, agenda y cierra ventas en WhatsApp con IA. CRM multiagente Boosfy incluido. Actívate en menos de 24h. Más de 500 PyMEs ya automatizadas.',
  keywords: [
    'automatización WhatsApp',
    'CRM WhatsApp México',
    'Boosfy',
    'WhatsApp Business API',
    'chatbot IA PyMES',
    'Frace Solutions',
    'asistente IA WhatsApp',
  ],
  authors: [{ name: 'Frace Solutions' }],
  metadataBase: new URL('https://fracesolutions.com'),
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://fracesolutions.com',
    title: 'Frace Solutions — Automatización WhatsApp con IA',
    description: '400% más velocidad de respuesta. 55% más ventas. Actívate hoy.',
    siteName: 'Frace Solutions',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Frace Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frace Solutions — Automatización WhatsApp con IA',
    description: '400% más velocidad de respuesta. 55% más ventas.',
    images: ['/og.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2437590289913986');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2437590289913986&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}
