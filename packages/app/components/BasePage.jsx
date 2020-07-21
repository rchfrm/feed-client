import React from 'react'
import PropTypes from 'prop-types'
// IMPORT CONTEXTS
import { UserContext } from '@/contexts/UserContext'
import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
// IMPORT ELEMENTS
import MarkdownText from '@/elements/MarkdownText'
// IMPORT COPY
import copy from '@/app/copy/global'


const BasePage = ({
  headerConfig, // heading and punctuation
  artistRequired,
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
  // Turn off global loading when
  // 1. artist finishes loading &
  // 2. page is not artist senstive &
  // 3. It's an auth page (ie, login or signup)
  // OR
  // 1a. User has no artists (ie, login or signup)
  const { artistLoading } = React.useContext(ArtistContext)
  React.useEffect(() => {
    const hasArtists = user.artists.length
    if (user.artists && !hasArtists) return toggleGlobalLoading(false)
    if (!artistLoading && !artistRequired && !authPage) {
      toggleGlobalLoading(false)
    }
  }, [artistLoading, artistRequired, authPage, toggleGlobalLoading, user])


  return (
    <>
      {user.artists.length === 0 && artistRequired ? (
        <>
          {/* NO ARTIST COPY */}
          <MarkdownText className="h4--text" markdown={copy.noArtists} />
        </>
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
  staticPage: PropTypes.bool,
  authPage: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

BasePage.defaultProps = {
  headerConfig: null,
  staticPage: false,
  authPage: false,
  artistRequired: false,
}


export default BasePage
