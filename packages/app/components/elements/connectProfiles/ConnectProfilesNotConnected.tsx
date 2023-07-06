import React from 'react'
import { UserContext } from '@/app/contexts/UserContext'
import ConnectProfilesItem from '@/app/elements/connectProfiles/ConnectProfilesItem'
import DisabledSection from '@/app/DisabledSection'
import * as artistHelpers from '@/app/helpers/artistHelpers'
import useBillingStore from '@/app/stores/billingStore'
import { ArtistAccount, Business } from '@/app/elements/connectProfiles/ConnectProfilesList'

const getBillingStoreState = (state) => ({
  organizationArtists: state.organizationArtists,
})

interface ConnectProfilesNotConnectedProps {
  artistAccounts: ArtistAccount[],
  selectedBusiness: Business,
  setNewArtistName: React.Dispatch<React.SetStateAction<string>>,
  setIsConnecting: React.Dispatch<React.SetStateAction<boolean>>,
  setErrors: React.Dispatch<React.SetStateAction<any[]>>,
  className: string,
}

const ConnectProfilesNotConnected: React.FC<ConnectProfilesNotConnectedProps> = ({
  artistAccounts,
  selectedBusiness,
  setNewArtistName,
  setIsConnecting,
  setErrors,
  className,
}) => {
  const { userLoading } = React.useContext(UserContext)
  const { organizationArtists } = useBillingStore(getBillingStoreState)
  const hasActiveBasicPlan: boolean = organizationArtists.some((artist) => artist.plan === 'basic_monthly' && artist.status === 'active')

  const sortedArtistAccounts = React.useMemo<ArtistAccount[]>(() => {
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
                setNewArtistName={setNewArtistName}
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

export default ConnectProfilesNotConnected
