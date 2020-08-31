import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import FlipContainer from '@/elements/FlipContainer'
import Input from '@/elements/Input'

import { ArtistContext } from '@/contexts/ArtistContext'

import { formatCurrency } from '@/helpers/utils'

const CboBudgetSetter = ({
  cboState,
  setCboState,
  minBudget,
  useCustomBudget,
}) => {
  const { artistCurrency } = React.useContext(ArtistContext)

  // FLIP
  const [showCustomBudget, setShowCustomBudget] = React.useState(useCustomBudget)

  // UPDATE CBO STATE when BUDGET changes
  const [budget, setBudget] = React.useState('')
  React.useEffect(() => {
    if (typeof budget !== 'number') return
    setCboState((cboState) => {
      return produce(cboState, draftState => {
        draftState.budget = budget
      })
    })
  }, [budget, setCboState])
  // React.useEffect(() => {
  //   const newState = { ...cboState, budget }
  //   setCboState(newState)
  // }, [budget, cboState, setCboState])
  const placeholder = `Minimum Budget ${formatCurrency(minBudget, artistCurrency)}`
  return (
    <div>
      {/* VIEW CONTAINER */}
      <FlipContainer
        isFlipped={showCustomBudget}
        rotationAxis="X"
        containerClass="h-20"
        // BUDGET SLIDER
        frontContent={(
          <div className="h-20 w-full bg-grey-1">Budget slider</div>
        )}
        // BUDGET CUSTOM INPUT
        backContent={(
          <Input
            value={budget}
            updateValue={setBudget}
            placeholder={placeholder}
            name="Budget"
            label="Custom Budget"
            type="number"
            className="w-full"
          />
        )}
      />
      {/* TOGGLE CUSTOM BUDGET */}
      <p className="pt-8 text-right">
        <a role="button" onClick={() => setShowCustomBudget(!showCustomBudget)}>
          <em>
            {showCustomBudget ? 'Cancel' : 'Custom Budget'}
          </em>
        </a>
      </p>
    </div>
  )
}

CboBudgetSetter.propTypes = {
  cboState: PropTypes.object.isRequired,
  setCboState: PropTypes.func.isRequired,
  minBudget: PropTypes.number,
  useCustomBudget: PropTypes.bool,
}

CboBudgetSetter.defaultProps = {
  minBudget: 3,
  useCustomBudget: false,
}


export default CboBudgetSetter
