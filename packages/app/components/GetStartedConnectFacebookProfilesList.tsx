import React, { Dispatch, SetStateAction } from 'react'
import GetStartedConnectFacebookProfilesItem from '@/app/GetStartedConnectFacebookProfilesItem'
import { ArtistAccount } from '@/app/elements/connectProfiles/ConnectProfilesList'

interface GetStartedConnectFacebookProfilesListProps {
  profiles: ArtistAccount[]
  setSelectedProfile: Dispatch<SetStateAction<string>>
  setIsConnecting: Dispatch<SetStateAction<boolean>>
}

const GetStartedConnectFacebookProfilesList: React.FC<GetStartedConnectFacebookProfilesListProps> = ({
  profiles,
  setIsConnecting,
  setSelectedProfile,
}) => {
  return (
    <>
      <div className={[
        'flex',
        profiles.length > 3 ? 'flex-row flex-wrap' : 'flex-column',
      ].join(' ')}
      >
        {profiles.map((profile) => (
          <GetStartedConnectFacebookProfilesItem
            key={profile.page_id}
            profile={profile}
            setSelectedProfile={setSelectedProfile}
            setIsConnecting={setIsConnecting}
          />
        ))}
      </div>
    </>
  )
}

export default GetStartedConnectFacebookProfilesList
