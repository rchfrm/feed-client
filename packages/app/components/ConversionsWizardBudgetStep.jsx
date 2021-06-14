import React from 'react'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

import { WizardContext } from './contexts/WizardContext'

const ConversionsWizardBudgetStep = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { next } = React.useContext(WizardContext)

  const anAsyncFunction = () => {
    return new Promise((res) => setTimeout(() => {
      console.log('Save Budget')
      res('resolve')
    }, 1000))
  }

  const handleNext = async () => {
    setIsLoading(true)
    await anAsyncFunction()
    setIsLoading(false)
    next()
  }

  return (
    <>
      <h2>Budget</h2>
      <p>To run conversions you must have a budget of at least £5.00</p>
      <Button
        version="green icon"
        onClick={handleNext}
        loading={isLoading}
        className="w-full"
      >
        Set budget to £5.00
        <ArrowAltIcon
          className="ml-3"
          fill={brandColors.white}
          direction="right"
        />
      </Button>
    </>
  )
}

export default ConversionsWizardBudgetStep
