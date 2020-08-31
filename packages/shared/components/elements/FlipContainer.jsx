import React from 'react'
import PropTypes from 'prop-types'

import { Transition } from 'react-transition-group'

const FlipContainer = ({
  frontContent,
  backContent,
  isFlipped,
  rotationAxis,
  transitionDuration,
  containerClass,
  innerClass,
  frontClass,
  backClass,
  frontStyle,
  backStyle,
  elType,
}) => {
  const rotation = isFlipped ? 180 : 0
  const faceStyle = {
    backfaceVisibility: 'hidden',
  }
  const Container = elType

  const defaultStyle = {
    transition: `transform ${transitionDuration}ms ease`,
    transform: `rotate${rotationAxis}(${0}deg)`,
  }

  const transitionStyles = {
    entering: { transform: `rotate${rotationAxis}(${180}deg)` },
    entered: { transform: `rotate${rotationAxis}(${180}deg)` },
    exiting: { transform: `rotate${rotationAxis}(${0}deg)` },
    exited: { transform: `rotate${rotationAxis}(${0}deg)` },
  }

  return (
    <Container
      className={containerClass}
      style={{
        perspective: '1000px',
      }}
    >
      {/* INNER */}
      <Transition in={isFlipped} timeout={transitionDuration}>
        {state => (
          <div
            className={[
              'relative',
              innerClass,
            ].join(' ')}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
              transformStyle: 'preserve-3d',
            }}
          >
            {/* FRONT */}
            <div
              className={[
                'absolute top-0 left-0 w-full h-full',
                frontClass,
              ].join(' ')}
              style={{ ...faceStyle, ...frontStyle }}
            >
              {frontContent}
            </div>
            {/* BACK */}
            <div
              className={[
                'absolute top-0 left-0 w-full h-full',
                backClass,
              ].join(' ')}
              style={{
                ...faceStyle,
                ...backStyle,
                transform: `rotate${rotationAxis}(180deg)`,
              }}
            >
              {backContent}
            </div>
          </div>
        )}
      </Transition>
    </Container>
  )
}

FlipContainer.propTypes = {
  frontContent: PropTypes.node.isRequired,
  backContent: PropTypes.node.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  rotationAxis: PropTypes.oneOf(['Y', 'X']),
  transitionDuration: PropTypes.number,
  containerClass: PropTypes.string,
  innerClass: PropTypes.string,
  frontClass: PropTypes.string,
  backClass: PropTypes.string,
  elType: PropTypes.string,
}

FlipContainer.defaultProps = {
  rotationAxis: 'Y',
  transitionDuration: 400,
  containerClass: null,
  innerClass: null,
  frontClass: null,
  backClass: null,
  elType: 'div',
}


export default FlipContainer
