import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import InputDatePicker from '@/app/InputDatePicker'

import InputCurrency from '@/elements/InputCurrency'
import Button from '@/elements/Button'
import Error from '@/elements/Error'

import copy from '@/app/copy/targetingPageCopy'

const TargetingCampaignBudgetForm = ({
  initialTargetingState,
  targetingState,
  saveTargetingSettings,
  setIsCampaignEdit,
  currency,
  currencyOffset,
  hasActiveCampaignBudget,
}) => {
  const { campaignBudget } = targetingState

  const [startDate, setStartDate] = React.useState(hasActiveCampaignBudget ? campaignBudget?.startDate : moment().utc().startOf('day').toDate())
  const [endDate, setEndDate] = React.useState(hasActiveCampaignBudget ? campaignBudget?.endDate : null)
  const [totalBudget, setTotalBudget] = React.useState(hasActiveCampaignBudget ? campaignBudget?.totalBudget : 0)
  const [isFormValid, setIsFormValid] = React.useState(false)

  const {
    artist: {
      feedMinBudgetInfo: {
        currencyCode,
        majorUnit: {
          minHard,
        } = {},
      } = {},
    },
  } = React.useContext(ArtistContext)

  const endDateRef = React.useRef(null)
  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings })
  const daysInPeriod = moment(endDate).diff(moment(startDate).startOf('day'), 'days') + 1
  const hasSufficientBudget = daysInPeriod > 0 && (totalBudget >= daysInPeriod * minHard)

  const getButtonText = () => {
    if (hasActiveCampaignBudget) {
      return 'Update'
    }

    if (moment(startDate).isAfter(moment(), 'day')) {
      return 'Schedule'
    }

    return 'Start'
  }

  const handleTotalBudgetChange = (value) => {
    setTotalBudget(value)
  }

  const handleStartDateChange = (value) => {
    setStartDate(value)

    if (moment(value).isAfter(moment(endDate))) {
      setEndDate(moment(value).add(1, 'days').toDate())
    }

    if (! endDate || moment(value).isAfter(moment(endDate))) {
      endDateRef.current.setOpen(true)
    }
  }

  const handleEndDateChange = (value) => {
    setEndDate(value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    await saveTargeting('campaignBudget', {
      ...targetingState,
      budget: Math.round((totalBudget / daysInPeriod) * currencyOffset),
      campaignBudget: {
        startDate,
        endDate,
        totalBudget,
      },
    })

    setIsCampaignEdit(false)
  }

  React.useEffect(() => {
    const formValid = !! (totalBudget && startDate && endDate)
    setIsFormValid(formValid)
  }, [startDate, endDate, totalBudget])

  return (
    <form>
      <div className="mb-12 xs:mb-8 xs:flex -mx-1">
        <InputCurrency
          name="total-budget"
          label="Total budget"
          value={totalBudget}
          handleChange={handleTotalBudgetChange}
          className="w-full mb-5 xs:mb-0 mx-1 xs:pt-3"
          currency={currency}
        />
        {! hasActiveCampaignBudget && (
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
          maxDate={moment(startDate).add(180, 'days').toDate()}
          onChange={handleEndDateChange}
          className="w-full mb-5 xs:mb-0 mx-1 xs:pt-3"
          placeholderText="End date"
          ref={endDateRef}
          selectsEnd
        />
      </div>
      <div className="flex justify-between">
        {hasActiveCampaignBudget && (
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
        <Button
          type="submit"
          version="green small"
          className="h-8 mb-5 rounded-full"
          onClick={onSubmit}
          trackComponentName="TargetingCampaignBudgetForm"
          disabled={! isFormValid || ! hasSufficientBudget}
        >
          {getButtonText()} campaign
        </Button>
      </div>
      {isFormValid && ! hasSufficientBudget && (
        <Error className="text-sm" error={{ message: copy.hasInsufficientBudgetError(daysInPeriod, minHard, currencyCode) }} />
      )}
    </form>
  )
}

TargetingCampaignBudgetForm.propTypes = {
  initialTargetingState: PropTypes.object.isRequired,
  targetingState: PropTypes.object.isRequired,
  saveTargetingSettings: PropTypes.func.isRequired,
  setIsCampaignEdit: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  currencyOffset: PropTypes.number.isRequired,
  hasActiveCampaignBudget: PropTypes.bool.isRequired,
}

TargetingCampaignBudgetForm.defaultProps = {
}

export default TargetingCampaignBudgetForm
