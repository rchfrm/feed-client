import React from 'react'
import Head from 'next/head'

import Favicons from '@/landing/Favicons'

const siteUrl = 'https://tryfeed.co'
export const titleDescription = 'Make Facebook & Instagram work harder for your business'
export const metaDescription = 'Feed is the automated advertising tool that keeps up with you. Using your best performing Facebook & Instagram posts to create targeted ads that engage new people, reach more of your existing audience and drive sales.'
export const siteTitle = `Feed | ${titleDescription}`

const TheHead = () => {
  const ogImageUrl = `${siteUrl}/images/feed_og_card.jpg`
  const twitterHandle = '@feed_hq'
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* TITLE */}
      <title key="meta-title">{siteTitle}</title>
      {/* Twitter and OG info */}
      <meta key="meta-description" name="description" content={metaDescription} />
      <meta key="meta-og:title" property="og:title" content={siteTitle} />
      <meta key="meta-og:url" property="og:url" content={siteUrl} />
      <meta key="meta-og:image" property="og:image" content={ogImageUrl} />
      <meta key="meta-og:site_name" property="og:site_name" content={siteTitle} />
      <meta key="meta-og:description" property="og:description" content={metaDescription} />
      <meta key="meta-twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="meta-twitter:site" name="twitter:site" content={twitterHandle} />
      <meta key="meta-twitter:creator" name="twitter:creator" content={twitterHandle} />
      <meta key="meta-twitter:domain" name="twitter:domain" content={siteUrl} />
      <meta key="meta-twitter:title" name="twitter:title" content={siteTitle} />
      <meta key="meta-twitter:description" name="twitter:description" content={metaDescription} />
      <meta key="meta-twitter:image" name="twitter:image" content={ogImageUrl} />
      <meta key="meta-twitter:image:width" name="twitter:image:width" content="1200px" />
      <meta key="meta-twitter:image:height" name="twitter:image:height" content="630px" />
      {/* Block search engines on staging */}
      {process.env.build_env === 'staging' && (
        <meta name="robots" content="noindex" />
      )}      {/* PWA config and Favicons. Custom meta are children here */}
      <Favicons>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      </Favicons>
    </Head>
  )
}

export default TheHead
