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

const registerServiceWorker = () => {
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('service worker registered')
          registration.addEventListener('updatefound', () => {
          // If updatefound is fired, it means that there's
          // a new service worker being installed.
            const installingWorker = registration.installing
            console.log('A new service worker is being installed:', installingWorker)
          // You can listen for changes to the installing service worker's
          // state via installingWorker.onstatechange
          })
        })
        .catch((error) => {
          console.log('Service worker registration failed:', error)
        })
    } else {
      console.log('Service workers are not supported.')
    }
  })
}

function FeedAdmin({ Component, pageProps, router }) {
  React.useEffect(() => {
    if (process.env.build_env !== 'development') {
      registerServiceWorker()
    }
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
