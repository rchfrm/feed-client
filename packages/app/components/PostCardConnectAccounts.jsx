import React from 'react'
import PropTypes from 'prop-types'

import FacebookIcon from '@/icons/FacebookIcon'
import InstagramIcon from '@/icons/InstagramIcon'

import MarkdownText from '@/elements/MarkdownText'
import ButtonHelp from '@/elements/ButtonHelp'
import ConnectFacebookButton from '@/app/ConnectFacebookButton'

import brandColors from '@/constants/brandColors'

import postsPageCopy from '@/app/copy/PostsPageCopy'
import copy from '@/app/copy/connectProfilesCopy'

const PostCardConnectAccounts = ({ errors, setErrors }) => {
  return (
    <div
      className={[
        'relative mx-auto max-w-sm mb-12',
        'sm:max-w-none sm:mx-0 sm:mb-0',
        'col-span-12 sm:col-span-6 lg:col-span-4',
        'flex flex-column justify-center items-center',
        'z-20 bg-white rounded-dialogue p-12 text-center',
      ].join(' ')}
    >
      <div className="flex mb-6">
        <div className="flex items-center justify-center h-9 w-9 mr-5 rounded-full bg-fb">
          <FacebookIcon className="h-4" fill={brandColors.white} />
        </div>
        <div className="flex items-center justify-center h-9 w-9 rounded-full bg-insta">
          <InstagramIcon className="h-4" fill={brandColors.white} />
        </div>
      </div>
      <MarkdownText markdown={postsPageCopy.connectWithFacebookCard} />
      <ConnectFacebookButton
        errors={errors}
        setErrors={setErrors}
        buttonText="Continue with Facebook"
        trackComponentName="PostCardConnectAccounts"
        className="mb-6 text-sm"
      />
      <ButtonHelp
        content={copy.helpText}
        text="More info on permissions!"
        label="Facebook permissions"
        className="transform scale-75 text-md font-normal"
      />
    </div>
  )
}

PostCardConnectAccounts.propTypes = {
  errors: PropTypes.array,
  setErrors: PropTypes.func.isRequired,
}

PostCardConnectAccounts.defaultProps = {
  errors: [],
}

export default PostCardConnectAccounts
