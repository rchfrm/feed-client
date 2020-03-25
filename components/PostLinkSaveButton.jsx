// IMPORT PACKAGES
import React from 'react'

// IMPORT ELEMENTS
import Button from './elements/Button'
import BrokenCircle from './icons/BrokenCircle'
// IMPORT PAGES
// IMPORT ASSETS

// IMPORT STYLES
import brandColors from '../constants/brandColors'
import styles from './PostsPage.module.css'

function PostLinkSaveButton({ state, disabled, handleClick }) {
  // If a request is in progress, show a spinning broken circle
  if (state === 'saving') {
    return (
      <div className={styles['broken-circle']}>
        <BrokenCircle className={styles.svg} width={25} fill={brandColors.loaderColor} />
      </div>
    )
  }

  // Otherwise show a button, indicating that the information can be saved,
  // or has been saved
  return (
    <Button
      version="black"
      width={25}
      onClick={handleClick}
      disabled={disabled}
      textColor={state === 'saved' ? brandColors.white : undefined}
      bgColor={state === 'saved' ? brandColors.loaderColor : undefined}
    >
      {state[0].toUpperCase() + state.slice(1)}
    </Button>
  )
}

export default PostLinkSaveButton
