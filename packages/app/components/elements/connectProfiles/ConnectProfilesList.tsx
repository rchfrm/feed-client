import React, { Dispatch, SetStateAction } from 'react'
import ConnectProfilesAlreadyConnected from '@/app/elements/connectProfiles/ConnectProfilesAlreadyConnected'
import ConnectProfilesNotConnected from '@/app/elements/connectProfiles/ConnectProfilesNotConnected'
import { Nullable } from 'shared/types/common'

export interface ArtistAccount {
  adaccount_id: Nullable<string>,
  exists: boolean,
  instagram_id: Nullable<string>,
  instagram_username: Nullable<string>,
  location: Nullable<string>,
  name: string,
  page_id: string,
  page_token: string,
  picture: Nullable<string>
}

export interface Business {
  id: string,
  name: string,
  profile_picture_uri: Nullable<string>
}

type ConnectProfilesListProps = {
  allArtistAccounts: ArtistAccount[],
  artistAccounts: ArtistAccount[],
  availableArtistsLoading: boolean,
  businesses: Business[],
  selectedBusiness: Business,
  setSelectedBusiness: Dispatch<SetStateAction<Business>>,
  setNewArtistName: Dispatch<SetStateAction<string>>,
  setIsConnecting: Dispatch<SetStateAction<boolean>>,
  setErrors: Dispatch<SetStateAction<any[]>>,
}

const ConnectProfilesList: React.FC<ConnectProfilesListProps> = ({
  allArtistAccounts,
  artistAccounts,
  availableArtistsLoading,
  businesses,
  selectedBusiness,
  setSelectedBusiness,
  setNewArtistName,
  setIsConnecting,
  setErrors,
}) => {
  return (
    <div className="mb-4">
      <ConnectProfilesAlreadyConnected
        allArtistAccounts={allArtistAccounts}
        className="mb-10"
      />
      {artistAccounts.length > 0 && (
        <ConnectProfilesNotConnected
          artistAccounts={artistAccounts}
          availableArtistsLoading={availableArtistsLoading}
          businesses={businesses}
          selectedBusiness={selectedBusiness}
          setSelectedBusiness={setSelectedBusiness}
          setNewArtistName={setNewArtistName}
          setIsConnecting={setIsConnecting}
          setErrors={setErrors}
          className="mb-10"
        />
      )}
    </div>
  )
}

export default ConnectProfilesList
