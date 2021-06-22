import React from 'react'
import useAsyncEffect from 'use-async-effect'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import Select from '@/elements/Select'
import MarkdownText from '@/elements/MarkdownText'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { getCallToActions, updateCallToAction } from '@/app/helpers/conversionsHelpers'
import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import copy from '@/app/copy/controlsPageCopy'

import brandColors from '@/constants/brandColors'

const getControlsStoreState = (state) => ({
  callToAction: state.conversionsPreferences.callToAction,
  updatePreferences: state.updatePreferences,
})

const ConversionsWizardCallToActionStep = () => {
  const { callToAction, updatePreferences } = useControlsStore(getControlsStoreState)
  const [callToActionOptions, setCallToActionOptions] = React.useState([])
  const [callToActionOption, setCallToActionOption] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { next } = React.useContext(WizardContext)
  const { artist } = React.useContext(ArtistContext)

  // Get all call to actions and convert them to the correct select options object shape
  useAsyncEffect(async () => {
    const { res: callToActions } = await getCallToActions()
    const options = callToActions.map(({ id, name }) => ({ name, value: id }))
    const selectedCallToAction = options.find(cta => cta.value === callToAction)
    setCallToActionOptions(options)
    setCallToActionOption(selectedCallToAction || options[0])
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
    const { res: artist, error } = await saveCallToAction()
    setIsLoading(false)

    if (error) {
      setError({ message: error.message })
      return
    }
    // Update global store value
    updatePreferences(
      'conversionsPreferences',
      { callToAction: artist.preferences.conversions.call_to_action },
    )
    next()
  }

  return (
    <>
      <h2>Call to Action</h2>
      <MarkdownText markdown={copy.callToActionStepDescription} />
      <Error error={error} />
      <form onSubmit={onSubmit}>
        <Select
          handleChange={handleSelect}
          name="call_to_Action"
          label="Call to Action"
          selectedValue={callToActionOption?.value}
          options={callToActionOptions}
        />
        <Button
          type="submit"
          version="outline icon"
          loading={isLoading}
          spinnerFill={brandColors.black}
          className="w-full"
        >
          Continue
          <ArrowAltIcon
            className="ml-3"
            direction="right"
          />
        </Button>
      </form>
    </>
  )
}

export default ConversionsWizardCallToActionStep
