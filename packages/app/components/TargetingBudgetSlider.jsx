
import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/contexts/ArtistContext'

import Slider from '@/elements/Slider'
import SliderMarker from '@/elements/SliderMarker'

import { formatCurrency } from '@/helpers/utils'
import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const TargetingBudgetSlider = ({ budget, minBudget, onChange }) => {
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

  return (
    <div className={['pl-2'].join(' ')}>
      <Slider
        label="Budget"
        labelClassName="-ml-2"
        valueRange={valueRange}
        defaultValue={budget}
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
}

TargetingBudgetSlider.defaultProps = {
  budget: 2,
  minBudget: 2,
}


export default TargetingBudgetSlider
