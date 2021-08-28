import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power2 } from 'gsap'

import brandColors from '@/constants/brandColors'

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
  }, [percentage, animateMask, maskRefEl])

  return (
    <div
      className={['relative w-full h-7 border border-solid overflow-hidden', className].join(' ')}
      style={{
        borderRadius: '25px',
        backgroundImage: 'url(/images/progress_bar_gradient.png)',
        backgroundSize: 'cover',
      }}
    >
      <div
        className="w-full h-full absolute"
        style={{
          width: '116%',
          right: '-8%',
        }}
      >
        <div
          className="w-full h-full absolute right-0 bg-white"
          ref={maskRef}
        >
          <span
            className="absolute"
            style={{
              left: '-32px',
              borderLeft: '32px solid transparent',
              borderRight: '0px solid transparent',
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
