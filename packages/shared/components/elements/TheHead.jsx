import React from 'react'

import Favicons from '@/elements/Favicons'

const TheHead = ({ siteUrl, metaDescription, noIndex, includeStripe }) => {
  const ogImageUrl = `${siteUrl}/images/feed_og_card.jpg`
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      {/* PWA config and Favicons. Custom meta are children here */}
      <Favicons>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      </Favicons>
      {/* Twitter and OG info */}
      <meta key="meta-description" name="description" content={metaDescription} />
      <meta key="meta-og:url" property="og:url" content={siteUrl} />
      <meta key="meta-og:image" property="og:image" content={ogImageUrl} />
      <meta key="meta-og:site_name" property="og:site_name" content="Feed" />
      <meta key="meta-og:description" property="og:description" content={metaDescription} />
      <meta key="meta-twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="meta-twitter:site" name="twitter:site" content="@feed_hq" />
      <meta key="meta-twitter:creator" name="twitter:creator" content="@feed_hq" />
      <meta key="meta-twitter:domain" name="twitter:domain" content={siteUrl} />
      <meta key="meta-twitter:title" name="twitter:title" content="Feed" />
      <meta key="meta-twitter:description" name="twitter:description" content={metaDescription} />
      <meta key="meta-twitter:image" name="twitter:image" content={ogImageUrl} />
      <meta key="meta-twitter:image:width" name="twitter:image:width" content="1200px" />
      <meta key="meta-twitter:image:height" name="twitter:image:height" content="630px" />
      {/* Preconnect to external assets */}
      {includeStripe && <link rel="preconnect" href="https://js.stripe.com/v3" />}
      {noIndex && <meta name="robots" content="noindex" />}
    </>
  )
}

export default TheHead
