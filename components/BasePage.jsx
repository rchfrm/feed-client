import React from 'react'
import PropTypes from 'prop-types'

import PageHeader from './PageHeader'
// IMPORT CONTEXTS
import { NavigationContext } from './contexts/Navigation'
import { UserContext } from './contexts/User'
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT COPY
import MarkdownText from './elements/MarkdownText'
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
  // SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])

  // Get user context
  const { user } = React.useContext(UserContext)

  return (
    <div className={`page--container ${className}`}>
      {user.artists.length === 0 && artistRequired ? (
        <>
          {/* Header */}
          <BasePageHeader header={noArtistHeader} />
          {/* No artist copy */}
          <MarkdownText className="ninety-wide  h4--text" markdown={copy.noArtists} />
        </>
      ) : (
        <>
          {/* Header */}
          <BasePageHeader header={header} />
          {/* Page content */}
          {children}
        </>
      )}
    </div>
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
