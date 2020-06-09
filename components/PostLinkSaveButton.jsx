// IMPORT PACKAGES
import React from 'react'

// IMPORT ELEMENTS
import Button from '@/elements/Button'

const getButtonVersion = (buttonState) => {
  if (buttonState === 'save') return 'black'
  if (buttonState === 'saving') return 'loading'
  if (buttonState === 'disabled') return 'black'
  if (buttonState === 'saved') return 'success'
}

function PostLinkSaveButton({
  buttonState,
  disabled,
  handleClick,
  style,
}) {
  // Get button version
  const version = getButtonVersion(buttonState)
  // Output button
  return (
    <Button
      version={version}
      style={style}
      onClick={handleClick}
      disabled={disabled}
      loading={buttonState === 'saving'}
    >
      {buttonState[0].toUpperCase() + buttonState.slice(1)}
    </Button>
  )
}

export default PostLinkSaveButton
