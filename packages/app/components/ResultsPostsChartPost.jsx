import React from 'react'
import PropTypes from 'prop-types'
import { gsap, Power2 } from 'gsap'

import useBreakpointTest from '@/hooks/useBreakpointTest'

const ResultsPostsChartPost = ({ post, index, lastThirtyDays, maxValue }) => {
  const postRef = React.useRef({ left: 0, bottom: 0 })
  const [position, setPosition] = React.useState(0)

  const { left, bottom } = position
  const isDesktopLayout = useBreakpointTest('sm')

  React.useEffect(() => {
    const postIndex = lastThirtyDays.findIndex(day => day === post.date)

    const left = postIndex * (100 / 30)
    const bottom = (post.reach / maxValue) * 100

    setPosition({ left, bottom })
  }, [lastThirtyDays, post.date, post.reach, maxValue])

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
      className="absolute bottom-0 rounded-dialogue z-10"
      style={{
        paddingTop: '6%',
        width: '6%',
        left: `${left}%`,
        transform: 'translateX(-25%) translateY(100%)',
        background: 'rgb(63,94,251) linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
      }}
      ref={postRef}
    >
      <div
        className="absolute bg-white px-1 rounded-dialogue border border-solid border-1"
        style={{
          left: '50%',
          bottom: '-8px',
          transform: 'translateX(-50%)',
          fontSize: !isDesktopLayout ? '8px' : '12px',
        }}
      >
        {post.reach}%
      </div>
    </div>
  )
}

ResultsPostsChartPost.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  lastThirtyDays: PropTypes.array.isRequired,
  maxValue: PropTypes.number.isRequired,
}

ResultsPostsChartPost.defaultProps = {
}

export default ResultsPostsChartPost
