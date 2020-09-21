
import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/contexts/ArtistContext'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import Slider from '@/elements/Slider'
import SliderMarker from '@/elements/SliderMarker'
import SliderGhost from '@/elements/SliderGhost'

import { formatCurrency } from '@/helpers/utils'

const TargetingBudgetSlider = ({
  sliderStep,
  sliderValueRange,
  budget,
  minReccBudget,
  initialBudget,
  onChange,
  mobileVersion,
  isSummaryVersion,
}) => {
  const { artistCurrency } = React.useContext(ArtistContext)

  const getLabel = (budget) => {
    return formatCurrency(budget, artistCurrency)
  }

  const getLabelValue = React.useCallback((value) => {
    return getLabel(value)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Aria label function
  const valueLabelFunction = React.useCallback((state) => {
    const { value } = state
    return `Budget set to ${getLabel(value)}}`
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  return (
    <div className={['pl-0'].join(' ')} ref={containerRef}>
      <Slider
        step={sliderStep}
        valueRange={sliderValueRange}
        value={budget}
        thumbName="Budget"
        getLabelValue={getLabelValue}
        valueLabelFunction={valueLabelFunction}
        onChange={(state) => {
          onChange(state)
        }}
        forceInitialResize
        hasMarkers
        trackColorClass={!mobileVersion && isSummaryVersion ? 'bg-white' : 'bg-grey-1'}
      >
        <SliderMarker
          sliderValueRange={sliderValueRange}
          markerValue={minReccBudget}
          markerLabel="Reccomended"
          hideText={budget >= minReccBudget}
        />
        <SliderGhost
          sliderValueRange={sliderValueRange}
          markerValue={initialBudget}
        />
      </Slider>
    </div>
  )
}

TargetingBudgetSlider.propTypes = {
  sliderStep: PropTypes.number.isRequired,
  sliderValueRange: PropTypes.array.isRequired,
  budget: PropTypes.number,
  minReccBudget: PropTypes.number,
  initialBudget: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  mobileVersion: PropTypes.bool,
}

TargetingBudgetSlider.defaultProps = {
  budget: 0,
  minReccBudget: 0,
  initialBudget: 0,
  mobileVersion: false,
}


export default TargetingBudgetSlider
