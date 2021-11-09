import React from 'react'
import PropTypes from 'prop-types'

import ConnectFacebookButton from '@/app/ConnectFacebookButton'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/PostsPageCopy'

const PostsNoArtistsConnectAccountsBlock = ({ errors, setErrors, className }) => {
  return (
    <div className={className}>
      <MarkdownText markdown={copy.connectWithFacebookBlock} />
      <ConnectFacebookButton
        errors={errors}
        setErrors={setErrors}
        buttonText="Continue with Facebook"
        trackComponentName="PostsNoArtists"
        className="w-full text-sm"
      />
    </div>
  )
}

PostsNoArtistsConnectAccountsBlock.propTypes = {
  errors: PropTypes.array,
  setErrors: PropTypes.func.isRequired,
}

PostsNoArtistsConnectAccountsBlock.defaultProps = {
  errors: [],
}

export default PostsNoArtistsConnectAccountsBlock
