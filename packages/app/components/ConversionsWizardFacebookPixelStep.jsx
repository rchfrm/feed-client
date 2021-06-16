import React from 'react'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import PixelSelector from '@/app/PixelSelector'
import { setPixel } from '@/app/helpers/settingsHelpers'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import brandColors from '@/constants/brandColors'

const ConversionsWizardFacebookPixelStep = () => {
  const [facebookPixel, setFacebookPixel] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const { next } = React.useContext(WizardContext)
  const { artist } = React.useContext(ArtistContext)

  const saveFacebookPixel = () => {
    return setPixel(artist.id, facebookPixel)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await saveFacebookPixel()
    setIsLoading(false)
    next()
  }

  return (
    <>
      <h2>Facebook Pixel </h2>
      <p>Some text about Facebook Pixel will be placed here</p>
      <form onSubmit={onSubmit}>
        <PixelSelector
          updateParentPixel={setFacebookPixel}
          trackLocation="Conversions settings"
          shouldSaveOnChange={false}
        />
        <Button
          type="submit"
          version="green icon"
          loading={isLoading}
          className="mt-6 w-full"
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

export default ConversionsWizardFacebookPixelStep
