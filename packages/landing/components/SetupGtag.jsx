import React from 'react'
import PropTypes from 'prop-types'

import Script from 'react-load-script'

import { gaCrossDomainsString, enableGtag } from '@/landing/helpers/trackingHelpers'

const SetupGtag = ({ gaId, forceOn }) => {
  // Stop here if in dev
  if (
    (process.env.build_env === 'development' && !forceOn)
    || (process.env.build_env === 'staging' && !forceOn)
  ) return null
  // Render
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        url={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        onLoad={enableGtag}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              'linker': {
                  'domains': ${gaCrossDomainsString}
              }
            });
          `,
        }}
      />
    </>
  )
}

SetupGtag.propTypes = {
  gaId: PropTypes.string.isRequired,
  forceOn: PropTypes.bool,
}

SetupGtag.defaultProps = {
  forceOn: false,
}

export default SetupGtag
