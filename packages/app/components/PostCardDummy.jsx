import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Image } from 'react-datocms'

import Button from '@/elements/Button'
import ToggleSwitch from '@/elements/ToggleSwitch'
import StarIcon from '@/icons/StarIcon'
import InsightsIcon from '@/icons/InsightsIcon'
import GearIcon from '@/icons/GearIcon'
import ChevronDoubleUpIcon from '@/icons/ChevronDoubleUpIcon'

import brandColors from '@/constants/brandColors'

import { growthGradient } from '@/app/helpers/postsHelpers'

const PostCardDummy = ({ post, image }) => {
  const {
    publishedTime,
    platform,
    score,
  } = post

  return (
    <div
      className={[
        'mx-auto max-w-sm mb-12',
        'sm:max-w-none sm:mx-0 sm:mb-0',
        'col-span-12 sm:col-span-6 lg:col-span-4',
        'pointer-events-none opacity-50',
      ].join(' ')}
    >
      {/* HEADER */}
      <div className="flex justify-between">
        <p className="text-sm bmw:text-base mb-2">
          Original post: <span className="font-bold">{moment(publishedTime).format('D MMM')}</span>, <span className={`font-bold ${platform === 'Facebook' ? 'text-fb' : 'text-insta'}`}>{platform}</span>
        </p>
        <ChevronDoubleUpIcon
          fill="none"
          stroke={brandColors.black}
          className="w-5 h-5"
        />
      </div>
      {/* IMAGE */}
      <div className="w-full relative bg-grey-1 opacity-1 mb-2 rounded-dialogue" style={{ paddingTop: '100%' }}>
        <div className="absolute w-full h-full top-0">
          <Image data={image.responsiveImage} />
        </div>
      </div>
      {/* SCORE */}
      <div
        className={[
          'py-3 px-4 mb-2',
          'flex justify-between items-center',
          'rounded-dialogue',
          'border-solid border-2 border-green',
        ].join(' ')}
      >
        <div className="flex items-center mb-0">
          <StarIcon className="h-4 w-auto" fill={brandColors.green} style={{ transform: 'translateY(-1px)' }} />
          <span className="ml-3 text-grey-2" style={{ transform: 'translateY(-1px)' }}>Score</span>
        </div>
        <p className="flex items-center mb-0 font-bold text-grey-2">{score}</p>
      </div>
      {/* PROMOTABLE TOGGLE */}
      <div
        className={[
          'py-3 px-4 mb-2',
          'flex justify-between items-center',
          'rounded-dialogue',
          'border-solid border-2 border-grey-2',
        ].join(' ')}
      >
        <div className="flex items-center">
          <div
            className="w-4 h-4 rounded-full"
            style={{ background: growthGradient }}
          />
          <div className="flex items-center mb-0">
            <span className="ml-3 text-grey-2" style={{ transform: 'translateY(-1px)' }}>Promotable</span>
          </div>
        </div>
        <ToggleSwitch state onChange={() => {}} />
      </div>
      {/* ACTION BUTTONS */}
      <div className="flex">
        <Button className="h-11 w-1/2 ml-1" version="green" trackComponentName="PostCardDummy">
          <GearIcon
            className="h-5 w-auto"
            fill={brandColors.white}
          />
        </Button>
        <Button className="h-11 w-1/2 ml-1" version="green" trackComponentName="PostCardDummy">
          <InsightsIcon
            className="h-5 w-auto"
            fill={brandColors.white}
          />
        </Button>
      </div>
    </div>
  )
}

PostCardDummy.propTypes = {
  post: PropTypes.shape({
    publishedTime: PropTypes.instanceOf(moment),
    platform: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  image: PropTypes.object.isRequired,
}

PostCardDummy.defaultProps = {
}

export default PostCardDummy
