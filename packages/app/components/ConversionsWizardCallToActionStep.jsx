import React from 'react'
import useAsyncEffect from 'use-async-effect'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import Select from '@/elements/Select'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { getCallToActions, updateCallToAction } from '@/app/helpers/conversionsHelpers'
import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import brandColors from '@/constants/brandColors'

const ConversionsWizardCallToActionStep = () => {
  const [callToActionOptions, setCallToActionOptions] = React.useState([])
  const [callToActionOption, setCallToActionOption] = React.useState({ name: '', value: '' })
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { next } = React.useContext(WizardContext)
  const { artist } = React.useContext(ArtistContext)

  // Get all call to actions and convert them to the correct select options object shape
  useAsyncEffect(async () => {
    const { res: callToActions } = await getCallToActions()
    const options = callToActions.map(({ id, name }) => ({ name, value: id }))
    setCallToActionOptions(options)
    setCallToActionOption(options[0])
  }, [])

  const handleSelect = React.useCallback((e) => {
    const callToActionOption = callToActionOptions.find(({ value }) => value === e.target.value)
    setCallToActionOption(callToActionOption)
  }, [callToActionOptions])

  const saveCallToAction = async () => {
    return updateCallToAction(artist.id, callToActionOption.value)
  }

  // Handle API request and navigate to the next step
  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { res, error } = await saveCallToAction()
    setIsLoading(false)

    if (error) {
      setError({ message: error.message })
      return
    }
    next()
  }

  return (
    <>
      <h2>Call to Action</h2>
      <p>Some text about Call to Action will be placed here</p>
      <Error error={error} />
      <form onSubmit={onSubmit}>
        <Select
          handleChange={handleSelect}
          name="call_to_Action"
          label="Call to Action"
          selectedValue={callToActionOption.value}
          options={callToActionOptions}
        />
        <Button
          type="submit"
          version="green icon"
          loading={isLoading}
          className="w-full"
        >
          Continue
          <ArrowAltIcon
            className="ml-3"
            fill={brandColors.white}
            direction="right"
          />
        </Button>
      </form>
    </>
  )
}

export default ConversionsWizardCallToActionStep
