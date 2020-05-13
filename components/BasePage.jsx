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
  noArtistHeader, // as above, but for user requires artist and no artist present
  artistRequired,
  children,
}) => {
  // TODO Hide nav when page mounts
  // Get interface context
  const { header, setHeader } = React.useContext(InterfaceContext)
  // Get user context
  const { user } = React.useContext(UserContext)

  React.useEffect(() => {
    setHeader(headerConfig)
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
  noArtistHeader: PropTypes.object,
  artistRequired: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

BasePage.defaultProps = {
  headerConfig: null,
  noArtistHeader: null,
  artistRequired: false,
}


export default BasePage
