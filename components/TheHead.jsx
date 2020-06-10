import React from 'react'
import { Head } from 'next/document'

import Favicons from '@/Favicons'

const TheHead = ({ siteUrl }) => {
  const ogImageUrl = `${siteUrl}/pwa/apple-touch-icon-1024x1024.png`
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* PWA config and Favicons. Custom meta are children here */}
      <Favicons>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      </Favicons>
      {/* Twitter and OG info */}
      <meta key="meta-description" name="description" content="Audience growth for artists, built by archForm" />
      <meta key="meta-og:title" property="og:title" content="Feed" />
      <meta key="meta-og:url" property="og:url" content={siteUrl} />
      <meta key="meta-og:image" property="og:image" content={ogImageUrl} />
      <meta key="meta-og:site_name" property="og:site_name" content="Feed" />
      <meta key="meta-og:description" property="og:description" content="Feed" />
      <meta key="meta-twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="meta-twitter:site" name="twitter:site" content="@feed_hq" />
      <meta key="meta-twitter:creator" name="twitter:creator" content="@feed_hq" />
      <meta key="meta-twitter:domain" name="twitter:domain" content={siteUrl} />
      <meta key="meta-twitter:title" name="twitter:title" content="Feed" />
      <meta key="meta-twitter:description" name="twitter:description" content="Feed" />
      <meta key="meta-twitter:image" name="twitter:image" content={ogImageUrl} />
      <meta key="meta-twitter:image:width" name="twitter:image:width" content="1024px" />
      <meta key="meta-twitter:image:height" name="twitter:image:height" content="1024px" />
      {/* Preconnect to external assets */}
      <link rel="preconnect" href="https://js.stripe.com/v3" />
    </Head>
  )
}

export default TheHead
