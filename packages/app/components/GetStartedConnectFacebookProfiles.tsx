import React, { Dispatch, SetStateAction } from 'react'
import GetStartedConnectFacebookProfilesList from '@/app/GetStartedConnectFacebookProfilesList'
import copy from '@/app/copy/getStartedCopy'
import { ArtistAccount } from '@/app/elements/connectProfiles/ConnectProfilesList'

interface GetStartedConnectFacebookProfilesProps {
  artistAccounts: ArtistAccount[]
  setSelectedProfile: Dispatch<SetStateAction<string>>
  setIsConnecting: Dispatch<SetStateAction<boolean>>
}

const GetStartedConnectFacebookProfiles: React.FC<GetStartedConnectFacebookProfilesProps> = ({
  artistAccounts,
  setIsConnecting,
  setSelectedProfile,
}) => {
  return (
    <>
      <h3 className="mb-4 font-medium text-lg mb-4">{copy.facebookConnectMultipleProfilesSubtitle}</h3>
      <div className="flex flex-1 flex-column justify-center items-center">
        <GetStartedConnectFacebookProfilesList
          profiles={artistAccounts}
          setIsConnecting={setIsConnecting}
          setSelectedProfile={setSelectedProfile}
        />
      </div>
    </>
  )
}

export default GetStartedConnectFacebookProfiles
