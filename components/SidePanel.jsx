import React from 'react'
import PropTypes from 'prop-types'

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
  console.log('side panel mount')
  const close = () => toggle(false)
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
        <div className={styles.panelContainer__inner}>
          { content }
        </div>
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
