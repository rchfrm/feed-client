import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import ConnectFacebookButton from '@/app/ConnectFacebookButton'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/PostsPageCopy'

const NoArtistsConnectAccountsBlock = ({ className, page }) => {
  const isDesktopLayout = useBreakpointTest('xxs')

  return (
    <div className={className}>
      <MarkdownText markdown={copy.connectWithFacebookBlock(page)} />
      <ConnectFacebookButton
        buttonText={isDesktopLayout ? 'Continue with Facebook' : 'Connect'}
        trackComponentName="NoArtistsConnectAccountsBlock"
        className="w-full text-sm"
      />
    </div>
  )
}

NoArtistsConnectAccountsBlock.propTypes = {
  page: PropTypes.string.isRequired,
  className: PropTypes.string,
}

NoArtistsConnectAccountsBlock.defaultProps = {
  className: null,
}

export default NoArtistsConnectAccountsBlock
