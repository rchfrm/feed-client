import React from 'react'
import PropTypes from 'prop-types'
import { gsap, Power2 } from 'gsap'

import useBreakpointTest from '@/hooks/useBreakpointTest'

const ResultsPostsChartPost = ({
  post,
  value,
  index,
  lastThirtyDays,
  maxValue,
}) => {
  const postRef = React.useRef(null)
  const [position, setPosition] = React.useState({ left: 0, bottom: 0 })

  const { left, bottom } = position
  const isDesktopLayout = useBreakpointTest('sm')

  React.useEffect(() => {
    const postIndex = lastThirtyDays.findIndex(day => day === post.date)

    // Calculate position on x-axis based on the post object index within the last 30 days array
    const left = postIndex * (100 / lastThirtyDays.length)

    // Calculate position on y-axis based on value (reach or engagement score), highest reach score and post DOM element height.
    const bottom = (value / maxValue) * 88.5

    setPosition({ left, bottom })
  }, [lastThirtyDays, post.date, value, maxValue])

  const animatePost = React.useCallback(() => {
    if (postRef.current) {
      const ease = Power2.easeOut
      const duration = 1

      gsap.to(postRef.current, { bottom: `${bottom}%`, ease, duration, delay: index / 10 })
    }
  }, [bottom, index])

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
      <img src="/images/dummyPostImages/dolo-iglesias.png" className="rounded-dialogue" alt="post image" />
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
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  lastThirtyDays: PropTypes.array.isRequired,
  maxValue: PropTypes.number.isRequired,
}

ResultsPostsChartPost.defaultProps = {
}

export default ResultsPostsChartPost
