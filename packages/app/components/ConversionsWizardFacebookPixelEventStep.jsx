import React from 'react'

import Button from '@/elements/Button'
import Select from '@/elements/Select'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

import { WizardContext } from './contexts/WizardContext'

const ConversionsWizardFacebookPixelEventStep = () => {
  // HANDLE SELECT
  const pixelEventOptions = React.useMemo(() => [
    {
      name: 'Facebook Pixel Event Name',
      value: 'facebook_pixel_event_name',
      serverFunction: () => {},
    },
  ], [])
  const [pixelEventOption, setPixelEventOption] = React.useState(pixelEventOptions[0])
  const [isLoading, setIsLoading] = React.useState(false)
  const { next } = React.useContext(WizardContext)

  const handleSelect = React.useCallback((e) => {
    const pixelEventOption = pixelEventOptions.find(({ value }) => value === e.target.value)
    setPixelEventOption(pixelEventOption)
  }, [pixelEventOptions])

  const saveFacebookPixel = () => {
    return new Promise((res) => setTimeout(() => {
      console.log('Save Facebook Pixel')
      res('resolve')
    }, 1000))
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
      <h2>Facebook Pixel Event</h2>
      <p>Some text about Facebook Pixel Event will be placed here</p>
      <form onSubmit={onSubmit}>
        <Select
          handleChange={handleSelect}
          name="facebook_pixel_event"
          label="Facebook Pixel Event"
          selectedValue={pixelEventOption.value}
          options={pixelEventOptions}
        />
        <Button
          type="submit"
          version="green icon"
          onClick={onSubmit}
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
