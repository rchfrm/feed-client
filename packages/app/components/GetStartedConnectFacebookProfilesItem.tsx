import React, { Dispatch, SetStateAction } from 'react'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import ArrowIcon from '@/icons/ArrowIcon'
import * as artistHelpers from '@/app/helpers/artistHelpers'
import { getLocalStorage } from '@/helpers/utils'
import { ArtistAccount } from '@/app/elements/connectProfiles/ConnectProfilesList'

interface GetStartedConnectFacebookProfilesItemProps {
  profile: ArtistAccount
  setSelectedProfile: Dispatch<SetStateAction<string>>
  setIsConnecting: Dispatch<SetStateAction<boolean>>
}

const GetStartedConnectFacebookProfilesItem: React.FC<GetStartedConnectFacebookProfilesItemProps> = ({
  profile,
  setSelectedProfile,
  setIsConnecting,
}) => {
  const { picture, name, instagram_username } = profile
  const { user } = React.useContext(UserContext)
  const { connectArtist } = React.useContext(ArtistContext)
  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const { plan } = wizardState || {}

  const createArtist = async () => {
    setIsConnecting(true)
    setSelectedProfile(profile.name)

    // Santise URLs
    const artistAccountSanitised = artistHelpers.sanitiseArtistAccountUrls(profile)
    const { error } = await connectArtist(artistAccountSanitised, user, plan) || {}

    if (error) {
      setIsConnecting(false)
    }

    setIsConnecting(false)
  }

  return (
    <button
      className={[
        'w-full sm:w-80 relative',
        'py-2 px-4 mr-6 mb-6',
        'border-2 border-solid border-black rounded-dialogue',
      ].join(' ')}
      onClick={createArtist}
    >
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 mr-4">
          <div className="media media--square">
            <img
              className={['center--image rounded-full'].join(' ')}
              src={picture}
              alt={`${name} Facebook profile photo`}
            />
          </div>
        </div>
        <div className="flex flex-column items-start font-bold font-body text-md">
          <p className="mb-0">{name}</p>
          {instagram_username && <p className="block mb-0  font-normal text-xs"> (@{instagram_username})</p>}
        </div>
        <ArrowIcon
          className="w-7 h-auto ml-3"
          direction="right"
        />
      </div>
    </button>
  )
}

export default GetStartedConnectFacebookProfilesItem
