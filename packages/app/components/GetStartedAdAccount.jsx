import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import AdAccountSelector from '@/app/AdAccountSelector'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import ArrowIcon from '@/icons/ArrowIcon'
import Spinner from '@/elements/Spinner'

import { setAdAccount, getArtistIntegrationByPlatform, getAdAccounts } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/getStartedCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const GetStartedAdAccount = () => {
  const { artist, artistId, updateArtist } = React.useContext(ArtistContext)
  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')

  const [adAccounts, setAdAccounts] = React.useState([])
  const [adAccountId, setAdAccountId] = React.useState(facebookIntegration?.adaccount_id || '')
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences

  const { goToStep, setWizardState, currentStep } = React.useContext(WizardContext)
  const nextStep = objective !== 'sales' ? currentStep + 2 : currentStep + 1

  // Get all ad accounts and convert them to the correct select options object shape
  useAsyncEffect(async (isMounted) => {
    const { res, error } = await getAdAccounts(artistId)
    if (! isMounted()) return

    if (error) {
      setIsLoading(false)

      return
    }
    const { adaccounts: adAccounts } = res

    setAdAccounts(adAccounts)
  }, [])

  const saveAdAccount = async (adAccountId) => {
    setIsLoading(true)

    const { res: artist, error } = await setAdAccount(artistId, adAccountId)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }
    // If business country is set in the choosen ad account we store it in the local wizard context state
    const country = adAccounts.find((adAccount) => adAccount.id === adAccountId).business_country
    if (country) {
      setWizardState({
        type: 'set-state',
        payload: {
          key: 'adAccountCountry',
          value: country,
        },
      })
    }
    // Update artist context
    updateArtist(artist)
    setIsLoading(false)
  }

  const handleNext = async () => {
    if (! adAccountId) return

    // Skip API request if ad account hasn't changed
    if (adAccountId === facebookIntegration?.adaccount_id) {
      goToStep(nextStep)

      return
    }
    await saveAdAccount(adAccountId)
    goToStep(nextStep)
  }

  useAsyncEffect(async () => {
    if (! adAccounts.length) return

    if (! adAccountId) {
      // If there's only one ad account save and go to next step
      if (adAccounts.length === 1) {
        await saveAdAccount(adAccounts[0]?.id)

        goToStep(nextStep)
      }
    }
    setIsLoading(false)
  }, [adAccountId, adAccounts])

  if (isLoading) return <Spinner />

  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="w-full mb-8 xs:mb-4 font-medium text-lg">{copy.adAccountSubtitle}</h3>
      <Error error={error} />
      <div className="flex flex-1 flex-column justify-center items-center w-full sm:w-1/3 mx-auto">
        <AdAccountSelector
          adAccountId={adAccountId}
          setAdAccountId={setAdAccountId}
          adAccounts={adAccounts}
          className="w-full mb-12"
        />
        <Button
          version="green"
          onClick={handleNext}
          loading={isLoading}
          className="w-full sm:w-48"
          trackComponentName="GetStartedAdAccount"
        >
          Save
          <ArrowIcon
            className="w-7 h-auto ml-3"
            direction="right"
            fill="white"
          />
        </Button>
      </div>
    </div>
  )
}

GetStartedAdAccount.propTypes = {
}

GetStartedAdAccount.defaultProps = {
}

export default GetStartedAdAccount
