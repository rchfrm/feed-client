import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power1 } from 'gsap'
import clamp from 'lodash/clamp'
import { useDrag } from 'react-use-gesture'

import Spinner from '@/elements/Spinner'

import ToggleSwitchClicker from '@/elements/ToggleSwitchClicker'

import styles from '@/elements/ToggleSwitch.module.css'

// Convert boolean state to string
const getButtonState = (isOn) => {
  if (isOn) return 'on'
  return 'off'
}

const ToggleSwitch = ({
  isOn,
  onStateChange,
  isLoading,
  disabled,
  className,
  style,
}) => {
  const [buttonState, setButtonState] = React.useState(getButtonState(isOn))
  // Elements
  const switchEl = React.useRef(null)
  const containerEl = React.useRef(null)

  // * ANIMATING
  // -----------
  const containerWidth = React.useRef(0)
  const switchWidth = React.useRef(0)
  // Setup GSP setter
  const cssSetter = React.useRef(null)
  const dragBoundaries = React.useRef({})
  // Setup sizes on mount
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
  const animateSwitch = React.useCallback((forceState) => {
    const newState = forceState || buttonState
    const { current: switchCircle } = switchEl
    const maxMove = ((containerWidth.current - switchWidth.current) / 2) - 5
    const xDirection = newState === 'on' ? 1 : newState === 'off' ? -1 : 0
    const x = maxMove * xDirection
    const duration = 0.2
    gsap.to(switchCircle, { x, duration, ease: Power1.easeOut })
  }, [buttonState])

  // * DRAGGING
  // ----------
  // SETUP DRAG
  const handleTap = React.useCallback(() => {
    if (buttonState === 'default') return
    // Handle Tapping
    const newState = buttonState === 'on' ? 'off' : 'on'
    setButtonState(newState)
    onStateChange()
  }, [onStateChange, buttonState])
  // Run this on drag
  const onDrag = React.useCallback((dragState) => {
    // DISABLED
    if (disabled) return
    const { last, movement, event, tap } = dragState
    event.preventDefault()
    // Handle tapping
    if (tap) return handleTap()
    // keep within bounds
    const [x] = movement
    const xClamped = clamp(x, dragBoundaries.current.min, dragBoundaries.current.max)
    // HANDLE RELEASE...
    if (last) {
      const movementThreshold = 0.2
      const movementPercent = xClamped / dragBoundaries.current.max
      // Not moved enough to either side, set to default
      if (Math.abs(movementPercent) < movementThreshold) {
        // Snap back
        animateSwitch()
        return
      }
      // Moved to the left, set to off, move right set on
      const newState = movementPercent < 0 ? 'off' : 'on'
      // Animate
      animateSwitch(newState)
      // Toggle promotion status
      setButtonState(newState)
      onStateChange()
      return
    }
    // Move switch
    cssSetter.current(xClamped)
  }, [onStateChange, handleTap, animateSwitch, disabled])
  // Drag binder
  const dragBind = useDrag(state => onDrag(state), {
    axis: 'x',
    domTarget: switchEl.current,
    eventOptions: { passive: false },
  })

  return (
    <div
      className={[
        styles.ToggleSwitch,
        buttonState === 'on' ? styles.on : buttonState === 'off' ? styles.off : styles.default,
        disabled ? styles._disabled : null,
        className,
      ].join(' ')}
      ref={containerEl}
      style={style}
    >
      {/* Background */}
      <div className={styles.background} />
      {/* Buttons */}
      {!disabled && (
        <>
          <ToggleSwitchClicker
            action="off"
            buttonState={buttonState}
            setButtonState={setButtonState}
            onStateChange={onStateChange}
          />
          <ToggleSwitchClicker
            action="on"
            buttonState={buttonState}
            setButtonState={setButtonState}
            onStateChange={onStateChange}
          />
        </>
      )}
      {/* Switch slider */}
      <div className={styles.switch} {...dragBind()} ref={switchEl}>
        {isLoading && <Spinner className={styles.switchSpinner} />}
      </div>
    </div>
  )
}

ToggleSwitch.propTypes = {
  isOn: PropTypes.bool.isRequired,
  onStateChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

ToggleSwitch.defaultProps = {
  isLoading: false,
  disabled: false,
  className: null,
  style: null,
}

export default ToggleSwitch
