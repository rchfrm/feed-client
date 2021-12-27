import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import Select from '@/elements/Select'
import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'
import EditBlock from '@/app/EditBlock'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { updateAdAccount, getAdAccounts, getArtistIntegrationByPlatform } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/controlsPageCopy'
import brandColors from '@/constants/brandColors'

const ControlsWizardAdAccountStep = () => {
  const { artist, artistId, updateArtist } = React.useContext(ArtistContext)
  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')

  const [adAccountOptions, setAdAccountOptions] = React.useState([])
  const [adAccounts, setAdAccounts] = React.useState([])
  const [adAccountId, setAdAccountId] = React.useState(facebookIntegration?.adaccount_id || '')
  const [adAccountName, setAdAccountName] = React.useState('')
  const [isEditMode, setIsEditMode] = React.useState(!adAccountId)
  const [isLoadingAdAccountOptions, setIsLoadingAdAccountOptions] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { next, setWizardState } = React.useContext(WizardContext)

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

  React.useEffect(() => {
    if (!adAccountId || !adAccountOptions.length) return

    setAdAccountName(adAccountOptions.find((adAccount) => adAccount.value === adAccountId).name)
  }, [adAccountId, adAccountOptions])

  const handleChange = (e) => {
    const { target: { value } } = e
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
          value: 'China',
        },
      })
    }
    // Update artist context
    updateArtist(artist)
    setIsLoading(false)
    next()
  }

  const handleNext = () => {
    if (!adAccountId) return
    // Skip API request if ad account hasn't changed
    if (adAccountId === facebookIntegration?.adaccount_id) {
      next()
      return
    }
    saveAdAccount(adAccountId)
  }

  React.useEffect(() => {
    if (!adAccountId) {
      setAdAccountId(adAccountOptions[0]?.value)
    }
  }, [adAccountId, setAdAccountId, adAccountOptions])

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardAdAccountStepIntro} />
      {isEditMode
        ? (
          <Select
            loading={isLoadingAdAccountOptions}
            options={adAccountOptions}
            selectedValue={adAccountId}
            name="ad_account"
            handleChange={handleChange}
          />
        ) : (
          <EditBlock
            value={adAccountName}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            trackComponentName="ControlsWizardAdAccountStep"
            className="mb-8"
          />
        )}
      <Error error={error} />
      <Button
        version="outline-green"
        onClick={handleNext}
        className="w-1/3 ml-auto mb-12"
        loading={isLoading}
        spinnerFill={brandColors.black}
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
