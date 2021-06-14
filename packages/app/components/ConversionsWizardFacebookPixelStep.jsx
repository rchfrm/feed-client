import React from 'react'

import Button from '@/elements/Button'
import Select from '@/elements/Select'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

import { WizardContext } from './contexts/WizardContext'

const ConversionsWizardFacebookPixelStep = () => {
  // HANDLE SELECT
  const pixelOptions = React.useMemo(() => [
    {
      name: 'Facebook Pixel Name',
      value: 'facebook_pixel_name',
      serverFunction: () => {},
    },
  ], [])
  const [pixelOption, setPixelOption] = React.useState(pixelOptions[0])
  const [isLoading, setIsLoading] = React.useState(false)
  const { next } = React.useContext(WizardContext)

  const handleSelect = React.useCallback((e) => {
    const pixelOption = pixelOptions.find(({ value }) => value === e.target.value)
    setPixelOption(pixelOption)
  }, [pixelOptions])

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
      <h2>Facebook Pixel </h2>
      <p>Some text about Facebook Pixel will be placed here</p>
      <form onSubmit={onSubmit}>
        <Select
          handleChange={handleSelect}
          name="facebook_pixel"
          label="Facebook Pixel"
          selectedValue={pixelOption.value}
          options={pixelOptions}
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

export default ConversionsWizardFacebookPixelStep
