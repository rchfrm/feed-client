// * ADMIN VERSION

import React from 'react'
import { PageTransition } from 'next-page-transitions'
import PropTypes from 'prop-types'

import Head from 'next/head'
// GLOBAL STYLES
import '../../shared/css/core.css'
import '../../shared/css/app.css'
import '../../shared/css/utilities.css'
// IMPORT COMPONENTS
import AdminContents from '@/admin/AdminContents'
// IMPORT CONTEXTS
import { AuthProvider } from '@/contexts/AuthContext'
// IMPORT HELPERS
import { setupTracking } from '@/helpers/trackingHelpers'

function FeedAdmin({ Component, pageProps, router }) {
  // Disable tracking
  React.useEffect(() => {
    const disabled = true
    setupTracking(disabled)
  }, [])

  return (

    <AuthProvider>

      {/* Add title */}
      <Head>
        <title key="meta-title">Feed Admin</title>
      </Head>

      <AdminContents>
        <PageTransition timeout={300} classNames="page-transition">
          <Component key={router.route} {...pageProps} />
        </PageTransition>
      </AdminContents>

    </AuthProvider>
  )
}

export default FeedAdmin

FeedAdmin.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
}

FeedAdmin.defaultProps = {
  pageProps: {},
}
