import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import { getAdAccounts, getArtistIntegrationByPlatform } from '@/app/helpers/artistHelpers'

const GetStartedSummarySentenceAdAccount = ({ setError }) => {
  const [adAccountName, setAdAccountName] = React.useState('')

  const { artistId, artist } = React.useContext(ArtistContext)

  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')
  const adAccountId = facebookIntegration?.adaccount_id

  useAsyncEffect(async (isMounted) => {
    if (!isMounted() || !artistId || !adAccountId) return

    const { res, error } = await getAdAccounts(artistId)

    if (error) {
      setError(error)
      return
    }
    const { name } = res.adaccounts.find(({ id }) => id === adAccountId)

    setAdAccountName(name)
  }, [adAccountId])

  return (
    <>
      <span className="whitespace-pre mb-2">, in</span>
      <span className="border-2 border-solid border-yellow rounded-full py-1 px-3 mx-1 mb-2">{adAccountName ? `the ${adAccountName} ad account` : 'your ad account'}</span>
    </>
  )
}

GetStartedSummarySentenceAdAccount.propTypes = {
  setError: PropTypes.func.isRequired,
}

GetStartedSummarySentenceAdAccount.defaultProps = {
}

export default GetStartedSummarySentenceAdAccount
