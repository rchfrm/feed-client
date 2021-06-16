import React from 'react'
import useAsyncEffect from 'use-async-effect'

import Button from '@/elements/Button'
import Select from '@/elements/Select'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { getFacebookPixelEvents, updateFacebookPixelEvent } from '@/app/helpers/conversionsHelpers'
import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import brandColors from '@/constants/brandColors'

const ConversionsWizardFacebookPixelEventStep = () => {
  const [facebookPixelEventOptions, setFacebookPixelEventOptions] = React.useState([])
  const [facebookPixelEventOption, setFacebookPixelEventOption] = React.useState({ name: '', value: '' })
  const [isLoading, setIsLoading] = React.useState(false)
  const { next } = React.useContext(WizardContext)
  const { artist } = React.useContext(ArtistContext)

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

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await saveFaceBookPixelEvent()
    setIsLoading(false)
    next()
  }

  return (
    <>
      <h2>Facebook Pixel Event</h2>
      <p>Some text about Facebook Pixel Event will be placed here</p>
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

export default ConversionsWizardFacebookPixelEventStep
