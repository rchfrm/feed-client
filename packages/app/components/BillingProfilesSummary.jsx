import React from 'react'
import PropTypes from 'prop-types'

import BillingOpenProfiles from '@/app/BillingOpenProfiles'
import BillingProfilesTransferList from '@/app/BillingProfilesTransferList'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/billingCopy'

import useBillingStore from '@/app/stores/billingStore'

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
        <span>{copy.noProfiles}</span>
      ) : (
        <>
          <MarkdownText markdown={copy.profilesInfo} />
          <ul>
            {artists.map((artist) => (
              <React.Fragment key={artist.id}>
                <li className="flex ml-5 mb-3 last:mb-0">
                  <span>{artist.name}</span>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </>
      )}
      {/* TRANSFER REQUESTS */}
      {filteredTransferRequests.length !== 0 && (
        <>
          <MarkdownText markdown={copy.profileTransferRequests} />
          <BillingProfilesTransferList
            organisationId={organisation.id}
            transferRequests={filteredTransferRequests}
            removeTransferRequest={removeTransferRequest}
            updateOrganisationArtists={updateOrganisationArtists}
          />
        </>
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
