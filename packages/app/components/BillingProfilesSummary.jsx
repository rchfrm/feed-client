import React from 'react'
import PropTypes from 'prop-types'
import BillingOpenProfiles from '@/app/BillingOpenProfiles'
import BillingProfilesTransferList from '@/app/BillingProfilesTransferList'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/billingCopy'
import useBillingStore from '@/app/stores/billingStore'
import { capitalise } from '@/helpers/utils'
import LightbulbIcon from '@/icons/LightbulbIcon'
import brandColors from '@/constants/brandColors'

const getBillingStoreState = (state) => ({
  organisation: state.organisation,
  organisationArtists: state.organisationArtists,
  transferRequests: state.transferRequests,
  removeTransferRequest: state.removeTransferRequest,
  updateOrganisationArtists: state.updateOrganisationArtists,
})

const BillingProfilesSummary = ({
  className,
}) => {
  const {
    organisation,
    organisationArtists: artists,
    transferRequests,
    removeTransferRequest,
    updateOrganisationArtists,
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
      <h3 className="font-body font-bold mb-6">Profiles</h3>
      {/* SUMMARY */}
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
                <React.Fragment key={artist.id}>
                  <li className="flex ml-5 mb-3 last:mb-0 items-center gap-2">
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
                </React.Fragment>
              )
            })}
          </ul>
          <div className="flex items-center mb-4">
            <LightbulbIcon className="flex-none h-auto mr-2 w-3" fill={brandColors.instagram.bg} />
            <MarkdownText className="mb-0 bold text-insta" markdown="[Email us to downgrade or cancel your subscription](mailto:team@tryfeed.co)" />
          </div>
        </>
      )}
      {/* TRANSFER REQUESTS */}
      {filteredTransferRequests.length !== 0 && (
        <BillingProfilesTransferList
          organisationId={organisation.id}
          transferRequests={filteredTransferRequests}
          removeTransferRequest={removeTransferRequest}
          updateOrganisationArtists={updateOrganisationArtists}
        />
      )}
      {/* BUTTON (MANAGE PROFILES) */}
      {artists.length !== 0 && <BillingOpenProfiles className="pt-2" />}
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
