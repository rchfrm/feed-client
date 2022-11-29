import React from 'react'
import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/billingCopy'
import { capitalise } from '@/helpers/utils'
import LightbulbIcon from '@/icons/LightbulbIcon'
import brandColors from '@/constants/brandColors'
import Spinner from '@/elements/Spinner'
import useAsyncEffect from 'use-async-effect'
import { getTransferRequests } from '@/app/helpers/billingHelpers'
import Error from '@/elements/Error'

const BillingProfilesSummary = ({
  organizationArtists,
  className,
}) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [transferRequests, setTransferRequests] = React.useState([])

  useAsyncEffect(async () => {
    setIsLoading(true)
    const { error, res } = await getTransferRequests()
    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }
    const { transferRequests } = res
    setError(null)
    setTransferRequests(transferRequests)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className={[className].join(' ')}>
        <h2 className="font-body font-bold mb-6">Profiles</h2>
        <Spinner width={25} className="text-left justify-start mb-10" />
      </div>
    )
  }

  const currentArtistIdsHashTable = organizationArtists.reduce((result, artist) => {
    result[artist.id] = true
    return result
  }, {})

  const filteredTransferRequests = transferRequests.filter(({ profile_id }) => !currentArtistIdsHashTable[profile_id])

  return (
    <div className={[className].join(' ')}>
      {/* INTRO */}
      <h2 className="font-body font-bold mb-6">Profiles</h2>
      <Error error={error} />
      {/* SUMMARY */}
      <div className="mb-10">
        {organizationArtists.length === 0 ? (
          filteredTransferRequests.length === 0 && (
            <span>{copy.noProfiles}</span>
          )
        ) : (
          <>
            <MarkdownText markdown={copy.profilesIntro} />
            <ul>
              {organizationArtists.map((artist) => {
                const artistPlan = artist.plan && artist.plan.split('_')[0]
                return (
                  <li key={artist.id} className="flex ml-5 mb-3 last:mb-0 items-center gap-2">
                    <span>{artist.name}</span>
                    {artistPlan && (
                      <div
                        className={[
                          'inline-flex',
                          'items-center',
                          'px-2',
                          'py-1',
                          'text-xs',
                          'border-2',
                          'border-solid',
                          'border-insta',
                          'rounded-full',
                        ].join(' ')}
                      >
                        {capitalise(artistPlan)}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
            <div className="flex items-center mb-4">
              <LightbulbIcon className="flex-none h-auto mr-2 w-3" fill={brandColors.instagram.bg} />
              <MarkdownText className="mb-0 font-semibold text-insta" markdown="[Email us to downgrade or cancel your plan](mailto:help@tryfeed.co)" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

BillingProfilesSummary.propTypes = {
  organizationArtists: PropTypes.array.isRequired,
  className: PropTypes.string,
}

BillingProfilesSummary.defaultProps = {
  className: '',
}

export default BillingProfilesSummary
