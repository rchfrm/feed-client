import React from 'react'
import PropTypes from 'prop-types'

import Head from 'next/head'

import { siteTitle, metaDescription } from '@/landing/TheHead'

import { renderMetaTags } from 'react-datocms'

const getMetaTags = ({ pageTitle, pageDescription }) => {
  return [
    { attributes: null, content: `${pageTitle} | Feed`, tag: 'title' },
    {
      attributes: { property: 'og:title', content: pageTitle },
      content: null,
      tag: 'meta',
    },
    {
      attributes: { name: 'twitter:title', content: pageTitle },
      content: null,
      tag: 'meta',
    },
    {
      attributes: {
        name: 'description',
        content: pageDescription,
      },
      content: null,
      tag: 'meta',
    },
    {
      attributes: {
        property: 'og:description',
        content: pageDescription,
      },
      content: null,
      tag: 'meta',
    },
    {
      attributes: {
        name: 'twitter:description',
        content: pageDescription,
      },
      content: null,
      tag: 'meta',
    },
  ]
}

const SeoTagsDato = ({
  metaTags,
  pageTitle,
  pageDescription,
}) => {
  const tags = metaTags || getMetaTags({ pageTitle, pageDescription })
  return (
    <Head>
      {renderMetaTags(tags)}
    </Head>
  )
}

SeoTagsDato.propTypes = {
  metaTags: PropTypes.array,
  pageTitle: PropTypes.string,
  pageDescription: PropTypes.string,
}

SeoTagsDato.defaultProps = {
  metaTags: null,
  pageTitle: siteTitle,
  pageDescription: metaDescription,
}

export default SeoTagsDato
