import React from 'react'
import Router from 'next/router'

import FacebookIcon from '@/icons/FacebookIcon'
import InstagramIcon from '@/icons/InstagramIcon'

import brandColors from '@/constants/brandColors'

import * as ROUTES from '@/app/constants/routes'

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
        'flex flex-column justify-center items-center p-12 text-center',
      ].join(' ')}
      onClick={goToConnectAccountsPage}
    >
      <FacebookIcon className="h-8 mb-6" fill={brandColors.facebook.bg} />
      <div className="flex flex-column mb-6">
        <span className="mb-1 text-xl font-bold underline">Connect your pages</span>
        <span className="text-lg">to see your Facebook and Instagram posts.</span>
      </div>
      <InstagramIcon className="h-8 mb-6" fill={brandColors.instagram.bg} />
    </button>
  )
}

PostCardConnectAccounts.propTypes = {
}

PostCardConnectAccounts.defaultProps = {
}

export default PostCardConnectAccounts
