import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import ArtistImage from '@/elements/ArtistImage'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import * as artistHelpers from '@/app/helpers/artistHelpers'
import * as ROUTES from '@/app/constants/routes'

const ConnectProfilesItem = ({
  profile,
  profiles,
  setSelectedProfile,
  setIsConnecting,
  isConnected,
  className,
}) => {
  const { name, page_id, instagram_username, role } = profile
  const { user } = React.useContext(UserContext)
  const { connectArtists } = React.useContext(ArtistContext)

  const createArtist = async () => {
    setIsConnecting(true)

    const filteredSelectedProfile = Object.entries(profiles).reduce((result, [key, value]) => {
      if (key === profile.page_id) {
        result[key] = value
      }
      return result
    }, {})

    setSelectedProfile(filteredSelectedProfile)

    // Santise URLs
    const artistAccountsSanitised = artistHelpers.sanitiseArtistAccountUrls([profile])
    const { error } = await connectArtists(artistAccountsSanitised, user) || {}

    if (error) {
      setIsConnecting(false)
    }

    Router.push(ROUTES.GET_STARTED)
  }

  const Wrapper = isConnected ? 'div' : 'button'

  return (
    <li
      className={[
        'relative',
        className,
        isConnected ? 'pointer-events-none' : null,
      ].join(' ')}
    >
      <Wrapper onClick={createArtist} className="flex items-center">
        <ArtistImage
          name={name}
          pageId={page_id}
          className="h-16 w-auto rounded-full"
        />
        <div className="ml-4 font-bold font-body text-md text-left">{name}
          {instagram_username && <p className="mb-0 font-normal"> (@{instagram_username})</p>}
          {role && <p className="mb-0 font-normal">({role})</p>}
        </div>
        {!isConnected && <ArrowAltIcon direction="right" className="ml-4" />}
      </Wrapper>
    </li>
  )
}

ConnectProfilesItem.propTypes = {
  profile: PropTypes.object.isRequired,
  profiles: PropTypes.object,
  setSelectedProfile: PropTypes.func,
  setIsConnecting: PropTypes.func,
  isConnected: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

ConnectProfilesItem.defaultProps = {
  profiles: null,
  setSelectedProfile: () => {},
  setIsConnecting: () => {},
  className: null,
}

export default ConnectProfilesItem
