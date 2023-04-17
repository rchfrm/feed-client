import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { renderMetaTags } from 'react-datocms'
import copy from '@/landing/copy/LandingPageCopy'

const getMetaTags = ({ pageTitle, pageDescription }) => {
  return [
    {
      attributes: null,
      content: `Feed | ${pageTitle}`,
      tag: 'title',
    },
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

const MetaTags = ({
  pageTitle,
  pageDescription,
}) => {
  const tags = getMetaTags({ pageTitle, pageDescription })
  return (
    <Head>
      {renderMetaTags(tags)}
    </Head>
  )
}

MetaTags.propTypes = {
  pageTitle: PropTypes.string,
  pageDescription: PropTypes.string,
}

MetaTags.defaultProps = {
  pageTitle: copy.header,
  pageDescription: copy.description,
}

export default MetaTags
