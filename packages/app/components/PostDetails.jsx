import React from 'react'
import PropTypes from 'prop-types'

import PlatformIcon from '@/icons/PlatformIcon'

import { capitalise } from '@/helpers/utils'

const PostDetails = ({ post }) => {
  const { platform, message, permalinkUrl, publishedTime } = post

  return (
    <>
      <h2 className="mb-8">Source post details</h2>
      <div className="md:pl-16">
        <div className="flex">
          <div className="mb-6 w-1/2">
            <p className="mb-2 text-lg font-bold">Platform</p>
            <div className="flex align-items pl-4">
              <PlatformIcon platform={platform} className="w-4 h-4 inline mr-1" />
              <p className="inline">{capitalise(platform)}</p>
            </div>
          </div>
          <div className="w-1/2">
            <p className="mb-2 text-lg font-bold">Date</p>
            <p className="pl-4">{publishedTime}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-2 text-lg font-bold">Link</p>
          <a
            href={permalinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block no-underline no--hover truncate w-2/3 pl-4"
          >
            {permalinkUrl}
          </a>
        </div>

        <div>
          <p className="mb-2 text-lg font-bold">Caption</p>
          <p className="pl-4">{message}</p>
        </div>
      </div>
    </>
  )
}

PostDetails.propTypes = {
  post: PropTypes.object.isRequired,
}

PostDetails.defaultProps = {
}

export default PostDetails
