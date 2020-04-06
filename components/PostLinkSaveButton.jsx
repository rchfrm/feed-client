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

function PostLinkSaveButton({
  buttonState,
  disabled,
  handleClick,
  version,
  width,
}) {
  // If a request is in progress, show a spinning broken circle
  if (buttonState === 'saving') {
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
      version={version}
      width={width}
      onClick={handleClick}
      disabled={disabled}
      textColor={buttonState === 'saved' ? brandColors.white : undefined}
      bgColor={buttonState === 'saved' ? brandColors.loaderColor : undefined}
    >
      {buttonState[0].toUpperCase() + buttonState.slice(1)}
    </Button>
  )
}

export default PostLinkSaveButton
