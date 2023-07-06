import React from 'react'
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
  selectedBusiness: Business,
  setNewArtistName: React.Dispatch<React.SetStateAction<string>>,
  setIsConnecting: React.Dispatch<React.SetStateAction<boolean>>,
  setErrors: React.Dispatch<React.SetStateAction<any[]>>,
}

const ConnectProfilesList: React.FC<ConnectProfilesListProps> = ({
  allArtistAccounts,
  artistAccounts,
  selectedBusiness,
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
          selectedBusiness={selectedBusiness}
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
