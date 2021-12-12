import React from 'react'

import { WizardContext } from '@/app/contexts/WizardContext'

import Select from '@/elements/Select'
import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import copy from '@/app/copy/controlsPageCopy'

const adAccountOptions = [
  {
    name: 'Account A',
    value: 'A',
  },
  {
    name: 'Account B',
    value: 'B',
  },
]

const ControlsWizardAdAccountStep = () => {
  const [adAccountId, setAdAccountId] = React.useState('')
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const { next } = React.useContext(WizardContext)

  const saveAdAccount = async () => {
    next()
  }

  const handleNext = async () => {
    saveAdAccount()
    setIsLoading(false)
    setError(null)
  }

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardAdAccountStepIntro} />
      <Select
        options={adAccountOptions}
        selectedValue={adAccountId}
        name="ad_accounts"
        handleChange={setAdAccountId}
      />
      <Error error={error} />
      <Button
        version="outline-green icon"
        onClick={handleNext}
        className="w-1/3 ml-auto mb-6"
        loading={isLoading}
        trackComponentName="ControlsWizardAdAccountStep"
      >
        Next
        <ArrowAltIcon
          className="ml-3"
          direction="right"
        />
      </Button>
    </>
  )
}

ControlsWizardAdAccountStep.propTypes = {
}

export default ControlsWizardAdAccountStep
