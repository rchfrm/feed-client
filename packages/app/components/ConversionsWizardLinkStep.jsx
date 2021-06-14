import React from 'react'

import Button from '@/elements/Button'
import Select from '@/elements/Select'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

import { WizardContext } from './contexts/WizardContext'

const ConversionsWizardLinkStep = () => {
  // HANDLE SELECT
  const linkOptions = React.useMemo(() => [
    {
      name: 'Use Default Link (v2)',
      value: 'default_link_v2',
      serverFunction: () => {},
    },
  ], [])
  const [linkOption, setLinkOption] = React.useState(linkOptions[0])
  const [isLoading, setIsLoading] = React.useState(false)
  const { next } = React.useContext(WizardContext)

  const handleSelect = React.useCallback((e) => {
    const patchOption = linkOptions.find(({ value }) => value === e.target.value)
    setLinkOption(patchOption)
  }, [linkOptions])

  const saveLink = () => {
    return new Promise((res) => setTimeout(() => {
      console.log('Save Link')
      res('resolve')
    }, 1000))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await saveLink()
    setIsLoading(false)
    next()
  }

  return (
    <>
      <h2>Default Link</h2>
      <p>Some text about default link will be placed here</p>
      <form onSubmit={onSubmit}>
        <Select
          handleChange={handleSelect}
          name="link"
          label="Default link"
          selectedValue={linkOption.value}
          options={linkOptions}
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

export default ConversionsWizardLinkStep
