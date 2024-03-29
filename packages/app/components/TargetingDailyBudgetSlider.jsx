
import React from 'react'
import PropTypes from 'prop-types'

import { SidePanelContext } from '@/contexts/SidePanelContext'

import Slider from '@/elements/Slider'
import SliderMarker from '@/elements/SliderMarker'

import { formatCurrency } from '@/helpers/utils'

const TargetingDailyBudgetSlider = ({
  sliderStep,
  sliderValueRange,
  initialBudget,
  minReccBudget,
  currency,
  currencyOffset,
  onChange,
  mobileVersion,
  setBudgetSlider,
  shouldShowError,
  errorMessage,
}) => {
  // DISABLE SIDEPANEL DRAG
  const containerRef = React.useRef(null)
  const { setDisableDrag } = React.useContext(SidePanelContext)

  React.useEffect(() => {
    if (! mobileVersion) return
    const disableDrag = () => setDisableDrag(true)
    const enableDrag = () => setDisableDrag(false)
    const { current: containerEl } = containerRef
    // disable drag
    containerEl.addEventListener('mousedown', disableDrag, { passive: true })
    containerEl.addEventListener('touchstart', disableDrag, { passive: true })
    // enable drag
    containerEl.addEventListener('mouseup', enableDrag, { passive: true })
    containerEl.addEventListener('touchend', enableDrag, { passive: true })
    return () => {
      containerEl.removeEventListener('mousedown', disableDrag, { passive: true })
      containerEl.removeEventListener('touchstart', disableDrag, { passive: true })
      containerEl.removeEventListener('mouseup', enableDrag, { passive: true })
      containerEl.removeEventListener('touchend', enableDrag, { passive: true })
    }
  // eslint-disable-next-line
  }, [mobileVersion])

  // DEFINE START VALUE
  // If budget is not set, use min recc, else round budget to nearest whole number
  const startingBudget = ! initialBudget ? minReccBudget : Math.round(initialBudget)
  const startValue = React.useRef(startingBudget)
  const initialMarkerPosition = React.useRef(null)

  // DEFINE RANGE
  const valueRange = React.useMemo(() => {
    const [min, max] = sliderValueRange
    const initialBudget = startValue.current
    const budgetDivisibleByStep = ! (initialBudget % sliderStep)
    if (budgetDivisibleByStep || initialBudget <= min) return { min, max }
    // If budget is not divisble by step, use custom range with custom step for budget
    const customSnap = Math.floor(100 * (initialBudget / max))
    const customSnapResetValue = sliderStep * (Math.floor(initialBudget / sliderStep) + 1)
    const customSnapResetPct = Math.ceil(100 * (customSnapResetValue / max))
    return {
      min: [min, sliderStep],
      [`${customSnap}%`]: [initialBudget, max + 1],
      [`${customSnapResetPct}%`]: [customSnapResetValue, sliderStep],
      max: [max, sliderStep],
    }
  }, [sliderValueRange, sliderStep])

  return (
    <div className="relative pl-0 pt-8" ref={containerRef}>
      {shouldShowError && (
        <p className={['absolute -top-4 w-full text-center text-red text-sm'].join(' ')}>{errorMessage}</p>
      )}
      <Slider
        valueRange={valueRange}
        startValue={[startValue.current]}
        step={sliderStep}
        thumbName="Budget"
        onChange={({ values, positions }) => {
          const [value] = values
          const [position] = positions
          // Update budget
          onChange(value)
          // Set initial marker position
          if (initialMarkerPosition.current === null) {
            initialMarkerPosition.current = position
          }
        }}
        forceInitialResize
        hasMarkers
        formatValue={{
          to: (value) => Math.round(value),
          from: (value) => Math.round(value),
        }}
        labelOptions={[
          {
            to: (value) => formatCurrency((value / currencyOffset), currency),
          },
        ]}
        ghosts={startValue.current ? [initialMarkerPosition.current] : []}
        setSliderInstance={setBudgetSlider}
        hasError={shouldShowError}
      >
        {/* Only show marker if min recc is greater than min slider range */}
        {sliderValueRange[0] < minReccBudget && (
          <SliderMarker
            sliderValueRange={sliderValueRange}
            markerValue={minReccBudget}
            markerLabel="Suggested min."
          />
        )}
      </Slider>
    </div>
  )
}

TargetingDailyBudgetSlider.propTypes = {
  sliderStep: PropTypes.number.isRequired,
  sliderValueRange: PropTypes.array.isRequired,
  initialBudget: PropTypes.number,
  minReccBudget: PropTypes.number,
  currency: PropTypes.string,
  currencyOffset: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  mobileVersion: PropTypes.bool,
  setBudgetSlider: PropTypes.func,
  shouldShowError: PropTypes.bool,
  errorMessage: PropTypes.string,
}

TargetingDailyBudgetSlider.defaultProps = {
  initialBudget: 0,
  minReccBudget: 0,
  currency: null,
  currencyOffset: 0,
  mobileVersion: false,
  setBudgetSlider: () => {},
  shouldShowError: false,
  errorMessage: '',
}

export default TargetingDailyBudgetSlider
