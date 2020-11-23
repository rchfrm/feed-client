import React from 'react'
import PropTypes from 'prop-types'

import { gsap } from 'gsap'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import useBrowserStore from '@/hooks/useBrowserStore'
import useNotificationStore from '@/app/store/notificationsStore'

const getOpenNotification = state => state.openNotification

const NotificationCurrentInfo = ({ containerRef }) => {
  const isDesktopLayout = useBreakpointTest('md')
  const { width: windowWidth } = useBrowserStore()
  const desktopBox = React.useRef(null)
  // GET OPEN NOTIFICATION
  const openNotification = useNotificationStore(getOpenNotification)

  // RESIZE AND POSITION
  React.useEffect(() => {
    const { current: containerEl } = containerRef
    const { current: desktopEl } = desktopBox
    if (!isDesktopLayout || !containerEl || !openNotification || !desktopEl) return
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
    gsap.set(desktopEl, positionProps)
  }, [isDesktopLayout, containerRef, windowWidth, openNotification])

  console.log('openNotification', openNotification)

  // DON'T RENDER ANYTHING IF MOBILE or NO CURRENT NOTIFICATION
  if (!openNotification || !isDesktopLayout) {
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
      <div
        className={[
          'rounded-dialogue',
          'p-4 sm:p-5 bg-grey-1',
        ].join(' ')}
        style={{
          marginTop: -1,
        }}
      >
        <h3>{openNotification.title}</h3>
        <p>{openNotification.description}</p>
      </div>
    </div>
  )
}

NotificationCurrentInfo.propTypes = {
  containerRef: PropTypes.object.isRequired,
}

export default NotificationCurrentInfo
