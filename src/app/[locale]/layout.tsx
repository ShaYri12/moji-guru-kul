import type { Metadata } from 'next'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './globals.css'
import ErrorAlert from '@/components/common/ErrorAlert'
import Navbar from '@/components/Navbar'
import { betm, notoSansTelugu } from '../font'
import Footer from '@/components/common/Footer'
import { GoogleTagManager } from '@next/third-parties/google'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Script from 'next/script'
import { LanguageEnum } from '@/utils/enum'

export const metadata: Metadata = {
  title: 'MojiGurukul | Online Game Base Learning, Activities And Assessments ',
  description:
    'Looking for convenient and effective way to learn? MojiGurukul is the ultimate online platform for tutoring and game-based learning. Enhance your skills and knowledge in a fun and engaging way!',
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const host = process.env.NEXT_PUBLIC_ENV

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>{!host && <GoogleTagManager gtmId="GTM-TSRDB6C8" />}</head>
      <GoogleOAuthProvider clientId="255392598449-7grs868fg7dj6snodvgemhe806uo89pp.apps.googleusercontent.com">
        <body className={locale === LanguageEnum.Te ? notoSansTelugu.className : betm.className}>
          {/* <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-TSRDB6C8"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript> */}
          {!host && (
            <>
              <Script id="google-analytic" strategy="afterInteractive" src="https://www.googletagmanager.com/ns.html?id=GTM-TSRDB6C8" />
              <Script
                id="hotjar"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
              (function (h, o, t, j, a, r) {
                h.hj =
                  h.hj ||
                  function () {
                    ;(h.hj.q = h.hj.q || []).push(arguments)
                  }
                h._hjSettings = { hjid: 5079581, hjsv: 6 }
                a = o.getElementsByTagName('head')[0]
                r = o.createElement('script')
                r.async = 1
                r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
                a.appendChild(r)
              })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv='),`,
                }}
              />

              <Script
                id="schema"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                {
                  "@context": "https://schema.org",
                  "@type": "EducationalOrganization",
                  "name": "Moji Gurukul",
                  "url": "https://mojigurukul.com/",
                  "logo": "https://mojigurukul.com/logo-white.svg",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "(62) 1829017",
                    "contactType": "customer service",
                    "areaServed": "IN",
                    "availableLanguage": ["en","Hindi"]
                  }
                }`,
                }}
              />

              <Script
                id="breadcrumb"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                {
                  "@context": "https://schema.org/", 
                  "@type": "BreadcrumbList", 
                  "itemListElement": [{
                    "@type": "ListItem", 
                    "position": 1, 
                    "name": "Tutoring",
                    "item": "https://mojigurukul.com/"  
                  },{
                    "@type": "ListItem", 
                    "position": 2, 
                    "name": "Game Learning",
                    "item": "https://mojigurukul.com/"  
                  },{
                    "@type": "ListItem", 
                    "position": 3, 
                    "name": "Tutoring Platform Online",
                    "item": "https://mojigurukul.com/"  
                  },{
                    "@type": "ListItem", 
                    "position": 4, 
                    "name": "Tutoring Platform",
                    "item": "https://mojigurukul.com/"  
                  },{
                    "@type": "ListItem", 
                    "position": 5, 
                    "name": "Game Learning Platform",
                    "item": "https://mojigurukul.com/"  
                  },{
                    "@type": "ListItem", 
                    "position": 6, 
                    "name": "Online Learning",
                    "item": "https://mojigurukul.com/"  
                  },{
                    "@type": "ListItem", 
                    "position": 7, 
                    "name": "LMS platform",
                    "item": "https://mojigurukul.com/"  
                  }]
                }`,
                }}
              />
            </>
          )}
          <NextIntlClientProvider messages={messages}>
            <ErrorAlert />
            <Navbar />
            <div className="min-h-screen">{children}</div>
            <Footer />
          </NextIntlClientProvider>
        </body>
      </GoogleOAuthProvider>
    </html>
  )
}
