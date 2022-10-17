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
  currencyOffset,
}) => {
  const [startDate, setStartDate] = React.useState(campaignBudget?.startDate || moment().toDate())
  const [endDate, setEndDate] = React.useState(campaignBudget?.endDate || null)
  const [totalBudget, setTotalBudget] = React.useState(campaignBudget?.totalBudget || 0)
  const [isFormValid, setIsFormValid] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { isActive } = campaignBudget || {}

  const endDateRef = React.useRef(null)
  const { artistId } = React.useContext(ArtistContext)

  const handleTotalBudgetChange = (value) => {
    setTotalBudget(value)
  }

  const handleStartDateChange = (value) => {
    setStartDate(value)

    if (moment(value).isAfter(moment(endDate))) {
      setEndDate(moment(value).add(1, 'days').toDate())
    }

    if (!endDate || moment(value).isAfter(moment(endDate))) {
      endDateRef.current.setOpen(true)
    }
  }

  const handleEndDateChange = (value) => {
    setEndDate(value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const periodInDays = moment(endDate).diff(moment(startDate), 'days') + 1

    const { res, error } = await saveCampaignBudget(artistId, currencyOffset, {
      startDate,
      endDate,
      dailyBudget: Math.round((totalBudget / periodInDays) * 100) / 100,
      totalBudget,
      isActive: true,
    })

    if (error) {
      setError(error)
      return
    }

    updateCampaignBudget(res?.campaignBudget)
    setIsCampaignEdit(false)
  }

  React.useEffect(() => {
    const formValid = !!(totalBudget && startDate && endDate)
    setIsFormValid(formValid)
  }, [startDate, endDate, totalBudget])

  return (
    <form>
      <Error error={error} />
      <div className="mb-12 xs:mb-8 xs:flex -mx-1">
        <InputCurrency
          name="total-budget"
          label="Total budget"
          value={totalBudget}
          handleChange={handleTotalBudgetChange}
          className="w-full mb-5 xs:mb-0 mx-1 xs:pt-3"
          currency={currency}
        />
        {!isActive && (
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
          placeholderText="End date"
          ref={endDateRef}
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
          {!isActive ? 'Start' : 'Update'} campaign
        </Button>
        {isActive && (
          <Button
            type="submit"
            version="black small"
            className="h-8 rounded-full"
            onClick={() => setIsCampaignEdit(false)}
            trackComponentName="TargetingCampaignBudgetForm"
          >
            Back
          </Button>
        )}
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
