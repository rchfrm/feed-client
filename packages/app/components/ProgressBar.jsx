import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power2 } from 'gsap'

const ProgressBar = ({ percentage, className }) => {
  const maskRef = React.useRef(null)

  const animateMask = React.useCallback(() => {
    if (maskRef.current) {
      const ease = Power2.easeOut
      const duration = 0.5
      const width = `${100 - percentage}%`

      gsap.to(maskRef.current, { width, ease, duration })
    }
  }, [percentage, maskRef])

  React.useEffect(() => {
    animateMask(percentage)
  }, [percentage, animateMask, maskRef])

  return (
    <div
      className={['fixed top-0 left-0 w-full h-1 bg-offwhite z-50', className].join(' ')}
      style={{
        backgroundImage: 'url(/images/progress_bar_gradient.png)',
        backgroundSize: 'cover',
      }}
    >
      <div
        className="w-full h-full absolute"
      >
        <div
          className="w-full h-full absolute right-0 bg-offwhite"
          ref={maskRef}
        />
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
}

export default ProgressBar
