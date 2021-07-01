
import React from 'react'
import PropTypes from 'prop-types'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import Slider from '@/elements/Slider'
import SliderMarker from '@/elements/SliderMarker'

import { formatCurrency } from '@/helpers/utils'

const TargetingBudgetSlider = ({
  sliderStep,
  sliderValueRange,
  initialBudget,
  minReccBudget,
  currency,
  currencyOffset,
  onChange,
  budget,
  mobileVersion,
}) => {
  // SHOW BUDGET FEATURES
  // const budgetUpgrade = React.useMemo(() => {
  //   return targetingHelpers.getNextBudgetUpgrade(budget)
  // }, [budget])

  // DISABLE SIDEPANEL DRAG
  const containerRef = React.useRef(null)
  const { setDisableDrag } = React.useContext(SidePanelContext)
  React.useEffect(() => {
    if (!mobileVersion) return
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
  const startingBudget = !initialBudget ? minReccBudget : Math.round(initialBudget)
  const startValue = React.useRef(startingBudget)
  const initialMarkerPosition = React.useRef(null)
  const [sliderInstance, setSliderInstance] = React.useState(null)

  // DEFINE RANGE
  const valueRange = React.useMemo(() => {
    const [min, max] = sliderValueRange
    const initialBudget = startValue.current
    const budgetDivisibleByStep = !(initialBudget % sliderStep)
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

  React.useEffect(() => {
    if (budget === initialBudget) {
      if (!sliderInstance) return
      sliderInstance.noUiSlider.reset(budget)
    }
  }, [initialBudget, budget, sliderInstance])

  return (
    <div className={['pl-0'].join(' ')} ref={containerRef}>
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
        trackColor={!mobileVersion ? 'white' : null}
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
        setSliderInstance={setSliderInstance}
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

TargetingBudgetSlider.propTypes = {
  sliderStep: PropTypes.number.isRequired,
  sliderValueRange: PropTypes.array.isRequired,
  initialBudget: PropTypes.number,
  minReccBudget: PropTypes.number,
  currency: PropTypes.string,
  currencyOffset: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  budget: PropTypes.number.isRequired,
  mobileVersion: PropTypes.bool,
}

TargetingBudgetSlider.defaultProps = {
  initialBudget: 0,
  minReccBudget: 0,
  currency: null,
  currencyOffset: 0,
  mobileVersion: false,
}


export default TargetingBudgetSlider
