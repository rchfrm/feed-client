import React from 'react'
import PropTypes from 'prop-types'

import styles from './SidePanel.module.css'

function SidePanel({ children, close }) {
  return (
    <>
      <div className={styles.panelBg} />
      <div className={styles.panelContainer}>
        { children }
        <button title="Back" className={styles.backButton} onClick={close}>
          <span className={styles.span}>Back</span>
        </button>
      </div>
    </>
  )
}

SidePanel.propTypes = {
  children: PropTypes.element.isRequired,
  close: PropTypes.func.isRequired,
}

export default SidePanel
