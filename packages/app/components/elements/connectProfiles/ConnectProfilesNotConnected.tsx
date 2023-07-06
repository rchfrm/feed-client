import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { UserContext } from '@/app/contexts/UserContext'
import ConnectProfilesItem from '@/app/elements/connectProfiles/ConnectProfilesItem'
import DisabledSection from '@/app/DisabledSection'
import * as artistHelpers from '@/app/helpers/artistHelpers'
import useBillingStore from '@/app/stores/billingStore'
import { ArtistAccount, Business } from '@/app/elements/connectProfiles/ConnectProfilesList'
import Select from '../../../../shared/components/elements/Select'

const getBillingStoreState = (state) => ({
  organizationArtists: state.organizationArtists,
})

interface ConnectProfilesNotConnectedProps {
  artistAccounts: ArtistAccount[],
  businesses: Business[],
  selectedBusiness: Business,
  setSelectedBusiness: Dispatch<SetStateAction<Business>>,
  setNewArtistName: Dispatch<SetStateAction<string>>,
  setIsConnecting: Dispatch<SetStateAction<boolean>>,
  setErrors: Dispatch<SetStateAction<any[]>>,
  className: string,
}

const ConnectProfilesNotConnected: React.FC<ConnectProfilesNotConnectedProps> = ({
  artistAccounts,
  businesses,
  selectedBusiness,
  setSelectedBusiness,
  setNewArtistName,
  setIsConnecting,
  setErrors,
  className,
}) => {
  const { userLoading } = React.useContext(UserContext)
  const { organizationArtists } = useBillingStore(getBillingStoreState)
  const hasActiveBasicPlan: boolean = organizationArtists.some((artist) => artist.plan === 'basic_monthly' && artist.status === 'active')
  const businessOptions: { name: string, value: string }[] = businesses.map((business) => {
    return {
      name: business.name,
      value: business.id,
    }
  })

  const sortedArtistAccounts = React.useMemo<ArtistAccount[]>(() => {
    return artistHelpers.getSortedArtistAccountsArray(artistAccounts)
  }, [artistAccounts])

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newBusinessId = e.target.value
    if (newBusinessId === selectedBusiness.id) return

    const newSelectedBusiness = businesses.find((business) => business.id === newBusinessId)
    if (! newSelectedBusiness) return

    setSelectedBusiness(newSelectedBusiness)
  }

  if (userLoading) return null

  return (
    <div className={[className].join(' ')}>
      <h2>Connect more</h2>
      <Select selectedValue={selectedBusiness.id} handleChange={handleChange} name="business" options={businessOptions} />
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
