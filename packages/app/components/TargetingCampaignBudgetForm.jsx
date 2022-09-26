import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Input from '@/elements/Input'
import InputCurrency from '@/elements/InputCurrency'
import Button from '@/elements/Button'

const TargetingCampaignBudgetForm = ({
  campaignBudget,
  setCampaignBudget,
  setIsCampaignEdit,
  currency,
}) => {
  const [startDate, setStartDate] = React.useState(moment().toISOString().split('T')[0])
  const [endDate, setEndDate] = React.useState(campaignBudget?.endDate || '')
  const [totalBudget, setTotalBudget] = React.useState(campaignBudget?.totalBudget || 0)
  const [isFormValid, setIsFormValid] = React.useState(false)

  const hasCampaignStarted = Boolean(campaignBudget)
  const endDateRef = React.useRef(null)

  const handleTotalBudgetChange = (value) => {
    setTotalBudget(value)
  }

  const handleDateChange = ({ target }) => {
    const { name, value } = target

    if (name === 'start-date') {
      setStartDate(value)
      endDateRef.current.showPicker()
    }

    if (name === 'end-date') {
      setEndDate(value)
    }
  }

  const onSubmit = () => {
    const periodInDays = moment(endDate).diff(moment(startDate), 'days') + 1

    setCampaignBudget({
      ...campaignBudget,
      ...(!hasCampaignStarted && { startDate }),
      endDate,
      periodInDays,
      dailyBudget: (totalBudget / periodInDays).toFixed(2),
      totalBudget,
    })

    setIsCampaignEdit(false)
  }

  React.useEffect(() => {
    const formValid = !!(totalBudget && startDate && endDate)
    setIsFormValid(formValid)
  }, [startDate, endDate, totalBudget])

  return (
    <form>
      <div className="flex h-32 -mx-1">
        <InputCurrency
          name="total-budget"
          label="Total budget"
          value={totalBudget}
          handleChange={handleTotalBudgetChange}
          className="flex-0 mx-1 mb-0 pt-2"
          currency={currency}
        />
        {!hasCampaignStarted && (
          <Input
            name="start-date"
            type="date"
            label="Start date"
            value={startDate}
            min={moment().toISOString().split('T')[0]}
            max={endDate && (moment(endDate)).toISOString()?.split('T')[0]}
            handleChange={handleDateChange}
            className="flex-1 mx-1 mb-0 pt-2"
          />
        )}
        <Input
          name="end-date"
          type="date"
          label="End date"
          value={endDate}
          min={(moment(startDate).add(2, 'days')).toISOString()?.split('T')[0]}
          handleChange={handleDateChange}
          className="flex-1 mx-1 mb-0 pt-2"
          ref={endDateRef}
        />
      </div>
      <Button
        type="submit"
        version="green small"
        className="h-8 rounded-full"
        onClick={onSubmit}
        trackComponentName="TargetingCampaignBudgetForm"
        disabled={!isFormValid}
      >
        {!hasCampaignStarted ? 'Start' : 'Update'} campaign
      </Button>
    </form>
  )
}

TargetingCampaignBudgetForm.propTypes = {
  campaignBudget: PropTypes.object.isRequired,
  setCampaignBudget: PropTypes.func.isRequired,
  setIsCampaignEdit: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
}

TargetingCampaignBudgetForm.defaultProps = {
}

export default TargetingCampaignBudgetForm
