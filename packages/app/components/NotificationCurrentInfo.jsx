import React from 'react'
import PropTypes from 'prop-types'

import { gsap } from 'gsap'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import useBrowserStore from '@/hooks/useBrowserStore'

const NotificationCurrentInfo = ({ containerRef }) => {
  const isDesktopLayout = useBreakpointTest('md')
  const { width: windowWidth } = useBrowserStore()
  const desktopBox = React.useRef(null)
  // RESIZE AND POSITION
  React.useEffect(() => {
    if (!isDesktopLayout) return
    const { current: containerEl } = containerRef
    const containerProps = containerEl.getBoundingClientRect()
    const scrollTop = window.scrollY
    // Calc postiion props
    const positionProps = {
      top: containerProps.top + scrollTop,
      left: containerProps.left + (containerProps.width / 2),
      width: containerProps.width / 2,
      opacity: 1,
    }
    // Set position
    const { current: desktopEl } = desktopBox
    gsap.set(desktopEl, positionProps)
  }, [isDesktopLayout, containerRef, windowWidth])

  // DON'T RENDER ANYTHING IF MOBILE
  if (!isDesktopLayout) {
    return null
  }

  return (
    <div
      ref={desktopBox}
      className={[
        'fixed',
        'pl-5',
      ].join(' ')}
    >
      <div className="bg-grey-1">
        Content
      </div>
    </div>
  )
}

NotificationCurrentInfo.propTypes = {
  containerRef: PropTypes.object.isRequired,
}

export default NotificationCurrentInfo
