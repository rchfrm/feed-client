import React from 'react'
import PropTypes from 'prop-types'

import { gsap } from 'gsap'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import useBrowserStore from '@/hooks/useBrowserStore'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'
import useNotificationStore from '@/app/store/notificationsStore'

import NotificationCurrentInfoContent from '@/app/NotificationCurrentInfoContent'

const getOpenNotification = state => state.openNotification
const getCloseNotification = state => state.closeNotification

const NotificationCurrentInfo = ({ containerRef }) => {
  const isDesktopLayout = useBreakpointTest('md')
  const { width: windowWidth } = useBrowserStore()
  const desktopBox = React.useRef(null)
  // GET OPEN NOTIFICATION
  const openNotification = useNotificationStore(getOpenNotification)
  const closeNotification = useNotificationStore(getCloseNotification)

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

  // SIDE PANEL context
  const {
    setSidePanelContent,
    setSidePanelButton,
    setOnSidepanelClose,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  // Get info content
  const infoContent = React.useMemo(() => {
    if (!openNotification) return null
    return (
      <NotificationCurrentInfoContent
        title={openNotification.title}
        description={openNotification.description}
        sidepanelLayout={!isDesktopLayout}
      />
    )
  }, [openNotification, isDesktopLayout])

  // HANDLE SIDEPANEL
  React.useEffect(() => {
    // CLOSE SIDEPANEL if DESKTOP
    if (isDesktopLayout) {
      setSidePanelContent(null)
      toggleSidePanel(false)
      setOnSidepanelClose(null)
      return
    }
    // OPEN SIDEPANEL if MOBILE
    const sidepanelOpen = !!infoContent
    setSidePanelContent(infoContent)
    toggleSidePanel(sidepanelOpen)
    setOnSidepanelClose(() => closeNotification)
    return () => {
      setOnSidepanelClose(null)
    }
  }, [infoContent, isDesktopLayout, setOnSidepanelClose, toggleSidePanel, setSidePanelContent, closeNotification])

  // STOP HERE if NO NOTIFICATION or mobile
  if (!openNotification || !isDesktopLayout) return null

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
        {infoContent}
      </div>
    </div>
  )
}

NotificationCurrentInfo.propTypes = {
  containerRef: PropTypes.object.isRequired,
}

export default NotificationCurrentInfo
