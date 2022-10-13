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

  const hasCampaignStarted = Boolean(campaignBudget.startDate)
  const { artistId } = React.useContext(ArtistContext)

  const handleTotalBudgetChange = (value) => {
    setTotalBudget(value)
  }

  const handleStartDateChange = (value) => {
    setStartDate(value)
  }

  const handleEndDateChange = (value) => {
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
      <div className="mb-10 xs:mb-6 xs:flex -mx-1">
        <InputCurrency
          name="total-budget"
          label="Total budget"
          value={totalBudget}
          handleChange={handleTotalBudgetChange}
          className="w-full mb-5 xs:mb-0 mx-1 xs:pt-3"
          currency={currency}
        />
        {!hasCampaignStarted && (
          <InputDatePicker
            label="Start date"
            value={startDate}
            startDate={startDate}
            endDate={endDate}
            minDate={moment().toDate()}
            onChange={handleStartDateChange}
            className="w-full mb-5 xs:mb-0 mx-1 xs:pt-3"
            selectsStart
          />
        )}
        <InputDatePicker
          label="End date"
          value={endDate}
          startDate={startDate}
          endDate={endDate}
          minDate={moment(startDate).add(1, 'days').toDate()}
          onChange={handleEndDateChange}
          className="w-full mb-5 xs:mb-0 mx-1 xs:pt-3"
          selectsEnd
        />
      </div>
      <div className="flex justify-between">
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
        <Button
          type="submit"
          version="black small"
          className="h-8 rounded-full"
          onClick={() => setIsCampaignEdit(false)}
          trackComponentName="TargetingCampaignBudgetForm"
        >
          Back
        </Button>
      </div>
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
