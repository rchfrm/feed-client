import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power2 } from 'gsap'

import brandColors from '@/constants/brandColors'

const fullSpectrumGradient = `linear-gradient(to right, 
  rgb(255,   0,   0) 0%,
  rgb(255, 255,   0) 16.67%,
  rgb(  0, 255,   0) 33.33%,
  rgb(  0, 255, 255) 50%,
  rgb(  0,   0, 255) 66.67%,
  rgb(255,   0, 255) 83.33%,
  rgb(255,   0,   0) 100%
)`

const ProgressBar = ({ percentage, className }) => {
  const maskRef = React.useRef(null)
  const { current: maskRefEl } = maskRef

  const animateMask = React.useCallback(() => {
    if (maskRefEl) {
      const ease = Power2.easeOut
      const duration = 0.5
      const width = `${100 - percentage}%`

      gsap.to(maskRefEl, { width, ease, duration })
    }
  }, [percentage, maskRefEl])

  React.useEffect(() => {
    animateMask(percentage)
  }, [percentage, animateMask])

  return (
    <div
      className={['relative w-full h-7 border border-solid overflow-hidden', className].join(' ')}
      style={{
        background: fullSpectrumGradient,
        borderRadius: '25px',
      }}
    >
      <div
        className="w-full h-full absolute"
        style={{
          width: '110%',
          right: '-5%',
        }}
      >
        <div
          className="w-full h-full absolute right-0 bg-white"
          ref={maskRef}
        >
          <span
            className="absolute"
            style={{
              left: '-16px',
              borderLeft: '16px solid transparent',
              borderRight: '16px solid transparent',
              borderBottom: `26px solid ${brandColors.white}`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
}

export default ProgressBar
