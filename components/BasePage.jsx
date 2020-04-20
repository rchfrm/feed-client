import React from 'react'
import PropTypes from 'prop-types'
// IMPORT CONTEXTS
import { NavigationContext } from './contexts/Navigation'
import { UserContext } from './contexts/User'
// IMPORT ELEMENTS
import PageHeader from './PageHeader'
import MarkdownText from './elements/MarkdownText'
// IMPORT COPY
import copy from '../copy/global'


const BasePageHeader = ({ header }) => {
  if (!header) return null
  const { heading, punctuation } = header
  return <PageHeader heading={heading} punctuation={punctuation} />
}

const BasePage = ({
  header, // heading and punctuation
  noArtistHeader, // as above, but for user requires artist and no artist present
  artistRequired,
  children,
}) => {
  // Hide nav when page mounts
  const { navDispatch } = React.useContext(NavigationContext)
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])

  // Get user context
  const { user } = React.useContext(UserContext)

  return (
    <>
      {user.artists.length === 0 && artistRequired ? (
        <>
          {/* HEADER */}
          <BasePageHeader header={noArtistHeader} />
          {/* NO ARTIST COPY */}
          <MarkdownText className="ninety-wide  h4--text" markdown={copy.noArtists} />
        </>
      ) : (
        <>
          {/* HEADER */}
          <BasePageHeader header={header} />
          {/* PAGE CONTENT */}
          {children}
        </>
      )}
    </>
  )
}

BasePage.propTypes = {
  header: PropTypes.object,
  noArtistHeader: PropTypes.object,
  artistRequired: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

BasePage.defaultProps = {
  header: null,
  noArtistHeader: null,
  artistRequired: false,
}


export default BasePage
