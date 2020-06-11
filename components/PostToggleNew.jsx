import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power1 } from 'gsap'

import styles from '@/PostToggle.module.css'

import brandColors from '@/constants/brandColors'

const getBorderColor = (promotionEnabled) => {
  const { successColor, errorColor } = brandColors
  if (promotionEnabled) return successColor
  return errorColor
}

const getStateClass = (buttonState) => {
  if (buttonState === 'on') return styles.on
  if (buttonState === 'off') return styles.off
  return ''
}

const animateSwitch = (target, buttonState) => {
  const xDirection = buttonState === 'on' ? 1 : buttonState === 'off' ? -1 : 0
  const x = 14 * xDirection
  const duration = 0.2
  gsap.to(target, { x, duration, ease: Power1.easeOut })
}

const TOGGLE_BUTTON = ({ action, buttonState, setButtonState }) => {
  const xClass = action === 'off' ? 'left-0' : 'right-0'
  const newState = buttonState === 'default' ? action : 'default'
  return (
    <button
      className={[
        'absolute',
        'top-0',
        'bottom-0',
        xClass,
        'w-1/2',
        'z-2',
      ].join(' ')}
      onClick={() => setButtonState(newState)}
      aria-label={`Toggle post ${action}`}
    />
  )
}

const PostToggleNew = ({
  post,
  promotionEnabled,
  togglePromotion,
}) => {
  const [buttonState, setButtonState] = React.useState('default')
  const borderColor = getBorderColor(promotionEnabled)
  const switchEl = React.useRef(null)
  // When button state changes
  React.useEffect(() => {
    const { current: target } = switchEl
    animateSwitch(target, buttonState)
  }, [buttonState])
  return (
    <div
      className={[styles.PostToggle, getStateClass(buttonState)].join(' ')}
      style={{
        border: `2px solid ${borderColor}`,
      }}
    >
      <div className={styles.background} />
      {/* Buttons */}
      <TOGGLE_BUTTON action="off" buttonState={buttonState} setButtonState={setButtonState} />
      <TOGGLE_BUTTON action="on" buttonState={buttonState} setButtonState={setButtonState} />
      <div className={styles.switch} ref={switchEl} />
    </div>
  )
}

PostToggleNew.propTypes = {
  post: PropTypes.object.isRequired,
  promotionEnabled: PropTypes.bool.isRequired,
  togglePromotion: PropTypes.func.isRequired,
}

export default PostToggleNew
