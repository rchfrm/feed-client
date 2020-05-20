import React from 'react'
import { Transition } from 'react-transition-group'
import { gsap, Power1 } from 'gsap'

import PropTypes from 'prop-types'

const FadeInOut = ({
  children,
  show,
  keyString,
  unmountOnExit,
  onEnter,
  onExit,
  onEntered,
  onExited,
  addEndListener,
  // animation props
  durationIn,
  durationOut,
  ease,
}) => {
  const animationInstance = React.useRef(null)
  const toggleAnimation = (state, target) => {
    const opacity = state ? 1 : 0
    const duration = state ? durationIn : durationOut
    animationInstance.current = gsap.to(target, { opacity, duration, ease })
    if (state) {
      onEnter(state, target)
    } else {
      onExit(state, target)
    }
  }
  const onAnimationFinished = async (done) => {
    await animationInstance.current.then()
    done()
    addEndListener()
  }

  return (
    <Transition
      in={show}
      key={keyString}
      onEnter={(target) => toggleAnimation(true, target)}
      onExit={(target) => toggleAnimation(false, target)}
      onEntered={onEntered}
      onExited={onExited}
      addEndListener={(node, done) => {
        onAnimationFinished(done)
      }}
      unmountOnExit={unmountOnExit}
      appear
    >
      {children}
    </Transition>
  )
}

FadeInOut.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  keyString: PropTypes.string,
  unmountOnExit: PropTypes.bool,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  onEntered: PropTypes.func,
  onExited: PropTypes.func,
  addEndListener: PropTypes.func,
  durationIn: PropTypes.number,
  durationOut: PropTypes.number,
  ease: PropTypes.func,
}

FadeInOut.defaultProps = {
  keyString: '',
  unmountOnExit: false,
  onEnter: () => {},
  onExit: () => {},
  onEntered: () => {},
  onExited: () => {},
  addEndListener: () => {},
  durationIn: 0.3,
  durationOut: 0.5,
  ease: Power1.easeOut,
}


export default FadeInOut
