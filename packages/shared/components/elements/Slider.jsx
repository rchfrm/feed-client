import React from 'react'
import PropTypes from 'prop-types'

// DOCS: https://zillow.github.io/react-slider/
import ReactSlider from 'react-slider'

import TooltipButton from '@/elements/TooltipButton'


const Slider = ({
  // Slider config
  valueRange, // [lowest, highest]
  defaultValue, // number, number[] (use array for more than one thumb)
  thumbName, // string, string[] (use array for more than one thumb)
  valueLabelFunction, // function to determine label of thumb
  thumbRenderFunction, // function to determin thumb node
  getLabelValue, // function on how to parse the value label
  pearling, // see docs
  step, // see docs
  minDistance, // see docs
  onChange,
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
  // Child nodes
  children,
}) => {
  const [min, max] = valueRange
  // DEFINE DEFAULT FUNCTIONS
  // Default label function
  const defaultValueLabelFunction = (state) => {
    console.log('state', state)
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
        <div className={['h-8 w-8 mx-auto -mt-2 rounded-full bg-green'].join(' ')} />
        {/* Number */}
        <p
          className={['absolute mt-3'].join(' ')}
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

  return (
    <div className={['mb-5', containerClassName].join(' ')}>
      {/* LABEL */}
      {label && (
        <div className={['inputLabel', 'mb-8', labelClassName].join(' ')}>
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
      <div className={['relative h-12'].join(' ')}>
        <ReactSlider
          min={min}
          max={max}
          defaultValue={defaultValue}
          ariaLabel={thumbName}
          ariaValuetext={valueLabelFunction}
          renderThumb={thumbRenderFunction}
          pearling={pearling}
          step={step}
          minDistance={minDistance}
          onChange={onChange}
          className={[sliderClassName].join(' ')}
          thumbClassName={[thumbClassName].join(' ')}
          trackClassName={['h-3 bg-grey-1 rounded-dialogue', trackClassName].join(' ')}
        />
        {children}
      </div>
    </div>
  )
}


Slider.propTypes = {
  valueRange: PropTypes.array.isRequired,
  defaultValue: PropTypes.oneOfType([
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
  trackClassName: PropTypes.string,
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
  label: null,
  tooltipMessage: null,
  tooltipDirection: 'top',
  labelClassName: null,
  containerClassName: null,
  sliderClassName: null,
  thumbClassName: null,
  trackClassName: null,
  children: null,
}


export default Slider
