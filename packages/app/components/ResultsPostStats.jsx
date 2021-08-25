import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import Button from '@/elements/Button'
import MediaFallback from '@/elements/MediaFallback'

import PostCardLabel from '@/app/PostCardLabel'

import brandColors from '@/constants/brandColors'

const ResultsPostStats = ({ post, className }) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const imageHeight = isDesktopLayout ? '176px' : '100px'
  return (
    <div
      className={[className].join(' ')}
    >
      <p className="w-full text-bold text-lg sm:hidden">Most effective post</p>
      <div className="flex flex-row sm:flex-col items-center">
        <div
          className="relative sm:mb-8 mr-3 sm:mr-0"
          style={{ height: imageHeight, width: imageHeight }}
        >
          <MediaFallback brokenImageColor={brandColors.green} />
        </div>
        <div className="flex flex-col items:start justify-center sm:items-center">
          <PostCardLabel
            copy="running"
            className="font-bold mb-4 hidden sm:block"
            campaignType="all"
          />
          <p className="font-bold">{post.text}</p>
          <Button
            version="small"
            className={[
              'h-8',
              'bg-green',
              'rounded-full',
            ].join(' ')}
            onClick={() => console.log('Click')}
          >
            View more
          </Button>
        </div>
      </div>
    </div>
  )
}

ResultsPostStats.propTypes = {
  post: PropTypes.object.isRequired,
  className: PropTypes.string,
}

ResultsPostStats.defaultProps = {
  className: '',
}

export default ResultsPostStats
