import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power1 } from 'gsap'
import clamp from 'lodash/clamp'
import { useDrag } from 'react-use-gesture'
import { useAsync } from 'react-async'

import * as postsHelpers from '@/app/helpers/postsHelpers'
import brandColors from '@/constants/brandColors'

import { ArtistContext } from '@/contexts/ArtistContext'
import Spinner from '@/elements/Spinner'
import PostToggleSwitch from '@/app/PostToggleSwitch'

import styles from '@/app/PostToggle.module.css'

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

const getButtonState = (promotableStatus) => {
  // Handle double toggle
  if (promotableStatus > 0) return 'on'
  if (promotableStatus <= 0) return 'off'
}

const getPromotionStatus = (buttonState) => {
  if (buttonState === 'on') return true
  if (buttonState === 'off') return false
  return null
}


const PostToggle = ({
  post,
  promotionEnabled,
  promotableStatus,
  togglePromotion,
}) => {
  const { id: postId } = post
  const [buttonState, setButtonState] = React.useState(getButtonState(promotableStatus))
  const [borderColor, setBorderColor] = React.useState(getBorderColor(buttonState, promotionEnabled))
  const switchEl = React.useRef(null)
  const containerEl = React.useRef(null)

  // SERVER
  const { artistId } = React.useContext(ArtistContext)
  const { isPending, cancel } = useAsync({
    promiseFn: postsHelpers.updatePost,
    watch: buttonState,
    initialValue: buttonState,
    // The variable(s) to pass to promiseFn
    artistId,
    postId,
    promotionEnabled: getPromotionStatus(buttonState),
    onResolve: (post) => {
      const { promotion_enabled, promotable_status } = post
      // Update post list state
      togglePromotion(postId, promotion_enabled, promotable_status)
    },
  })
  // initialValue workaround: https://github.com/async-library/react-async/issues/249#issue-554311360
  React.useEffect(() => {
    cancel()
  }, [cancel])

  // ANIMATING
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

  // SHOW SPINNER
  const [showSpinner, setShowSpinner] = React.useState(false)
  const spinnerTimeout = React.useRef()
  React.useEffect(() => {
    if (!isPending) {
      clearTimeout(spinnerTimeout.current)
      setShowSpinner(false)
      return
    }
    spinnerTimeout.current = setTimeout(() => {
      setShowSpinner(true)
    }, 600)
  }, [setShowSpinner, isPending])
  // WHEN BUTTON STATE CHANGES
  React.useEffect(() => {
    setBorderColor(getBorderColor(buttonState, promotionEnabled))
    animateSwitch()
  }, [buttonState, promotionEnabled, animateSwitch])
  // UPDATE BUTTON STATUS BASED ON POST PROPS
  React.useEffect(() => {
    const buttonState = getButtonState(promotableStatus)
    setButtonState(buttonState)
  }, [promotableStatus])

  // SETUP DRAG
  const handleTap = React.useCallback(() => {
    if (buttonState === 'default') return
    // Handle Tapping
    const newState = buttonState === 'on' ? 'off' : 'on'
    setButtonState(newState)
  }, [buttonState])
  // Run this on drag
  const onDrag = React.useCallback((dragState) => {
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
      setButtonState(newState)
      return
    }
    // Move switch
    cssSetter.current(xClamped)
  }, [handleTap, animateSwitch])
  // Drag binder
  const dragBind = useDrag(state => onDrag(state), {
    axis: 'x',
    domTarget: switchEl.current,
    eventOptions: { passive: false },
  })

  return (
    <div
      className={[
        styles.PostToggle,
        buttonState === 'on' ? styles.on : buttonState === 'off' ? styles.off : styles.default,
      ].join(' ')}
      ref={containerEl}
      style={{
        border: `2px solid ${borderColor}`,
      }}
    >
      {/* Background */}
      <div className={styles.background} />
      {/* Buttons */}
      <PostToggleSwitch
        action="off"
        buttonState={buttonState}
        setButtonState={setButtonState}
      />
      <PostToggleSwitch
        action="on"
        buttonState={buttonState}
        setButtonState={setButtonState}
      />
      {/* Switch slider */}
      <div className={styles.switch} {...dragBind()} ref={switchEl}>
        {showSpinner && <Spinner className={styles.switchSpinner} />}
      </div>
    </div>
  )
}

PostToggle.propTypes = {
  post: PropTypes.object.isRequired,
  promotionEnabled: PropTypes.bool.isRequired,
  promotableStatus: PropTypes.number.isRequired,
  togglePromotion: PropTypes.func.isRequired,
}

export default PostToggle
