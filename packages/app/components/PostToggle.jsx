import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power1 } from 'gsap'
import clamp from 'lodash/clamp'
import { useDrag } from 'react-use-gesture'
import { useAsync } from 'react-async'

import * as server from '@/app/helpers/appServer'
import brandColors from '@/constants/brandColors'

import { ArtistContext } from '@/contexts/ArtistContext'
import Spinner from '@/elements/Spinner'
import PostToggleSwitch from '@/app/PostToggleSwitch'

import styles from '@/app/PostToggle.module.css'

// SERVER
const updatePost = async ({ artistId, postId, promotionEnabled }) => {
  return server.togglePromotionEnabled(artistId, postId, promotionEnabled)
}

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

const getButtonState = (promotableStatus) => {
  if (promotableStatus === -2) return 'off'
  if (promotableStatus === 2) return 'on'
  return 'default'
}

const getPromotionStatus = (buttonState) => {
  if (buttonState === 'on') return true
  if (buttonState === 'off') return false
  return null
}


const PostToggle = ({
  post,
  promotionEnabled,
  togglePromotion,
}) => {
  const { promotable_status, id: postId } = post
  const [buttonState, setButtonState] = React.useState(getButtonState(promotable_status))
  const [borderColor, setBorderColor] = React.useState(getBorderColor(buttonState, promotionEnabled))
  const switchEl = React.useRef(null)
  const containerEl = React.useRef(null)
  // SERVER
  const { artistId } = React.useContext(ArtistContext)
  const { isPending, cancel } = useAsync({
    promiseFn: updatePost,
    watch: buttonState,
    initialValue: buttonState,
    // The variable(s) to pass to promiseFn
    artistId,
    postId,
    promotionEnabled: getPromotionStatus(buttonState),
    onResolve: (post) => {
      const { promotion_enabled } = post
      togglePromotion(postId, promotion_enabled)
    },
  })
  // Workaround: https://github.com/async-library/react-async/issues/249#issue-554311360
  React.useEffect(() => {
    cancel()
  }, [cancel])
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
    const { last, movement, event, tap } = dragState
    event.preventDefault()
    // Handle tapping
    if (tap) {
      if (buttonState === 'default') return
      setButtonState('default')
      return
    }
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
  }, [buttonState])
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
      <PostToggleSwitch action="off" buttonState={buttonState} setButtonState={setButtonState} />
      <PostToggleSwitch action="on" buttonState={buttonState} setButtonState={setButtonState} />
      {/* Switch slider */}
      <div className={styles.switch} {...dragBind()} ref={switchEl}>
        {isPending && <Spinner className={styles.switchSpinner} />}
      </div>
    </div>
  )
}

PostToggle.propTypes = {
  post: PropTypes.object.isRequired,
  promotionEnabled: PropTypes.bool.isRequired,
  togglePromotion: PropTypes.func.isRequired,
}

export default PostToggle
