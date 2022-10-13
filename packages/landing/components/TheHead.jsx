import React from 'react'
import Head from 'next/head'
import Favicons from '@/elements/Favicons'
import useGlobalInfoStore from '@/landing/store/globalInfoStore'

const getGlobalInfo = state => state
const siteUrl = 'https://tryfeed.co'

const TheHead = () => {
  const {
    globalSeo: {
      siteName,
      twitterAccount,
      fallbackSeo: {
        description,
        image: {
          url,
        },
      },
    },
  } = useGlobalInfoStore(getGlobalInfo)
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* TITLE */}
      <title key="meta-title">{siteName}</title>
      {/* Twitter and OG info */}
      <meta key="meta-description" name="description" content={description} />
      <meta key="meta-og:title" property="og:title" content={siteName} />
      <meta key="meta-og:url" property="og:url" content={siteUrl} />
      <meta key="meta-og:image" property="og:image" content={url} />
      <meta key="meta-og:site_name" property="og:site_name" content={siteName} />
      <meta key="meta-og:description" property="og:description" content={description} />
      <meta key="meta-twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="meta-twitter:site" name="twitter:site" content={twitterAccount} />
      <meta key="meta-twitter:creator" name="twitter:creator" content={twitterAccount} />
      <meta key="meta-twitter:domain" name="twitter:domain" content={siteUrl} />
      <meta key="meta-twitter:title" name="twitter:title" content={siteName} />
      <meta key="meta-twitter:description" name="twitter:description" content={description} />
      <meta key="meta-twitter:image" name="twitter:image" content={url} />
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
