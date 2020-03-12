import React from 'react'
import PropTypes from 'prop-types'

import Router, { useRouter } from 'next/router'
import { useTransition, animated } from 'react-spring'

import Spinner from './elements/Spinner'

import styles from './SidePanel.module.css'

// * INSERTED via the SidePanelContext.jsx
// * with the props passed in
function SidePanel({
  isOpen,
  content,
  button,
  toggle,
  isLoading,
}) {
  // Get ROUTE info
  const { query, pathname } = useRouter()
  const [pageQuery] = Object.keys(query)
  // Get close method
  const close = () => {
    // If there's no page query, then simply close
    if (!pageQuery) return toggle(false)
    // If there is a page query, then just remove it
    Router.push(pathname)
  }

  // TOGGLE SHOWING
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    if (!isOpen) {
      setShow(false)
      return
    }
    setShow(isOpen && content)
  }, [isOpen, content])


  // ANIMATIONS
  const transition = useTransition(show, null, {
    from: { progress: 100 },
    enter: { progress: 0 },
    leave: { progress: 100 },
  })


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
