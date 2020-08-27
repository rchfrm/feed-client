
import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/contexts/ArtistContext'

import Slider from '@/elements/Slider'

import { formatCurrency } from '@/helpers/utils'

const CboBudgetSlider = ({ budget, minBudget, onChange }) => {
  const { artistCurrency } = React.useContext(ArtistContext)

  const maxBudget = 30

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


  return (
    <Slider
      label="Budget"
      valueRange={[minBudget, maxBudget]}
      defaultValue={budget}
      thumbName="Budget"
      getLabelValue={getLabelValue}
      valueLabelFunction={valueLabelFunction}
      onChange={onChange}
    />
  )
}

CboBudgetSlider.propTypes = {
  budget: PropTypes.number,
  minBudget: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}

CboBudgetSlider.defaultProps = {
  budget: 2,
  minBudget: 2,
}


export default CboBudgetSlider
