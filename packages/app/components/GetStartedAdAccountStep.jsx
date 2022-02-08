import React from 'react'
import useAsyncEffect from 'use-async-effect'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import Select from '@/elements/Select'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { updateAdAccount, getAdAccounts, getArtistIntegrationByPlatform } from '@/app/helpers/artistHelpers'

const GetStartedAdAccountStep = () => {
  const objective = 'growth'
  const { artist, artistId, updateArtist } = React.useContext(ArtistContext)
  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')

  const [adAccountOptions, setAdAccountOptions] = React.useState([])
  const [adAccounts, setAdAccounts] = React.useState([])
  const [adAccountId, setAdAccountId] = React.useState(facebookIntegration?.adaccount_id || '')
  const [isLoadingAdAccountOptions, setIsLoadingAdAccountOptions] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { goToStep, setWizardState } = React.useContext(WizardContext)

  // Get all ad accounts and convert them to the correct select options object shape
  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return

    setIsLoadingAdAccountOptions(true)

    const { res: { adaccounts: adAccounts } } = await getAdAccounts(artistId)
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

    const nextStep = objective === 'growth' ? 8 : 9
    goToStep(nextStep)
  }

  const handleNext = () => {
    if (!adAccountId) return

    // Skip API request if ad account hasn't changed
    if (adAccountId === facebookIntegration?.adaccount_id) {
      const nextStep = objective === 'growth' ? 8 : 9
      goToStep(nextStep)

      return
    }
    saveAdAccount(adAccountId)
  }

  return (
    <div className="flex flex-1 flex-column justify-center items-center">
      <h2 className="w-full mb-16 font-normal text-xl">Which Facebook ad account would you like Feed to use?</h2>
      <div className="flex flex-column items-center w-1/3">
        <Select
          options={adAccountOptions}
          selectedValue={adAccountId}
          loading={isLoadingAdAccountOptions}
          name="ad_account"
          handleChange={handleChange}
          className="w-full mb-12"
        />
        <Error error={error} />
        <Button
          version="green"
          onClick={handleNext}
          loading={isLoading}
          className="w-48"
          trackComponentName="GetStartedAdAccountStep"
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

GetStartedAdAccountStep.propTypes = {
}

GetStartedAdAccountStep.defaultProps = {
}

export default GetStartedAdAccountStep
