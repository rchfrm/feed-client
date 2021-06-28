import React from 'react'
import useAsyncEffect from 'use-async-effect'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import Select from '@/elements/Select'
import MarkdownText from '@/elements/MarkdownText'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { getFacebookPixelEvents, updateFacebookPixelEvent } from '@/app/helpers/conversionsHelpers'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import copy from '@/app/copy/controlsPageCopy'

import brandColors from '@/constants/brandColors'

const ConversionsWizardFacebookPixelEventStep = () => {
  const [facebookPixelEventOptions, setFacebookPixelEventOptions] = React.useState([])
  const [facebookPixelEventOption, setFacebookPixelEventOption] = React.useState({ name: '', value: '' })
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { next } = React.useContext(WizardContext)
  const { artist } = React.useContext(ArtistContext)

  // Get all Facebook Pixel Events on first load and convert them to the correct select options object shape
  useAsyncEffect(async () => {
    const { res: events } = await getFacebookPixelEvents()
    const options = events.map(({ id, name }) => ({ name, value: id }))
    setFacebookPixelEventOptions(options)
    setFacebookPixelEventOption(options[0])
  }, [])

  const handleSelect = React.useCallback((e) => {
    const facebookPixelEventOption = facebookPixelEventOptions.find(({ value }) => value === e.target.value)
    setFacebookPixelEventOption(facebookPixelEventOption)
  }, [facebookPixelEventOptions])

  const saveFaceBookPixelEvent = () => {
    return updateFacebookPixelEvent(artist.id, facebookPixelEventOption.value)
  }

  // Handle API request and navigate to the next step
  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { res, error } = await saveFaceBookPixelEvent()
    setIsLoading(false)

    if (error) {
      setError({ message: error.message })
      return
    }
    next()
  }

  return (
    <>
      <h2>Facebook Pixel Event</h2>
      <MarkdownText markdown={copy.pixelEventStepDescription} />
      <Error error={error} />
      <form onSubmit={onSubmit}>
        <Select
          handleChange={handleSelect}
          name="facebook_pixel_event"
          label="Facebook Pixel Event"
          selectedValue={facebookPixelEventOption.value}
          options={facebookPixelEventOptions}
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