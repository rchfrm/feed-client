import React from 'react'
import PropTypes from 'prop-types'

import styles from './SidePanel.module.css'

// INSERTED via the SidePanelContext.jsx
// with the props passed in
function SidePanel({
  content,
  isOpen,
  toggle,
}) {
  const close = () => toggle(false)
  if (!isOpen) return null
  return (
    <>
      <div className={styles.panelBg} />
      <div className={styles.panelContainer}>
        <div className={styles.panelContainer__inner}>
          { content }
        </div>
        <button title="Back" className={styles.backButton} onClick={close}>
          <span className={styles.span}>Back</span>
        </button>
      </div>
    </>
  )
}

SidePanel.propTypes = {
  content: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

export default SidePanel
