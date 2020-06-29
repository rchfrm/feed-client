import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power1 } from 'gsap'
import { useDrag } from 'react-use-gesture'
import clamp from 'lodash/clamp'

import styles from '@/app/PostToggle.module.css'

import brandColors from '@/constants/brandColors'

// HELPER FUNCTIONS
const getBorderColor = (buttonState, promotionEnabled) => {
  const { successColor, errorColor } = brandColors
  // Use button state first
  if (buttonState === 'on') return successColor
  if (buttonState === 'off') return errorColor
  // Else use promotion enabled state
  if (promotionEnabled) return successColor
  return errorColor
}

const getStateClass = (buttonState) => {
  if (buttonState === 'on') return styles.on
  if (buttonState === 'off') return styles.off
  return ''
}

const animateSwitch = (buttonState, target) => {
  const xDirection = buttonState === 'on' ? 1 : buttonState === 'off' ? -1 : 0
  const x = 14 * xDirection
  const duration = 0.2
  gsap.to(target, { x, duration, ease: Power1.easeOut })
}

// ON / OFF BUTTON COMPONENT
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

const PostToggle = ({
  post,
  promotionEnabled,
  togglePromotion,
}) => {
  const [buttonState, setButtonState] = React.useState('default')
  const [borderColor, setBorderColor] = React.useState(getBorderColor(buttonState, promotionEnabled))
  const switchEl = React.useRef(null)
  const containerEl = React.useRef(null)
  // WHEN BUTTON STATE CHANGES
  React.useEffect(() => {
    const { current: target } = switchEl
    setBorderColor(getBorderColor(buttonState, promotionEnabled))
    animateSwitch(buttonState, target)
  }, [buttonState, promotionEnabled])
  // SETUP DRAG
  const containerWidth = React.useRef(0)
  const switchWidth = React.useRef(0)
  // Setup GSP setter
  const cssSetter = React.useRef(null)
  const dragBoundaries = React.useRef({})
  React.useEffect(() => {
    cssSetter.current = gsap.quickSetter(switchEl.current, 'x', 'px')
    containerWidth.current = containerEl.current.offsetWidth
    switchWidth.current = switchEl.current.offsetWidth
    const maxMove = ((containerWidth.current - switchWidth.current) / 2) - 5
    dragBoundaries.current = {
      min: -maxMove,
      max: maxMove,
    }
  }, [])
  // Run this on drag

  const onDrag = React.useCallback((dragState) => {
    const { last, movement, event } = dragState
    event.preventDefault()
    // keep within bounds
    const [x] = movement
    const xClamped = clamp(x, dragBoundaries.current.min, dragBoundaries.current.max)
    // HANDLE RELEASE...
    if (last) {
      const movementThreshold = 0.35
      const movementPercent = xClamped / dragBoundaries.current.max
      // Not moved enough to either side, set to default
      if (Math.abs(movementPercent) < movementThreshold) {
        setButtonState('default')
        return
      }
      // Moved to the left, set to off
      if (movementPercent < 0) {
        setButtonState('off')
        return
      }
      // Moved to the right, set to on
      setButtonState('on')
      return
    }
    // Move switch
    cssSetter.current(xClamped)
  }, [])
  // Drag binder
  const dragBind = useDrag(state => onDrag(state), {
    axis: 'x',
    domTarget: switchEl.current,
    eventOptions: { passive: false },
  })

  return (
    <div
      className={[styles.PostToggle, getStateClass(buttonState)].join(' ')}
      ref={containerEl}
      style={{
        border: `2px solid ${borderColor}`,
      }}
    >
      {/* Background */}
      <div className={styles.background} />
      {/* Buttons */}
      <TOGGLE_BUTTON action="off" buttonState={buttonState} setButtonState={setButtonState} />
      <TOGGLE_BUTTON action="on" buttonState={buttonState} setButtonState={setButtonState} />
      {/* Switch slider */}
      <div className={styles.switch} {...dragBind()} ref={switchEl} />
    </div>
  )
}

PostToggle.propTypes = {
  post: PropTypes.object.isRequired,
  promotionEnabled: PropTypes.bool.isRequired,
  togglePromotion: PropTypes.func.isRequired,
}

export default PostToggle
