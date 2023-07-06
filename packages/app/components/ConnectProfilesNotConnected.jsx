import React from 'react'
import PropTypes from 'prop-types'
import { UserContext } from '@/app/contexts/UserContext'
import ConnectProfilesItem from '@/app/ConnectProfilesItem'
import DisabledSection from '@/app/DisabledSection'
import * as artistHelpers from '@/app/helpers/artistHelpers'
import useBillingStore from '@/app/stores/billingStore'

const getBillingStoreState = (state) => ({
  organizationArtists: state.organizationArtists,
})

const ConnectProfilesNotConnected = ({
  artistAccounts,
  selectedBusiness,
  setSelectedProfile,
  setIsConnecting,
  setErrors,
  className,
}) => {
  const { userLoading } = React.useContext(UserContext)
  const { organizationArtists } = useBillingStore(getBillingStoreState)
  const hasActiveBasicPlan = organizationArtists.some((artist) => artist.plan === 'basic_monthy' && artist.status === 'active')

  const sortedArtistAccounts = React.useMemo(() => {
    return artistHelpers.getSortedArtistAccountsArray(artistAccounts)
  }, [artistAccounts])

  if (userLoading) return null

  return (
    <div className={[className].join(' ')}>
      <h2>Connect more</h2>
      {selectedBusiness && (<p>{selectedBusiness.name}</p>)}
      <DisabledSection
        section="connect-accounts"
        isDisabled={hasActiveBasicPlan}
      >
        <ul className="xs:pl-16">
          {sortedArtistAccounts.map((artistAccount) => {
            return (
              <ConnectProfilesItem
                key={artistAccount.page_id}
                profile={artistAccount}
                setSelectedProfile={setSelectedProfile}
                setIsConnecting={setIsConnecting}
                isConnected={false}
                setErrors={setErrors}
                className="mb-6"
              />
            )
          })}
        </ul>
      </DisabledSection>
    </div>
  )
}

ConnectProfilesNotConnected.propTypes = {
  artistAccounts: PropTypes.array.isRequired,
  selectedBusiness: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profile_picture_uri: PropTypes.string,
  }),
  setSelectedProfile: PropTypes.func.isRequired,
  setIsConnecting: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
}

ConnectProfilesNotConnected.defaultProps = {
  selectedBusiness: undefined,
}

export default ConnectProfilesNotConnected
