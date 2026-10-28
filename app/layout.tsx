import type { Metadata } from 'next'
import { Suspense } from 'react'
import Script from 'next/script'
import { Inter, Space_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import RegistrationPopup from '@/components/RegistrationPopup'
import UTMTracker from '@/components/UTMTracker'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

const siteUrl = 'https://www.xpertsedgetech.com'
const siteName = 'XpertsEdge Technologies'
const gtmId = 'GTM-WK8LDTGS'
const siteDescription =
  'XpertsEdge Technologies empowers businesses and professionals through quality engineering, software testing excellence, automation solutions, and practical technology training in Chennai.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'XpertsEdge Technologies — Building Success Beyond Boundaries',
    template: '%s | XpertsEdge Technologies',
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    'software testing training',
    'test automation',
    'IT training Chennai',
    'selenium training',
    'playwright training',
    'API testing',
    'DevOps training',
    'AWS training Chennai',
    'MERN stack course',
    'MEAN stack course',
    'Java full stack course',
    'placement training Chennai',
    'technology consulting',
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: 'education',
  alternates: {
    canonical: '/',
  },
  verification: {
    google: [
      'i2zJ8WZaVUlFtsqeogoIpTazOypIws40I6E4MZQOZk8',
      'sK6Xo9vMkcUiQAITpDQw1cs3JXvKm4Zw4z1E117Q6hg',
      '-gn-ZoTkpj_gqm5bfLX9ecl__2Ad2YC-kJDtTDnOVKc',
    ],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'XpertsEdge Technologies — Building Success Beyond Boundaries',
    description: siteDescription,
    type: 'website',
    url: siteUrl,
    siteName,
    locale: 'en_IN',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: siteName }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@xpertsedgetech',
    creator: '@xpertsedgetech',
    title: 'XpertsEdge Technologies — Building Success Beyond Boundaries',
    description: siteDescription,
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${siteUrl}/#organization`,
  name: siteName,
  legalName: 'XpertsEdge Technologies Pvt. Ltd.',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: siteDescription,
  email: 'info@xpertsedgetech.com',
  telephone: '+91-8870783300',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No. 2110A, 13th Main Road, Anna Nagar',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    postalCode: '600040',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.instagram.com/xpertsedgetech/',
    'https://x.com/xpertsedgetech',
    'https://www.facebook.com/xpertsedgetechnologies',
    'https://www.linkedin.com/company/xpertsedge-technologies/',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: siteName,
  publisher: { '@id': `${siteUrl}/#organization` },
  inLanguage: 'en-IN',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable} bg-background`}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* Remember inbound UTM values before navigating to other pages. */}
        <Suspense fallback={null}>
          <UTMTracker />
        </Suspense>
        <Navbar />
        {children}
        <Footer />
        <RegistrationPopup />
        <WhatsAppButton />
      </body>
    </html>
  )
}
