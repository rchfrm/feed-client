import React from 'react'

import * as server from '@/app/helpers/appServer'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import brandColors from '@/constants/brandColors'

const ConversionsWizardBudgetStep = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { next } = React.useContext(WizardContext)
  const { artist: { id: artistId } } = React.useContext(ArtistContext)

  const setBudgetToFivePound = () => {
    const payload = { budget: 5 }
    return server.saveTargetingSettings(artistId, payload)
  }

  const handleNext = async () => {
    setIsLoading(true)
    const { res: settings, error } = await setBudgetToFivePound()
    setIsLoading(false)

    if (error) {
      setError({ message: error.message })
      return
    }
    console.log(settings)
    next()
  }

  return (
    <>
      <h2>Budget</h2>
      <p>To run conversions you must have a budget of at least £5.00</p>
      <Error error={error} />
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
