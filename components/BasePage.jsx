import React from 'react'
import PropTypes from 'prop-types'
// IMPORT CONTEXTS
import { UserContext } from './contexts/User'
import { InterfaceContext } from './contexts/InterfaceContext'
// IMPORT ELEMENTS
import MarkdownText from './elements/MarkdownText'
// IMPORT COPY
import copy from '../copy/global'


const BasePage = ({
  headerConfig, // heading and punctuation
  artistRequired,
  staticPage,
  children,
}) => {
  // Get interface context
  const { setHeader, setSubNav, setGlobalLoading } = React.useContext(InterfaceContext)
  // Get user context
  const { user } = React.useContext(UserContext)
  // Hide nav when page mounts
  React.useEffect(() => {
    setSubNav(false)
  }, [])
  // ON MOUNT
  React.useEffect(() => {
    // Set header when page mounts
    setHeader(headerConfig)
    // If page is static, stop global loading when mounts
    if (staticPage) {
      setGlobalLoading(false)
    }
  }, [])


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
  children: PropTypes.node.isRequired,
}

BasePage.defaultProps = {
  headerConfig: null,
  staticPage: false,
  artistRequired: false,
}


export default BasePage
