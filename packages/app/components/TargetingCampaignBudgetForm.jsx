import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import InputDatePicker from '@/app/InputDatePicker'

import InputCurrency from '@/elements/InputCurrency'
import Button from '@/elements/Button'
import Error from '@/elements/Error'

import { saveCampaignBudget } from '@/app/helpers/targetingHelpers'

const TargetingCampaignBudgetForm = ({
  campaignBudget,
  updateCampaignBudget,
  setIsCampaignEdit,
  currency,
}) => {
  const [startDate, setStartDate] = React.useState(campaignBudget?.startDate || moment().toDate())
  const [endDate, setEndDate] = React.useState(campaignBudget?.endDate || moment().add(1, 'days').toDate())
  const [totalBudget, setTotalBudget] = React.useState(campaignBudget?.totalBudget || 0)
  const [isFormValid, setIsFormValid] = React.useState(false)
  const [error, setError] = React.useState(null)

  const hasCampaignStarted = Boolean(campaignBudget)
  const { artistId } = React.useContext(ArtistContext)

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

  const onSubmit = async (e) => {
    e.preventDefault()

    const periodInDays = moment(endDate).diff(moment(startDate), 'days') + 1

    const { res: campaignBudget, error } = await saveCampaignBudget(artistId, {
      startDate,
      endDate,
      dailyBudget: Math.round((totalBudget / periodInDays) * 100) / 100,
      totalBudget,
    })

    if (error) {
      setError(error)
      return
    }

    updateCampaignBudget(campaignBudget)
    setIsCampaignEdit(false)
  }

  React.useEffect(() => {
    const formValid = !!(totalBudget && startDate && endDate)
    setIsFormValid(formValid)
  }, [startDate, endDate, totalBudget])

  return (
    <form>
      <Error error={error} />
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
  updateCampaignBudget: PropTypes.func.isRequired,
  setIsCampaignEdit: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
}

TargetingCampaignBudgetForm.defaultProps = {
}

export default TargetingCampaignBudgetForm
