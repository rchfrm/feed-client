import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import Button from '@/elements/Button'
import MediaFallback from '@/elements/MediaFallback'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

import { abbreviateNumber } from '@/helpers/utils'

import brandColors from '@/constants/brandColors'

const ResultsPostStats = ({
  post,
  data,
  config,
  className,
}) => {
  const { type, color } = config
  const { ads_reach: adsReach } = data
  const isDesktopLayout = useBreakpointTest('sm')
  const imageHeight = isDesktopLayout ? '176px' : '100px'
  const values = type === 'growth' ? [post.reach] : [post.engaged, (adsReach.proportion * 100)]
  return (
    <div
      className={[className].join(' ')}
    >
      <p className="w-full text-bold text-lg sm:hidden">Most effective post</p>
      <div className="flex flex-row sm:flex-col items-center">
        <MarkdownText markdown={copy.postDescription(type, values)} className="hidden sm:block text-center sm:px-9" />
        <div
          className="relative mr-3 sm:mr-0"
          style={{ height: imageHeight, width: imageHeight }}
        >
          <MediaFallback brokenImageColor={brandColors.green} />
        </div>
        <div
          className={[
            'hidden',
            'sm:flex flex-column items-center',
            '-mt-5 mb-6 px-6 py-1 z-10',
            'text-white rounded-full',
          ].join(' ')}
          style={{ backgroundColor: color }}
        >
          {abbreviateNumber(values[0])}
          <span className="text-xs -mt-1">{type === 'growth' ? 'engaged' : 'reached'}</span>
        </div>
        <div className="flex flex-col items-start justify-center sm:items-center">
          <MarkdownText markdown={copy.postDescriptionMobile(type, values)} className="sm:hidden" />
          <Button
            version="small outline"
            className={[
              'h-8',
              'rounded-full',
              'border-solid border-black border-2 text-black',
            ].join(' ')}
            onClick={() => console.log('View more')}
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
  data: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  className: PropTypes.string,
}

ResultsPostStats.defaultProps = {
  className: '',
}

export default ResultsPostStats
