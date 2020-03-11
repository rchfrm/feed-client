import React from 'react'
import PropTypes from 'prop-types'

import Router, { useRouter } from 'next/router'

import Spinner from './elements/Spinner'

import styles from './SidePanel.module.css'

// INSERTED via the SidePanelContext.jsx
// with the props passed in
function SidePanel({
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
  return (
    <>
      <div className={styles.panelBg} />
      {/* Show loader if loading */}
      {isLoading && (
        <div className={styles.panelLoader}>
          <Spinner className={styles.spinner} />
        </div>
      )}
      <div className={styles.panelContainer}>
        {/* The content */}
        <div className={styles.panelContainer__inner}>
          { content }
        </div>
        {/* The close button */}
        <button title="Back" className={styles.backButton} onClick={close}>
          <span className={styles.span}>Back</span>
        </button>
        {/* Optional side panel CTA */}
        {button && (
          <div className={styles.panelButton}>
            {button}
          </div>
        )}
      </div>
    </>
  )
}

SidePanel.propTypes = {
  content: PropTypes.node.isRequired,
  button: PropTypes.node,
  toggle: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
}

SidePanel.defaultProps = {
  button: null,
  isLoading: false,
}

export default SidePanel
