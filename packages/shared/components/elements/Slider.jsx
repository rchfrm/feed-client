import React from 'react'
import PropTypes from 'prop-types'

// DOCS: https://zillow.github.io/react-slider/
import ReactSlider from 'react-slider'

import TooltipButton from '@/elements/TooltipButton'

// DEFINE DEFAULT FUNCTIONS
// Default label function
const defaultValueLabelFunction = (state) => {
  return `Thumb value ${state.valueNow}`
}

const defaultThumbRenderFunction = (props, state) => {
  const { className } = props
  const classNameMod = [...className.split(' '), 'slider--thumb'].join(' ')
  return (
    <div {...props} className={classNameMod}>
      {/* Dragger */}
      <div className={['h-8 w-8 -mt-3 rounded-full bg-green'].join(' ')} />
      {/* Number */}
      <p className="text-center pt-2">{state.valueNow}</p>
    </div>
  )
}

const Slider = ({
  // Slider config
  valueRange, // [lowest, highest]
  defaultValue, // number, number[] (use array for more than one thumb)
  thumbNames, // string, string[] (use array for more than one thumb)
  valueLabelFunction, // function to determine label of thumb
  thumbRenderFunction, // functino to determin thumb node
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
  return (
    <div>
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
      <div className={['relative', containerClassName].join(' ')}>
        <ReactSlider
          min={min}
          max={max}
          defaultValue={defaultValue}
          ariaLabel={thumbNames}
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
  thumbNames: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  valueLabelFunction: PropTypes.func,
  thumbRenderFunction: PropTypes.func,
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
  valueLabelFunction: defaultValueLabelFunction,
  thumbRenderFunction: defaultThumbRenderFunction,
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
