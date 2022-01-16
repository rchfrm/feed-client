import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power1 } from 'gsap'
import clamp from 'lodash/clamp'
import { useDrag } from 'react-use-gesture'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import Spinner from '@/elements/Spinner'

import ToggleSwitchClicker from '@/elements/ToggleSwitchClicker'

import styles from '@/elements/ToggleSwitch.module.css'

const ToggleSwitch = ({
  state,
  onChange,
  isLoading,
  disabled,
  className,
  style,
}) => {
  // Elements
  const switchEl = React.useRef(null)
  const containerEl = React.useRef(null)
  const [containerElWidth, setContainerElWidth] = React.useState(0)
  const [switchElWidth, setSwitchElWidth] = React.useState(0)
  const { sidePanelOpen } = React.useContext(SidePanelContext)

  // * ANIMATING
  // -----------
  // Setup GSP setter
  const cssSetter = React.useRef(null)
  const dragBoundaries = React.useRef({})

  // Use updated dimensions from observer entries to avoid miscalculations due to the side-panel animation
  const handleResize = (entries, observer) => {
    const { width: containerWidth } = entries[0]?.contentRect
    const { width: switchWidth } = entries[1]?.contentRect
    setContainerElWidth(containerWidth)
    setSwitchElWidth(switchWidth)

    cssSetter.current = gsap.quickSetter(switchEl.current, 'x', 'px')
    const maxMove = ((containerWidth - switchWidth) / 2) - 5
    dragBoundaries.current = {
      min: -maxMove,
      max: maxMove,
    }
    observer.disconnect()
  }

  React.useEffect(() => {
    const observer = new ResizeObserver(handleResize)

    // If the ToggleSwitch component is inside a side-panel start observing container and switch element dimension changes
    if (sidePanelOpen) {
      if (containerEl.current && switchEl.current) {
        [containerEl.current, switchEl.current].forEach((refElement) => {
          observer.observe(refElement)
        })
      }
    // Otherwise use the dimensions provided by the refs
    } else {
      setContainerElWidth(containerEl.current.offsetWidth)
      setSwitchElWidth(switchEl.current.offsetWidth)
    }

    return () => {
      observer.disconnect()
    }
  }, [sidePanelOpen])

  const animateSwitch = React.useCallback((forceState) => {
    if (!containerElWidth || !switchElWidth) return

    const newState = typeof forceState === 'boolean' ? forceState : !state
    const { current: switchCircle } = switchEl
    const maxMove = ((containerElWidth - switchElWidth) / 2) - 5
    const xDirection = newState ? 1 : -1
    const x = maxMove * xDirection
    const duration = 0.2
    gsap.to(switchCircle, { x, duration, ease: Power1.easeOut })
  }, [state, containerElWidth, switchElWidth])

  // * DRAGGING
  // ----------

  // Handle Tapping
  const handleTap = React.useCallback(() => {
    const newState = !state
    onChange(newState)
  }, [state, onChange])

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
      // Moved to the left, set to false, move right set true
      const newState = movementPercent > 0
      // Animate
      animateSwitch(newState)
      onChange(newState)
      return
    }
    // Move switch
    cssSetter.current(xClamped)
  }, [onChange, handleTap, animateSwitch, disabled])
  // Drag binder
  const dragBind = useDrag(state => onDrag(state), {
    axis: 'x',
    domTarget: switchEl.current,
    eventOptions: { passive: false },
  })

  // * HANDLE SPINNER
  // ----------------

  const [showSpinner, setShowSpinner] = React.useState(false)
  const spinnerTimeout = React.useRef()
  React.useEffect(() => {
    if (!isLoading) {
      clearTimeout(spinnerTimeout.current)
      setShowSpinner(false)
      return
    }
    spinnerTimeout.current = setTimeout(() => {
      setShowSpinner(true)
    }, 600)
  }, [isLoading])

  // WHEN BUTTON STATE CHANGES
  React.useEffect(() => {
    animateSwitch(state)
  }, [state, animateSwitch])

  return (
    <div
      className={[
        styles.ToggleSwitch,
        state ? styles.on : styles.off,
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
            onChange={onChange}
          />
          <ToggleSwitchClicker
            action="on"
            onChange={onChange}
          />
        </>
      )}
      {/* Switch slider */}
      <div className={styles.switch} {...dragBind()} ref={switchEl}>
        {showSpinner && <Spinner className={styles.switchSpinner} />}
      </div>
    </div>
  )
}

ToggleSwitch.propTypes = {
  state: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
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
