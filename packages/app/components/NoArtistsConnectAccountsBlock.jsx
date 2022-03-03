import React from 'react'
import PropTypes from 'prop-types'

import ConnectFacebookButton from '@/app/ConnectFacebookButton'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/PostsPageCopy'

const NoArtistsConnectAccountsBlock = ({ className, page }) => {
  return (
    <div className={className}>
      <MarkdownText markdown={copy.connectWithFacebookBlock(page)} />
      <ConnectFacebookButton
        buttonText="Continue with Facebook"
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
