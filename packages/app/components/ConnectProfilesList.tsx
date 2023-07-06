import React from 'react'
import ConnectProfilesAlreadyConnected from '@/app/ConnectProfilesAlreadyConnected'
import ConnectProfilesNotConnected from '@/app/ConnectProfilesNotConnected'
import { Nullable } from 'shared/types/common'

interface ArtistAccount {
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

interface Business {
  id: string,
  name: string,
  profile_picture_uri: Nullable<string>
}

type ConnectProfilesListProps = {
  allArtistAccounts: ArtistAccount[],
  artistAccounts: ArtistAccount[],
  selectedBusiness: Business,
  setSelectedProfile: (profile: any) => void,
  setIsConnecting: React.Dispatch<React.SetStateAction<boolean>>,
  setErrors: React.Dispatch<React.SetStateAction<any[]>>,
}

const ConnectProfilesList: React.FC<ConnectProfilesListProps> = ({
  allArtistAccounts,
  artistAccounts,
  selectedBusiness,
  setSelectedProfile,
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
          setSelectedProfile={setSelectedProfile}
          setIsConnecting={setIsConnecting}
          setErrors={setErrors}
          className="mb-10"
        />
      )}
    </div>
  )
}

export default ConnectProfilesList
