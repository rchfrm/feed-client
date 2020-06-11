import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power1 } from 'gsap'
import { useDrag } from 'react-use-gesture'

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
  const switchEl = React.useRef(null)
  const containerEl = React.useRef(null)
  // WHEN BUTTON STATE CHANGES
  React.useEffect(() => {
    const { current: target } = switchEl
    animateSwitch(target, buttonState)
  }, [buttonState])
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
    const { current: container } = containerEl
    const { first, last, movement, velocity } = dragState
    const [x] = movement
    if (last) {
      return
    }
    console.log('x', x)
    console.log('containerWidth.current - switchWidth.current', containerWidth.current - switchWidth.current)
    // Keep within bounds...
    if (x < dragBoundaries.current.min || x > dragBoundaries.current.max) return
    // Move switch
    cssSetter.current(x)
  }, [])
  // Drag binder
  const dragBind = useDrag(state => onDrag(state), {
    axis: 'x',
    domTarget: switchEl.current,
  })

  return (
    <div
      className={[styles.PostToggle, getStateClass(buttonState)].join(' ')}
      ref={containerEl}
      style={{
        border: `2px solid ${getBorderColor(promotionEnabled)}`,
      }}
    >
      <div className={styles.background} />
      {/* Buttons */}
      <TOGGLE_BUTTON action="off" buttonState={buttonState} setButtonState={setButtonState} />
      <TOGGLE_BUTTON action="on" buttonState={buttonState} setButtonState={setButtonState} />
      <div className={styles.switch} {...dragBind()} ref={switchEl} />
    </div>
  )
}

PostToggleNew.propTypes = {
  post: PropTypes.object.isRequired,
  promotionEnabled: PropTypes.bool.isRequired,
  togglePromotion: PropTypes.func.isRequired,
}

export default PostToggleNew
