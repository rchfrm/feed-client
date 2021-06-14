import React from 'react'

import Button from '@/elements/Button'
import Select from '@/elements/Select'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

import { WizardContext } from './contexts/WizardContext'

const ConversionsWizardCallToActionStep = () => {
  // HANDLE SELECT
  const callToActionOptions = React.useMemo(() => [
    {
      name: 'Buy now',
      value: 'buy_now',
      serverFunction: () => {},
    },
  ], [])
  const [callToActionOption, setCallToActionOption] = React.useState(callToActionOptions[0])
  const [isLoading, setIsLoading] = React.useState(false)
  const { next } = React.useContext(WizardContext)

  const handleSelect = React.useCallback((e) => {
    const callToActionOption = callToActionOptions.find(({ value }) => value === e.target.value)
    setCallToActionOption(callToActionOption)
  }, [callToActionOptions])

  const saveCallToAction = () => {
    return new Promise((res) => setTimeout(() => {
      console.log('Save Call to Action')
      res('resolve')
    }, 1000))
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

export default ConversionsWizardCallToActionStep
