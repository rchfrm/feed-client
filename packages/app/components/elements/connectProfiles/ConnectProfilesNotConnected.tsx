import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { UserContext } from '@/app/contexts/UserContext'
import ConnectProfilesItem from '@/app/elements/connectProfiles/ConnectProfilesItem'
import DisabledSection from '@/app/DisabledSection'
import * as artistHelpers from '@/app/helpers/artistHelpers'
import useBillingStore from '@/app/stores/billingStore'
import { ArtistAccount, Business } from '@/app/elements/connectProfiles/ConnectProfilesList'
import Select from '../../../../shared/components/elements/Select'
import Input from '../../../../shared/components/elements/Input'

const getBillingStoreState = (state) => ({
  organizationArtists: state.organizationArtists,
})

interface ConnectProfilesNotConnectedProps {
  artistAccounts: ArtistAccount[],
  availableArtistsLoading: boolean,
  searchQuery?: string,
  setSearchQuery: Dispatch<SetStateAction<string>>
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
  availableArtistsLoading,
  searchQuery,
  setSearchQuery,
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

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const newBusinessId = e.target.value
    if (newBusinessId === selectedBusiness.id) return

    const newSelectedBusiness = businesses.find((business) => business.id === newBusinessId)
    if (! newSelectedBusiness) return

    setSelectedBusiness(newSelectedBusiness)
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value
    if (newSearchQuery === searchQuery) return

    setSearchQuery(newSearchQuery)
  }

  if (userLoading) return null

  return (
    <div className={[className].join(' ')}>
      <h2>Connect more</h2>
      {businesses.length > 1 && (
        <Select label="Select Facebook business" selectedValue={selectedBusiness.id} handleChange={handleSelect} name="business" options={businessOptions} loading={availableArtistsLoading} />

      )}
      {businesses.length > 0 && (
        <>
          <Input label="Search by name" name="search" value={searchQuery} handleChange={handleInput} />
          {availableArtistsLoading ? (
            <p>{`Searching${searchQuery && ` for ${searchQuery}`}...`}</p>
          ) : (
            <p>{`Found ${artistAccounts.length} result${artistAccounts.length === 1 ? '' : 's'}${searchQuery && ` for "${searchQuery}"`}.`}</p>
          )}
        </>
      )}
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
