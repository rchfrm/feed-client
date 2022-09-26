import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import InputDatePicker from '@/app/InputDatePicker'

import InputCurrency from '@/elements/InputCurrency'
import Button from '@/elements/Button'

const TargetingCampaignBudgetForm = ({
  campaignBudget,
  setCampaignBudget,
  setIsCampaignEdit,
  currency,
}) => {
  const [startDate, setStartDate] = React.useState(campaignBudget?.startDate || moment().toDate())
  const [endDate, setEndDate] = React.useState(campaignBudget?.endDate || moment().add(1, 'days').toDate())
  const [totalBudget, setTotalBudget] = React.useState(campaignBudget?.totalBudget || 0)
  const [isFormValid, setIsFormValid] = React.useState(false)

  const hasCampaignStarted = Boolean(campaignBudget)

  const handleTotalBudgetChange = (value) => {
    setTotalBudget(value)
  }

  const handleDateChange = (value) => {
    if (Array.isArray(value)) {
      const [start, end] = value
      setStartDate(start)
      setEndDate(end)

      return
    }

    setEndDate(value)
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
      <div className="flex -mx-1">
        <InputCurrency
          name="total-budget"
          label="Total budget"
          value={totalBudget}
          handleChange={handleTotalBudgetChange}
          className="mx-1 pt-3 w-1/3"
          currency={currency}
        />
        {!hasCampaignStarted ? (
          <InputDatePicker
            label="Period"
            startDate={startDate}
            endDate={endDate}
            minDate={moment().toDate()}
            onChange={handleDateChange}
            className="w-2/3 mx-1 pt-3"
            isRange
          />
        ) : (
          <InputDatePicker
            label="End date"
            value={endDate}
            minDate={moment(startDate).add(1, 'days').toDate()}
            onChange={handleDateChange}
            className="w-2/3 mx-1 pt-3"
          />
        )}
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
