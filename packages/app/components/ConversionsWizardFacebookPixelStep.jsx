import React from 'react'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import MarkdownText from '@/elements/MarkdownText'

import PixelSelector from '@/app/PixelSelector'
import { setPixel } from '@/app/helpers/settingsHelpers'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import copy from '@/app/copy/controlsPageCopy'

import brandColors from '@/constants/brandColors'

const ConversionsWizardFacebookPixelStep = () => {
  const [facebookPixel, setFacebookPixel] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { next } = React.useContext(WizardContext)
  const { artistId } = React.useContext(ArtistContext)

  // Handle API request and navigate to the next step
  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { error } = await setPixel(artistId, facebookPixel)
    setIsLoading(false)

    if (error) {
      setError({ message: error.message })
      return
    }
    next()
  }

  return (
    <>
      <MarkdownText markdown={copy.pixelStepDescription} />
      <Error error={error} />
      <form onSubmit={onSubmit}>
        {/* Select element */}
        <PixelSelector
          updateParentPixel={setFacebookPixel}
          trackLocation="Conversions settings"
          shouldSaveOnChange={false}
          hasNoPixelOption={false}
        />
        <Button
          type="submit"
          version="outline-green icon"
          loading={isLoading}
          spinnerFill={brandColors.black}
          className="mt-6 w-full"
          trackComponentName="ConversionsWizardFacebookPixelStep"
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

export default ConversionsWizardFacebookPixelStep
