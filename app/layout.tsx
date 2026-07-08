import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { LenisProvider } from '@/components/lenis-provider'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Sanaullah Turab',
  description:
    'Portfolio of Sanaullah Turab, a fullstack engineer turned AI/ML engineer. Building production systems, machine learning pipelines, and intelligent products.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1a1917',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`bg-background ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased grain">
        <LenisProvider>{children}</LenisProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
