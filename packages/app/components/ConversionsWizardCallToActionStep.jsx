import React from 'react'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import CallToActionSelector from '@/app/CallToActionSelector'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { updateCallToAction } from '@/app/helpers/conversionsHelpers'
import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import copy from '@/app/copy/controlsPageCopy'

import brandColors from '@/constants/brandColors'

const getControlsStoreState = (state) => ({
  updatePreferences: state.updatePreferences,
})

const ConversionsWizardCallToActionStep = () => {
  const { updatePreferences } = useControlsStore(getControlsStoreState)
  const [callToAction, setCallToAction] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { next } = React.useContext(WizardContext)
  const { artistId } = React.useContext(ArtistContext)

  // Handle API request and navigate to the next step
  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { res: artist, error } = await updateCallToAction(artistId, callToAction)
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
      <MarkdownText markdown={copy.callToActionStepDescription} />
      <Error error={error} />
      <form onSubmit={onSubmit}>
        <CallToActionSelector
          callToAction={callToAction}
          setCallToAction={setCallToAction}
          label="Call to Action"
        />
        <Button
          type="submit"
          version="outline-green icon"
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
