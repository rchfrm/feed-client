import React from 'react'
import useAsyncEffect from 'use-async-effect'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import GetStartedSummarySentenceSection from '@/app/GetStartedSummarySentenceSection'

import { getStartedSections, getAdAccounts, getArtistIntegrationByPlatform } from '@/app/helpers/artistHelpers'
import brandColors from '@/constants/brandColors'

const GetStartedSummarySentenceAdAccount = () => {
  const [adAccountName, setAdAccountName] = React.useState('')

  const { artistId, artist } = React.useContext(ArtistContext)
  const isDesktopLayout = useBreakpointTest('xs')

  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')
  const adAccountId = facebookIntegration?.adaccount_id

  useAsyncEffect(async (isMounted) => {
    if (!artistId || !adAccountId) return

    const { res, error } = await getAdAccounts(artistId)

    if (!isMounted()) return

    if (error) {
      return
    }
    // Get the selected ad account name from the ad accounts array
    const { name } = res.adaccounts.find(({ id }) => id === adAccountId)
    const nameContainsAdAccountString = name.toLowerCase().includes('ad account')

    setAdAccountName(nameContainsAdAccountString ? name : `${name} ad account`)
  }, [adAccountId])

  return (
    <GetStartedSummarySentenceSection
      section={getStartedSections.adAccount}
      text=" in"
      color={isDesktopLayout ? brandColors.yellow : brandColors.facebook.bg}
      isComplete={Boolean(adAccountId)}
      className="mx-1 sm:mx-2"
    >
      {adAccountName ? `the ${adAccountName}` : `${isDesktopLayout ? 'your' : ''} ad account`}
    </GetStartedSummarySentenceSection>
  )
}

GetStartedSummarySentenceAdAccount.propTypes = {
}

GetStartedSummarySentenceAdAccount.defaultProps = {
}

export default GetStartedSummarySentenceAdAccount
