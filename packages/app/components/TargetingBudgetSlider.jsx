
import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/contexts/ArtistContext'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import Slider from '@/elements/Slider'
import SliderMarker from '@/elements/SliderMarker'

import { formatCurrency } from '@/helpers/utils'
import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const TargetingBudgetSlider = ({ budget, minBudget, onChange, mobileVersion }) => {
  const { artistCurrency } = React.useContext(ArtistContext)

  const maxBudget = 30
  const valueRange = [minBudget, maxBudget]

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
  const [currentBudget, setCurrentBudget] = React.useState(budget)
  const budgetUpgrade = React.useMemo(() => {
    return targetingHelpers.getNextBudgetUpgrade(currentBudget)
  }, [currentBudget])

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
    <div className={['pl-2'].join(' ')} ref={containerRef}>
      <Slider
        label="Budget"
        labelClassName="-ml-2"
        valueRange={valueRange}
        value={budget}
        thumbName="Budget"
        getLabelValue={getLabelValue}
        valueLabelFunction={valueLabelFunction}
        onChange={(state) => {
          setCurrentBudget(state)
          onChange(state)
        }}
      >
        {budgetUpgrade && (
          <SliderMarker
            show={!!budgetUpgrade}
            sliderValueRange={valueRange}
            markerValue={budgetUpgrade.budgetLimit}
            markerLabel={budgetUpgrade.featureName}
          />
        )}

      </Slider>
    </div>
  )
}

TargetingBudgetSlider.propTypes = {
  budget: PropTypes.number,
  minBudget: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  mobileVersion: PropTypes.bool,
}

TargetingBudgetSlider.defaultProps = {
  budget: 2,
  minBudget: 2,
  mobileVersion: false,
}


export default TargetingBudgetSlider
