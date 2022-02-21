import React from 'react'
import PropTypes from 'prop-types'

// DOCS: https://zillow.github.io/react-slider/
import Nouislider from 'nouislider-react'

import TooltipButton from '@/elements/TooltipButton'
import SliderGhost from '@/elements/SliderGhost'

const Slider = ({
  // Slider config
  startValue, // number, number[] (use array for more than one thumb)
  valueRange, // { min, max }
  formatValue, // object of to/from to format the input/output (https://refreshless.com/nouislider/number-formatting/)
  labelOptions, // array of object to/from to format the input/output (https://refreshless.com/nouislider/slider-options/#section-tooltips)
  step, // see docs
  onChange,
  // Label and tooltip
  label,
  tooltipMessage,
  tooltipDirection,
  // Colors
  trackColor,
  // Classes
  className,
  // Markers
  hasMarkers,
  ghosts,
  // Child nodes
  children,
  // Slider instance setter
  setSliderInstance,
}) => {
  const sliderRef = React.useRef(null)
  const hasGhosts = !!ghosts.length
  const [ghostPositions, setGhostPositions] = React.useState([])
  const ghostsReady = React.useRef(!hasGhosts)

  return (
    <div className={[
      'mb-5',
      trackColor ? `slider-track-color-${trackColor}` : null,
      'border border-solid border-grey-3 rounded-full',
      'p-2',
      className,
    ].join(' ')}
    >
      {/* LABEL */}
      {label && (
        <div className={[
          'inputLabel',
          hasMarkers ? 'mb-12' : 'mb-8',
        ].join(' ')}
        >
          <span className="inputLabel__text">
            {label}
            {/* LABEL TOOLTIP */}
            {tooltipMessage && (
              <TooltipButton copy={tooltipMessage} direction={tooltipDirection} trackLabel={`Slider: ${label}`} />
            )}
          </span>
        </div>
      )}
      {/* SLIDER */}
      <div className={[
        'relative',
        hasMarkers && label ? 'h-18' : null,
      ].join(' ')}
      >
        <Nouislider
          range={valueRange}
          start={startValue}
          step={step}
          format={formatValue}
          tooltips={labelOptions}
          onUpdate={(values, handle, unencoded, isTap, positions) => {
            onChange({ values, handle, unencoded, isTap, positions })
            // Set initial marker position
            if (!ghostsReady.current && hasGhosts) {
              setGhostPositions(positions)
              ghostsReady.current = true
            }
          }}
          instanceRef={instance => {
            if (instance && !sliderRef.current) {
              sliderRef.current = instance
              if (setSliderInstance) setSliderInstance(instance)
            }
          }}
        />
        {ghostPositions.map((pos, index) => {
          return <SliderGhost key={index} markerPositionPercent={pos} />
        })}
        {children}
      </div>
    </div>
  )
}


Slider.propTypes = {
  startValue: PropTypes.array.isRequired,
  valueRange: PropTypes.object.isRequired,
  formatValue: PropTypes.object,
  labelOptions: PropTypes.array.isRequired,
  step: PropTypes.number,
  onChange: PropTypes.func,
  label: PropTypes.string,
  tooltipMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  tooltipDirection: PropTypes.string,
  trackColor: PropTypes.string,
  hasMarkers: PropTypes.bool,
  ghosts: PropTypes.array,
  setSliderInstance: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
}

Slider.defaultProps = {
  formatValue: {
    to: (value) => value,
    from: (value) => value,
  },
  step: 1,
  label: null,
  tooltipMessage: null,
  tooltipDirection: 'top',
  onChange: () => {},
  trackColor: null,
  hasMarkers: false,
  ghosts: [],
  setSliderInstance: null,
  className: null,
  children: null,
}


export default Slider
