import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import Select from '@/elements/Select'
import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import ArrowAltIcon from '@/icons/ArrowAltIcon'
import { updateAdAccount, getAdAccounts, getArtistIntegrationByPlatform } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/controlsPageCopy'
import brandColors from '../../shared/constants/brandColors'

const ControlsWizardAdAccountStep = () => {
  const [adAccountOptions, setAdAccountOptions] = React.useState([])
  const [isLoadingAdAccountOptions, setIsLoadingAdAccountOptions] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [adAccountId, setAdAccountId] = React.useState('')
  const [error, setError] = React.useState(null)
  const { next } = React.useContext(WizardContext)
  const { artist, artistId, updateArtist } = React.useContext(ArtistContext)
  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')

  // Get all ad accounts and convert them to the correct select options object shape
  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return

    setIsLoadingAdAccountOptions(true)
    const { res: { adaccounts: adAccounts } } = await getAdAccounts(artistId)
    const options = adAccounts.map(({ id, name }) => ({ name, value: id }))
    setAdAccountOptions(options)
    setIsLoadingAdAccountOptions(false)
  }, [])

  const saveAdAccount = async (adAccountId) => {
    setIsLoading(true)

    const { res: artist, error } = await updateAdAccount(artistId, adAccountId)
    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }
    // Update artist context
    updateArtist(artist)
    setIsLoading(false)
    next()
  }

  const handleNext = () => {
    if (!adAccountId) return
    // Skip api request if the link hasn't changed
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
      <Select
        loading={isLoadingAdAccountOptions}
        options={adAccountOptions}
        selectedValue={adAccountId}
        name="ad_account"
        handleChange={setAdAccountId}
      />
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
