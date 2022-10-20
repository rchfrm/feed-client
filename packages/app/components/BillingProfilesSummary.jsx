import React from 'react'
import PropTypes from 'prop-types'
import BillingProfilesTransferList from '@/app/BillingProfilesTransferList'
import BillingTransferProfile from '@/app/BillingTransferProfile'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/billingCopy'
import useBillingStore from '@/app/stores/billingStore'
import { capitalise } from '@/helpers/utils'
import LightbulbIcon from '@/icons/LightbulbIcon'
import brandColors from '@/constants/brandColors'

const getBillingStoreState = (state) => ({
  organization: state.organization,
  organizationArtists: state.organizationArtists,
  transferRequests: state.transferRequests,
  removeTransferRequest: state.removeTransferRequest,
  updateOrganizationArtists: state.updateOrganizationArtists,
})

const BillingProfilesSummary = ({
  className,
}) => {
  const {
    organization,
    organizationArtists: artists,
    transferRequests,
    removeTransferRequest,
    updateOrganizationArtists,
  } = useBillingStore(getBillingStoreState)

  const currentArtistIdsHashTable = artists.reduce((result, artist) => {
    result[artist.id] = true
    return result
  }, {})

  const filteredTransferRequests = transferRequests.filter(({ profile_id }) => !currentArtistIdsHashTable[profile_id])

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {/* INTRO */}
      <h2 className="font-body font-bold mb-6">Profiles</h2>
      {/* SUMMARY */}
      <div className="mb-10">
        {artists.length === 0 ? (
          filteredTransferRequests.length === 0 && (
            <span>{copy.noProfiles}</span>
          )
        ) : (
          <>
            <MarkdownText markdown={copy.profilesIntro} />
            <ul>
              {artists.map((artist) => {
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
              <MarkdownText className="mb-0 font-semibold text-insta" markdown="[Email us to downgrade or cancel your subscription](mailto:team@tryfeed.co)" />
            </div>
          </>
        )}
      </div>
      {/* TRANSFER REQUESTS */}
      {filteredTransferRequests.length !== 0 && (
        <BillingProfilesTransferList
          organizationId={organization.id}
          transferRequests={filteredTransferRequests}
          removeTransferRequest={removeTransferRequest}
          updateOrganizationArtists={updateOrganizationArtists}
        />
      )}
      <BillingTransferProfile />
    </div>
  )
}

BillingProfilesSummary.propTypes = {
  className: PropTypes.string,
}

BillingProfilesSummary.defaultProps = {
  className: null,
}

export default BillingProfilesSummary
