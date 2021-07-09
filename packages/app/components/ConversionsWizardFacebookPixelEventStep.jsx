import React from 'react'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import PixelEventSelector from '@/app/PixelEventSelector'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { updateFacebookPixelEvent } from '@/app/helpers/conversionsHelpers'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import copy from '@/app/copy/controlsPageCopy'

import brandColors from '@/constants/brandColors'

const getControlsStoreState = (state) => ({
  updatePreferences: state.updatePreferences,
})

const ConversionsWizardFacebookPixelEventStep = () => {
  const { updatePreferences } = useControlsStore(getControlsStoreState)
  const [pixelEvent, setPixelEvent] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { next } = React.useContext(WizardContext)
  const { artistId } = React.useContext(ArtistContext)

  // Handle API request and navigate to the next step
  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { res: artist, error } = await updateFacebookPixelEvent(artistId, pixelEvent)
    setIsLoading(false)

    if (error) {
      setError({ message: error.message })
      return
    }
    // Update global store value
    updatePreferences(
      'conversionsPreferences',
      { facebookPixelEvent: artist.preferences.conversions.facebook_pixel_event },
    )
    next()
  }

  return (
    <>
      <h2>Facebook Pixel Event</h2>
      <MarkdownText markdown={copy.pixelEventStepDescription} />
      <Error error={error} />
      <form onSubmit={onSubmit}>
        <PixelEventSelector
          pixelEvent={pixelEvent}
          setPixelEvent={setPixelEvent}
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

export default ConversionsWizardFacebookPixelEventStep
