import React from 'react'
import PropTypes from 'prop-types'

// DOCS: https://zillow.github.io/react-slider/
import ReactSlider from 'react-slider'

// DEFINE DEFAULT FUNCTIONS
// Default label function
const defaultValueLabelFunction = (state) => {
  return `Thumb value ${state.valueNow}`
}

const defaultThumbRenderFunction = (props, state) => {
  return <div {...props}>{state.valueNow}</div>
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
  // Classes
  containerClassName,
  sliderClassName,
  thumbClassName,
  trackClassName,
  // Child nodes
  children,
}) => {
  const [min, max] = valueRange
  return (
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
        trackClassName={[trackClassName].join(' ')}
      />
      {children}
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
  containerClassName: null,
  sliderClassName: null,
  thumbClassName: null,
  trackClassName: null,
  children: null,
}


export default Slider
