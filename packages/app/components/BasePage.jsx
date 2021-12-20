import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { capitalise } from '@/helpers/utils'
// IMPORT CONTEXTS
import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
// IMPORT STORES
import useControlsStore from '@/app/stores/controlsStore'

// IMPORT ELEMENTS
import MarkdownText from '@/elements/MarkdownText'
// IMPORT COPY
import copy from '@/app/copy/global'

const getControlsLoading = state => state.isControlsLoading

const BasePage = ({
  headerConfig, // heading and punctuation
  artistRequired,
  controlsRequired,
  hasNoProfilesPage,
  staticPage,
  authPage,
  children,
}) => {
  // Get interface context
  const { setHeader, toggleSubNav, toggleGlobalLoading } = React.useContext(InterfaceContext)
  // Get user context
  const { user } = React.useContext(UserContext)
  // ON MOUNT
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    if (mounted) return
    setMounted(true)
    // Set header when page mounts
    setHeader(headerConfig)
    // If page is static, stop global loading when mounts
    if (staticPage) {
      toggleGlobalLoading(false)
    }
  }, [mounted, setHeader, toggleGlobalLoading, headerConfig, staticPage])
  // Hide nav when page mounts
  React.useEffect(() => {
    if (mounted) return
    toggleSubNav(false)
  }, [toggleSubNav, mounted])
  const { artistLoading } = React.useContext(ArtistContext)
  const controlsLoading = useControlsStore(getControlsLoading)
  React.useEffect(() => {
    const hasArtists = user.artists.length
    // Turn off global loading when:
    // User has no artists (ie, login or signup)
    if (user.artists && !hasArtists) return toggleGlobalLoading(false)
    // Page is not artist sensitive and page is not controls sensitive and it's not an auth page (ie, login or signup)
    if (!artistRequired && !controlsRequired && !authPage) {
      toggleGlobalLoading(false)
    }
    // Page is artist sensitive and artist has been loaded and page is not controls sensitive
    if (artistRequired && !artistLoading && !controlsRequired) {
      toggleGlobalLoading(false)
    }
    // Page is controls sensitive and links have been loaded
    if (controlsRequired && !controlsLoading) {
      toggleGlobalLoading(false)
    }
  }, [artistLoading, artistRequired, authPage, toggleGlobalLoading, user, controlsRequired, controlsLoading])

  return (
    <>
      <Head>
        <meta property="og:title" content={`Feed | ${capitalise(headerConfig.text)}`} />
      </Head>
      {user.artists.length === 0 && artistRequired && !hasNoProfilesPage ? (
        <div>
          {/* NO ARTIST COPY */}
          <div className="p-5 bg-grey-1 rounded-dialogue max-w-xl mb-4">
            <MarkdownText className="h4--text mb-0" markdown={copy.noArtists} />
          </div>
        </div>
      ) : (
        <>
          {/* PAGE CONTENT */}
          {children}
        </>
      )}
    </>
  )
}

BasePage.propTypes = {
  headerConfig: PropTypes.object,
  artistRequired: PropTypes.bool,
  controlsRequired: PropTypes.bool,
  hasNoProfilesPage: PropTypes.bool,
  staticPage: PropTypes.bool,
  authPage: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

BasePage.defaultProps = {
  headerConfig: null,
  staticPage: false,
  authPage: false,
  artistRequired: false,
  controlsRequired: false,
  hasNoProfilesPage: false,
}


export default BasePage
