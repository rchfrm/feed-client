import React from 'react'
import PropTypes from 'prop-types'

import PlatformIcon from '@/icons/PlatformIcon'
import LinkIcon from '@/icons/LinkIcon'

import { capitalise } from '@/helpers/utils'

const PostDetails = ({ post }) => {
  const { platform, message, permalinkUrl, publishedTime } = post

  return (
    <>
      <h2 className="mb-8">Source post details</h2>
      <div className="md:pl-16">
        <div className="sm:flex">
          <div className="mb-6 w-1/2">
            <p className="mb-2 text-lg font-bold">Platform</p>
            <div className="flex items-center pl-4">
              <PlatformIcon platform={platform} className="w-4 h-4 inline mr-1" />
              <p className="mb-0 inline">{capitalise(platform)}</p>
            </div>
          </div>
          <div className="w-1/2">
            <p className="mb-2 text-lg font-bold">Date</p>
            <p className="mb-6 sm:mb-0 pl-4">{publishedTime}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-2 text-lg font-bold">Link</p>
          <div className="flex items-center sm:w-2/3 pl-4">
            <LinkIcon className="w-4 h-4 inline mr-1 flex-shrink-0" />
            <a
              href={permalinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block no-underline no--hover truncate"
            >
              {permalinkUrl}
            </a>
          </div>
        </div>

        {message && (
          <div>
            <p className="mb-2 text-lg font-bold">Caption</p>
            <div className="ml-4 bg-grey-1 p-4 rounded-dialogue sm:bg-white sm:p-0 sm:rounded-none">
              {message}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

PostDetails.propTypes = {
  post: PropTypes.object,
}

PostDetails.defaultProps = {
  post: null,
}

export default PostDetails
