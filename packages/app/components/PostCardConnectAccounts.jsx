import React from 'react'
import Router from 'next/router'

import FacebookIcon from '@/icons/FacebookIcon'
import InstagramIcon from '@/icons/InstagramIcon'
import MarkdownText from '@/elements/MarkdownText'
import ButtonFacebook from '@/elements/ButtonFacebook'

import brandColors from '@/constants/brandColors'

import * as ROUTES from '@/app/constants/routes'
import copy from '@/app/copy/PostsPageCopy'

const PostCardConnectAccounts = () => {
  const goToConnectAccountsPage = () => {
    Router.push(ROUTES.CONNECT_ACCOUNTS)
  }

  return (
    <button
      className={[
        'mx-auto max-w-sm mb-12',
        'sm:max-w-none sm:mx-0 sm:mb-0',
        'col-span-12 sm:col-span-6 lg:col-span-4',
        'flex flex-column justify-center items-center',
        'z-20 bg-white rounded-dialogue p-12 text-center',
      ].join(' ')}
      onClick={goToConnectAccountsPage}
    >
      <div className="flex mb-6">
        <div className="flex items-center justify-center h-9 w-9 mr-5 rounded-full bg-fb">
          <FacebookIcon className="h-4" fill={brandColors.white} />
        </div>
        <div className="flex items-center justify-center h-9 w-9 rounded-full bg-insta">
          <InstagramIcon className="h-4" fill={brandColors.white} />
        </div>
      </div>
      <MarkdownText markdown={copy.connectWithFacebook} />
      <ButtonFacebook
        className="font-normal text-sm"
        onClick={() => {}}
        fallbackCta="Continue with Facebook"
        trackComponentName="PostCardConnectAccounts"
      >
        Continue with Facebook
      </ButtonFacebook>
    </button>
  )
}

PostCardConnectAccounts.propTypes = {
}

PostCardConnectAccounts.defaultProps = {
}

export default PostCardConnectAccounts
