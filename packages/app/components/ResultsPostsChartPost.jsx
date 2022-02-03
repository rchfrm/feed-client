import React from 'react'
import PropTypes from 'prop-types'
import { gsap, Power2 } from 'gsap'

import PostCardMedia from '@/app/PostCardMedia'

import useBreakpointTest from '@/hooks/useBreakpointTest'

const ResultsPostsChartPost = ({
  post,
  value,
  lastThirtyDays,
  maxValue,
}) => {
  const postRef = React.useRef(null)
  const [position, setPosition] = React.useState({ left: 0, bottom: 0 })

  const { left, bottom } = position
  const isDesktopLayout = useBreakpointTest('sm')

  React.useEffect(() => {
    const postIndex = lastThirtyDays.findIndex(day => day === post.publishedTime)

    // Calculate position on x-axis based on the post object index within the last 30 days array
    const left = postIndex * (100 / lastThirtyDays.length)

    // Calculate position on y-axis based on value (reach or engagement score), highest reach score and post DOM element height.
    const bottom = (value / maxValue) * 88.5

    setPosition({ left, bottom })
  }, [lastThirtyDays, post.publishedTime, value, maxValue])

  const animatePost = React.useCallback(() => {
    if (postRef.current) {
      const ease = Power2.easeOut
      const duration = 1

      gsap.to(postRef.current, { bottom: `${bottom}%`, ease, duration })
    }
  }, [bottom])

  React.useEffect(() => {
    animatePost()
  }, [animatePost])

  return (
    <div
      className="absolute bottom-0 z-10"
      style={{
        width: '6%',
        left: `${left}%`,
        transform: 'translateX(-25%)',
      }}
      ref={postRef}
    >
      <PostCardMedia
        media={post.media}
        thumbnails={post.thumbnails}
        postType={post.postType}
      />
      <div
        className="absolute bg-white px-1 rounded-dialogue border border-solid border-1"
        style={{
          left: '50%',
          bottom: '-8px',
          transform: 'translateX(-50%)',
          fontSize: !isDesktopLayout ? '8px' : '12px',
        }}
      >
        {value}%
      </div>
    </div>
  )
}

ResultsPostsChartPost.propTypes = {
  post: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  lastThirtyDays: PropTypes.array.isRequired,
  maxValue: PropTypes.number.isRequired,
}

ResultsPostsChartPost.defaultProps = {
}

export default ResultsPostsChartPost
