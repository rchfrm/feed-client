import React from 'react'
import { useDrag } from 'react-use-gesture'
import { gsap } from 'gsap'


/**
 * @param {String} movingTargetId the ID of the node
 * @param {String} touchTargetId the ID of the node
 * @param {Function} hide run this to hide the element
 * @param {Function} reset run this to reset
 * @param {Boolean} disableCondition ignore touch events if true
 * @returns {Object}
 */
const useSwipeDismiss = ({
  movingTargetId,
  touchTargetId,
  hide,
  reset,
  disableCondition,
}) => {
  const dragConfig = React.useRef({})
  const cssSetter = React.useRef()
  const touchTarget = React.useRef()
  const movingTarget = React.useRef()
  const dragAnimation = React.useRef()
  React.useEffect(() => {
    movingTarget.current = document.getElementById(movingTargetId)
    touchTarget.current = document.getElementById(touchTargetId)
    cssSetter.current = gsap.quickSetter(movingTarget.current, 'x', 'px')
    dragConfig.current = {
      axis: 'x',
      domTarget: movingTarget.current,
    }
  }, [movingTargetId, touchTargetId])
  const animateDragEnd = (dismiss) => {
    if (dismiss) return hide()
    dragAnimation.current = reset()
  }
  const onDrag = (dragState) => {
    // Don't listen to drag if disable condition is true
    if (disableCondition) return
    const { current: target } = movingTarget
    const { current: setter } = cssSetter
    const { movement, last, velocity } = dragState
    const [x] = movement
    if (last) {
      const { width: panelWidth } = target.getBoundingClientRect()
      const velocityThreshold = 0.8
      const movementThreshold = 0.6
      const hidePanel = velocity > velocityThreshold || x / panelWidth > movementThreshold
      animateDragEnd(hidePanel)
      return
    }
    if (x < 0) return
    // Move panel
    setter(x)
  }

  return useDrag((state) => onDrag(state), dragConfig.current)
}

export default useSwipeDismiss
