import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import Input from '@/elements/Input'

import { ArtistContext } from '@/contexts/ArtistContext'

import { formatCurrency } from '@/helpers/utils'

const CboBudgetSetter = ({
  cboState,
  setCboState,
  minBudget,
}) => {
  const { artistCurrency } = React.useContext(ArtistContext)
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
      <Input
        value={budget}
        updateValue={setBudget}
        placeholder={placeholder}
        name="Budget"
        label="Custom Budget"
        type="number"
        className="w-full"
      />
    </div>
  )
}

CboBudgetSetter.propTypes = {
  cboState: PropTypes.object.isRequired,
  setCboState: PropTypes.func.isRequired,
  minBudget: PropTypes.number,
}

CboBudgetSetter.defaultProps = {
  minBudget: 3,
}


export default CboBudgetSetter
