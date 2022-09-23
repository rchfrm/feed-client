import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Button from '@/elements/Button'
import Input from '@/elements/Input'
import InputCurrency from '@/elements/InputCurrency'

const TargetingBudgetCampaign = ({
  currency,
}) => {
  const [amount, setAmount] = React.useState(0)
  const [startDate, setStartDate] = React.useState(moment().toISOString().split('T')[0])
  const [endDate, setEndDate] = React.useState('')
  const [autoFocus, setAutoFocus] = React.useState(false)
  const [isFormValid, setIsFormValid] = React.useState(false)
  const [showResult, setShowResult] = React.useState(false)

  const handleAmountChange = (value) => {
    setAmount(value)
  }

  const handleDateChange = ({ target }) => {
    const { name, value } = target

    if (name === 'start-date') {
      setStartDate(value)
      setAutoFocus(true)
    }

    if (name === 'end-date') {
      setEndDate(value)
      setAutoFocus(false)
    }
  }

  const save = () => {
    console.log(`Total amount: ${amount}`)
    console.log(`Start date: ${startDate}`)
    console.log(`End date: ${endDate}`)

    const diff = moment(endDate).diff(moment(startDate), 'days') + 1
    console.log(`Amount of days ${diff}`)
    console.log(`Daily budget: ${(amount / diff).toFixed(2)}`)

    setShowResult(true)
  }

  React.useEffect(() => {
    const formValid = !!(amount && startDate && endDate)
    setIsFormValid(formValid)
  }, [amount, startDate, endDate])

  return (
    <div>
      <div className="flex mt-8 -mx-1 mb-8">
        <InputCurrency
          name="amount"
          label="Total budget"
          value={amount}
          handleChange={handleAmountChange}
          className="flex-0 mx-1 mb-0"
          currency={currency}
        />
        <Input
          name="start-date"
          type="date"
          label="Start date"
          value={startDate}
          min={moment().toISOString().split('T')[0]}
          handleChange={handleDateChange}
          className="flex-1 mx-1 mb-0"
        />
        <Input
          name="end-date"
          type="date"
          label="End date"
          value={endDate}
          min={(moment(startDate).add(2, 'days')).toISOString().split('T')[0]}
          autoFocus={autoFocus}
          handleChange={handleDateChange}
          className="flex-1 mx-1 mb-0"
        />
      </div>
      <Button
        version="green small"
        className="h-8 ml-auto rounded-full"
        onClick={save}
        trackComponentName="TargetingBudgetCampaign"
        disabled={!isFormValid}
      >
        Start campaign
      </Button>
      {showResult && (
        <ul>
          <li><strong>Total amount:</strong> {amount} {currency}</li>
          <li><strong>Start date:</strong> {startDate}</li>
          <li><strong>End date:</strong> {endDate}</li>
          <li><strong>Amount of days:</strong> {moment(endDate).diff(moment(startDate), 'days') + 1}</li>
          <li><strong>Daily budget:</strong> {(amount / (moment(endDate).diff(moment(startDate), 'days') + 1)).toFixed(2)}</li>
        </ul>
      )}
    </div>
  )
}

TargetingBudgetCampaign.propTypes = {
  currency: PropTypes.string.isRequired,
}

TargetingBudgetCampaign.defaultProps = {
}

export default TargetingBudgetCampaign
