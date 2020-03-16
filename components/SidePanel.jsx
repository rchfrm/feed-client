import React from 'react'
import PropTypes from 'prop-types'

import { useTransition, animated } from 'react-spring'

import Spinner from './elements/Spinner'

import styles from './SidePanel.module.css'


const setBodyScroll = (canScroll, scrollTop) => {
  const container = document.querySelector('#container')
  if (!canScroll) {
    scrollTop.current = window.pageYOffset
    document.body.classList.add('__no-scroll')
    container.style.marginTop = `${-1 * scrollTop.current}px`
    return
  }

  document.body.classList.remove('__no-scroll')
  window.pageYOffset = scrollTop.current
  container.style.marginTop = ''
}

// * INSERTED via the SidePanelContext.jsx
// * with the props passed in
function SidePanel({
  isOpen,
  content,
  button,
  toggle,
  isLoading,
}) {
  // TOGGLE SHOWING
  // and
  // TOGGLE BODY SCROLLING
  const scrollTop = React.useRef(0)
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    if (!isOpen) {
      setShow(false)
      setBodyScroll(true, scrollTop)
      return
    }
    setShow(isOpen && content)
    setBodyScroll(false, scrollTop)
  }, [isOpen, content])


  // ANIMATIONS
  const transition = useTransition(show, null, {
    from: { progress: 100 },
    enter: { progress: 0 },
    leave: { progress: 100 },
  })

  // Define close function
  const close = () => toggle(false)

  return transition.map(({ item, key, props: { progress } }) => item && (
    <div key={key} className={styles.SidePanel}>
      {/* The BG */}
      <animated.a
        className={styles.background}
        onClick={close}
        style={{
          opacity: progress.interpolate((p) => 1 - (p / 100)),
        }}
      />
      {/* Show loader if loading */}
      {isLoading && (
        <div className={styles.loader}>
          <Spinner className={styles.spinner} />
        </div>
      )}
      <animated.div
        className={styles.container}
        style={{
          transform: progress.interpolate((p) => `translate3d(${p}%, 0, 0)`),
        }}
      >
        {/* The content */}
        <div className={styles.container__inner}>
          { content }
        </div>
        {/* The close button */}
        <button title="Back" className={styles.backButton} onClick={close}>
          <span className={styles.span}>Back</span>
        </button>
        {/* Optional side panel CTA */}
        {button && (
          <div className={styles.ctaButton}>
            {button}
          </div>
        )}
      </animated.div>
    </div>
  ))
}

SidePanel.propTypes = {
  isOpen: PropTypes.bool,
  content: PropTypes.node,
  button: PropTypes.node,
  toggle: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
}

SidePanel.defaultProps = {
  isOpen: false,
  button: null,
  isLoading: false,
}

export default SidePanel
