import React from 'react'
import PropTypes from 'prop-types'

import { gsap } from 'gsap'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import useBrowserStore from '@/hooks/useBrowserStore'
import useAnimateOnMount from '@/hooks/useAnimateOnMount'
import useDismissNotification from '@/app/hooks/useDismissNotification'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'
import useNotificationStore from '@/app/stores/notificationsStore'

import NotificationCurrentInfoContent from '@/app/NotificationCurrentInfoContent'
import NotificationCurrentInfoButton from '@/app/NotificationCurrentInfoButton'

const getOpenedNotification = state => state.openedNotification
const getCloseNotification = state => state.closeNotification
const getCompleteNotification = state => state.completeNotification

const NotificationCurrentInfo = ({ containerRef }) => {
  const isDesktopLayout = useBreakpointTest('md')
  const { width: windowWidth } = useBrowserStore()
  const desktopBox = React.useRef(null)
  // GET OPEN NOTIFICATION
  const openedNotification = useNotificationStore(getOpenedNotification)
  const closeNotification = useNotificationStore(getCloseNotification)
  const completeNotification = useNotificationStore(getCompleteNotification)

  // RESIZE AND POSITION
  React.useEffect(() => {
    const { current: containerEl } = containerRef
    const { current: desktopEl } = desktopBox
    if (!isDesktopLayout || !containerEl || !openedNotification || !desktopEl) return
    const containerProps = containerEl.getBoundingClientRect()
    const scrollTop = window.scrollY
    // Calc postiion props
    const positionProps = {
      top: containerProps.top + scrollTop,
      left: containerProps.left + (containerProps.width / 2),
      width: containerProps.width / 2,
      opacity: 1,
    }
    gsap.set(desktopEl, positionProps)
  }, [isDesktopLayout, containerRef, windowWidth, openedNotification])

  // SIDE PANEL context
  const {
    setSidePanelContent,
    setSidePanelButton,
    setOnSidepanelClose,
    toggleSidePanel,
    sidePanelOpen: isSidepanelOpen,
  } = React.useContext(SidePanelContext)

  // GET DISMISS FUNCTION
  const dismissNotification = useDismissNotification(openedNotification)

  const infoButtonAndContent = React.useMemo(() => {
    if (!openedNotification) return {}
    const button = (
      <NotificationCurrentInfoButton
        ctaText={openedNotification.ctaText}
        buttonType={openedNotification.buttonType}
        linkType={openedNotification.linkType}
        isComplete={openedNotification.isComplete}
        onAction={openedNotification.onAction}
        onComplete={() => completeNotification(openedNotification.id)}
        dismissNotification={dismissNotification}
        sidepanelLayout={!isDesktopLayout}
      />
    )
    const content = (
      <NotificationCurrentInfoContent
        title={openedNotification.title}
        description={openedNotification.description}
        date={openedNotification.dateLong}
        isComplete={openedNotification.isComplete}
        buttonEl={button}
        sidepanelLayout={!isDesktopLayout}
      />
    )
    return { content, button }
  }, [openedNotification, completeNotification, dismissNotification, isDesktopLayout])

  // HANDLE SIDEPANEL
  React.useEffect(() => {
    const { button, content } = infoButtonAndContent
    // CLOSE SIDEPANEL if DESKTOP
    if (isDesktopLayout && isSidepanelOpen) {
      setSidePanelContent(null)
      toggleSidePanel(false)
      setOnSidepanelClose(null)
      setSidePanelButton(null)
      return
    }
    // OPEN SIDEPANEL if MOBILE
    const sidepanelOpen = !!content
    if (sidepanelOpen === isSidepanelOpen) return
    setSidePanelContent(content)
    toggleSidePanel(sidepanelOpen)
    setOnSidepanelClose(() => closeNotification)
    setSidePanelButton(button)
    return () => {
      setOnSidepanelClose(null)
    }
  // eslint-disable-next-line
  }, [infoButtonAndContent, isDesktopLayout, closeNotification])

  // ANIMATE
  // Define animation config
  const animateToFrom = {
    y: { from: 10, to: 0 },
    scaleX: { from: 0.95, to: 1 },
    opacity: { from: 0, to: 1 },
  }
  // Setup animation hook
  const animatedDiv = useAnimateOnMount({
    animateToFrom,
    animationOptions: {
      duration: [0.3, 0.2],
      ease: ['power2.out', 'power1.out'],
    },
    initial: 'hidden',
  })
  // Trigger animation
  React.useEffect(() => {
    if (!isDesktopLayout) return
    // SHOW CONTENT
    if (openedNotification && !openedNotification.hidden) {
      animatedDiv.showPresence()
      return
    }
    // HIDE CONTENT
    animatedDiv.hidePresence()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedNotification, isDesktopLayout])

  // STOP HERE if NO NOTIFICATION or mobile
  if (!isDesktopLayout) return null

  return (
    <div
      ref={desktopBox}
      className={[
        'fixed',
        'pl-5',
      ].join(' ')}
    >
      {animatedDiv.isRendered && (
        <div
          ref={animatedDiv.ref}
          className={[
            'rounded-dialogue',
            'p-4 sm:p-5 bg-grey-1',
          ].join(' ')}
          style={{
            marginTop: -1,
            willChange: 'transform, opacity',
          }}
        >
          {infoButtonAndContent.content}
        </div>
      )}
    </div>
  )
}

NotificationCurrentInfo.propTypes = {
  containerRef: PropTypes.object.isRequired,
}

export default NotificationCurrentInfo
