import React from 'react'
import PropTypes from 'prop-types'

// DOCS: https://zillow.github.io/react-slider/
import Nouislider from "nouislider-react"

import SliderDragger from '@/elements/SliderDragger'
import TooltipButton from '@/elements/TooltipButton'


const Slider = ({
  // Slider config
  valueRange, // [lowest, highest]
  value, // number, number[] (use array for more than one thumb)
  thumbName, // string, string[] (use array for more than one thumb)
  valueLabelFunction, // function to determine label of thumb
  thumbRenderFunction, // function to determin thumb node
  getLabelValue, // function on how to parse the value label
  pearling, // see docs
  step, // see docs
  minDistance, // see docs
  onChange,
  onBeforeChange,
  onAfterChange,
  // Label and tooltip
  label,
  tooltipMessage,
  tooltipDirection,
  // Classes
  labelClassName,
  containerClassName,
  sliderClassName,
  thumbClassName,
  trackClassName,
  trackColorClass,
  hasMarkers,
  // hackfix
  forceInitialResize,
  // Child nodes
  children,
}) => {
  const [min, max] = valueRange
  // DEFINE DEFAULT FUNCTIONS
  // Default label function
  const defaultValueLabelFunction = (state) => {
    const valueLabel = getLabelValue(state.valueNow)
    return `Thumb value ${valueLabel}`
  }

  const defaultThumbRenderFunction = (props, state) => {
    const { className } = props
    const classNameMod = [
      ...className.split(' '),
      'relative',
      'slider--thumb',
    ].join(' ')
    const valueLabel = getLabelValue(state.valueNow)
    return (
      <div {...props} className={classNameMod}>
        {/* Dragger */}
        <SliderDragger />
        {/* Number */}
        <p
          className={['absolute mt-2 text-sm xs:text-base'].join(' ')}
          style={{ right: '50%', transform: 'translateX(50%)' }}
        >
          {valueLabel}
        </p>
      </div>
    )
  }
  // USE DEFAULT RENDER FUNCTIONS IF NEEDED
  valueLabelFunction = valueLabelFunction || defaultValueLabelFunction
  thumbRenderFunction = thumbRenderFunction || defaultThumbRenderFunction

  // FORCE REPAINT if mounting in akward situations
  const sliderRef = React.useRef()
  React.useEffect(() => {
    if (!forceInitialResize) return
    console.log('force resize')
  }, [forceInitialResize])

  return (
    <div className={['mb-5', containerClassName].join(' ')}>
      {/* LABEL */}
      {label && (
        <div className={[
          'inputLabel',
          hasMarkers ? 'mb-12' : 'mb-8',
          labelClassName,
        ].join(' ')}
        >
          <span className="inputLabel__text">
            {label}
            {/* LABEL TOOLTIP */}
            {tooltipMessage && (
            <TooltipButton copy={tooltipMessage} direction={tooltipDirection} />
            )}
          </span>
        </div>
      )}
      {/* SLIDER */}
      <div className={[
        'relative',
        hasMarkers && label ? 'h-18' : null,
        hasMarkers && !label ? 'pt-10' : null,
      ].join(' ')}
      >
        <Nouislider
          range={{
            min,
            max,
          }}
          start={value}
          step={step}
          className={[sliderClassName].join(' ')}
          thumbClassName={[thumbClassName].join(' ')}
          trackClassName={['h-2 rounded-dialogue', trackClassName, trackColorClass].join(' ')}
          onUpdate={(e) => {
            console.log('e', e)
          }}
          instanceRef={instance => {
            if (instance && !sliderRef.current) {
              sliderRef.current = instance
            }
          }}
        />
        {children}
      </div>
    </div>
  )
}


Slider.propTypes = {
  valueRange: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
  ]).isRequired,
  thumbName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  valueLabelFunction: PropTypes.func,
  thumbRenderFunction: PropTypes.func,
  getLabelValue: PropTypes.func,
  pearling: PropTypes.bool,
  step: PropTypes.number,
  minDistance: PropTypes.number,
  onChange: PropTypes.func,
  onBeforeChange: PropTypes.func,
  onAfterChange: PropTypes.func,
  label: PropTypes.string,
  tooltipMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  tooltipDirection: PropTypes.string,
  labelClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  sliderClassName: PropTypes.string,
  thumbClassName: PropTypes.string,
  trackColorClass: PropTypes.string,
  trackClassName: PropTypes.string,
  hasMarkers: PropTypes.bool,
  forceInitialResize: PropTypes.bool,
  children: PropTypes.node,
}

Slider.defaultProps = {
  valueLabelFunction: null,
  thumbRenderFunction: null,
  getLabelValue: (value) => value,
  pearling: false,
  step: 1,
  minDistance: 1,
  onChange: () => {},
  onBeforeChange: () => {},
  onAfterChange: () => {},
  label: null,
  tooltipMessage: null,
  tooltipDirection: 'top',
  labelClassName: null,
  containerClassName: null,
  sliderClassName: null,
  thumbClassName: null,
  trackClassName: null,
  trackColorClass: 'bg-grey-1',
  hasMarkers: false,
  forceInitialResize: false,
  children: null,
}


export default Slider
