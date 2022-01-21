import React from 'react'
import PropTypes from 'prop-types'
import { gsap, Power2 } from 'gsap'

const ResultsPostsChartPost = ({ bottom, left, organicReach, index }) => {
  const postRef = React.useRef(null)

  const animatePost = React.useCallback(() => {
    if (postRef.current) {
      const ease = Power2.easeOut
      const duration = 1

      gsap.to(postRef.current, { bottom, ease, duration, delay: index / 10 })
    }
  }, [index, bottom])

  React.useEffect(() => {
    animatePost()
  }, [animatePost])

  return (
    <div
      className="absolute bottom-0 rounded-dialogue z-10"
      style={{
        paddingTop: '6%',
        width: '6%',
        left,
        background: 'rgb(63,94,251) linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
      }}
      ref={postRef}
    >
      <div
        className="absolute bg-white text-xs px-1 rounded-dialogue border border-solid border-1"
        style={{ left: '50%', bottom: '-8px', transform: 'translateX(-50%)' }}
      >
        {organicReach}
      </div>
    </div>
  )
}

ResultsPostsChartPost.propTypes = {
  bottom: PropTypes.node.isRequired,
  left: PropTypes.node.isRequired,
  organicReach: PropTypes.node.isRequired,
}

ResultsPostsChartPost.defaultProps = {
}

export default ResultsPostsChartPost
