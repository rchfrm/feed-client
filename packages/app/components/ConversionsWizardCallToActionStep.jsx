import React from 'react'
import useAsyncEffect from 'use-async-effect'

import Button from '@/elements/Button'
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
  const { next } = React.useContext(WizardContext)
  const { artist } = React.useContext(ArtistContext)

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

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await saveCallToAction()
    setIsLoading(false)
    next()
  }

  return (
    <>
      <h2>Call to Action</h2>
      <p>Some text about Call to Action will be placed here</p>
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
