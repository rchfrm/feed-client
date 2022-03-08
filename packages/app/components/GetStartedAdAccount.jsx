import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import Select from '@/elements/Select'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import Spinner from '@/elements/Spinner'

import { updateAdAccount, getAdAccounts, getArtistIntegrationByPlatform } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/getStartedCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const GetStartedAdAccount = () => {
  const { artist, artistId, updateArtist } = React.useContext(ArtistContext)
  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')

  const [adAccountOptions, setAdAccountOptions] = React.useState([])
  const [adAccounts, setAdAccounts] = React.useState([])
  const [adAccountId, setAdAccountId] = React.useState(facebookIntegration?.adaccount_id || '')
  const [isLoadingAdAccountOptions, setIsLoadingAdAccountOptions] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences

  const nextStep = objective === 'growth' ? 8 : 7

  const { goToStep, setWizardState } = React.useContext(WizardContext)

  // Get all ad accounts and convert them to the correct select options object shape
  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return

    setIsLoadingAdAccountOptions(true)

    const { res, error } = await getAdAccounts(artistId)

    if (error) {
      setError(error)
      setIsLoadingAdAccountOptions(false)
      return
    }
    const { adaccounts: adAccounts } = res
    const options = adAccounts.map(({ id, name }) => ({ name, value: id }))

    setAdAccounts(adAccounts)
    setAdAccountOptions(options)
    setIsLoadingAdAccountOptions(false)
  }, [])

  const handleChange = (e) => {
    const { target: { value } } = e
    if (value === adAccountId) return

    setAdAccountId(value)
  }

  const saveAdAccount = async (adAccountId) => {
    setIsLoading(true)

    const { res: artist, error } = await updateAdAccount(artistId, adAccountId)

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
    if (!adAccountId) return

    // Skip API request if ad account hasn't changed
    if (adAccountId === facebookIntegration?.adaccount_id) {
      goToStep(nextStep)

      return
    }
    await saveAdAccount(adAccountId)
    goToStep(nextStep)
  }

  useAsyncEffect(async () => {
    if (!adAccountOptions.length) return

    // Set initial ad account id value if it doesn't exist yet
    if (!adAccountId) {
      // If there's only one ad account save and go to next step
      if (adAccountOptions.length === 1) {
        await saveAdAccount(adAccountOptions[0]?.value)

        goToStep(nextStep)
      }
      setAdAccountId(adAccountOptions[0]?.value)
    }
    setIsLoading(false)
  }, [adAccountId, setAdAccountId, adAccountOptions])

  if (isLoading) return <Spinner />

  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="mb-6 font-medium text-xl">{copy.adAccountSubtitle}</h3>
      <Error error={error} />
      <div className="flex flex-1 flex-column justify-center items-center w-full sm:w-1/3 mx-auto">
        <Select
          options={adAccountOptions}
          selectedValue={adAccountId}
          loading={isLoadingAdAccountOptions}
          name="ad_account"
          handleChange={handleChange}
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
          <ArrowAltIcon
            className="ml-3"
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
