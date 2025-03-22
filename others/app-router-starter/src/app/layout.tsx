import 'styles/global.scss'
import { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  description: 'App Router 入門サンプル',
  openGraph: {
    description: 'App Router 入門サンプル',
    images: [],
    title: 'App Router 入門サンプル',
  },
  title: {
    default: 'App Router 入門サンプル',
    template: '%s | App Router 入門サンプル',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  width: 'device-width',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
