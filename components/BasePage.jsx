import React from 'react'
import PropTypes from 'prop-types'
// IMPORT CONTEXTS
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
import { InterfaceContext } from './contexts/InterfaceContext'
// IMPORT ELEMENTS
import MarkdownText from './elements/MarkdownText'
// IMPORT COPY
import copy from '../copy/global'


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
  // Hide nav when page mounts
  React.useEffect(() => {
    toggleSubNav(false)
  }, [toggleSubNav])
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
  // Turn off global loading when
  // 1. artist finishes loading
  // 2. page is not artist senstive
  // 3. It's an auth page (ie, login or signup)
  const { artistLoading } = React.useContext(ArtistContext)
  React.useEffect(() => {
    if (!artistLoading && !artistRequired && !authPage) {
      toggleGlobalLoading(false)
    }
  }, [artistLoading, artistRequired, authPage, toggleGlobalLoading])


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
