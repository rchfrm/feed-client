import React from 'react'
import PropTypes from 'prop-types'

import { UserContext } from '@/app/contexts/UserContext'

import ArtistImage from '@/elements/ArtistImage'

const ConnectProfilesAlreadyConnected = ({ className }) => {
  const { user, userLoading } = React.useContext(UserContext)
  const { artists: connectedArtists } = user

  if (userLoading || !connectedArtists.length) return null

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <h2>Already Connected</h2>
      <ul>
        {connectedArtists.map((artist) => {
          const { id, name, role, facebook_page_id } = artist
          return (
            <li
              key={id}
              className="flex items-center mb-6 last:mb-0"
            >
              <ArtistImage
                className="h-16 w-auto rounded-full"
                pageId={facebook_page_id}
                name={name}
              />
              <div className="ml-6">
                <p className="mb-1 font-bold">{name}</p>
                <p className="text-sm mb-0">{role}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

ConnectProfilesAlreadyConnected.propTypes = {
  className: PropTypes.string,
}

ConnectProfilesAlreadyConnected.defaultProps = {
  className: null,
}

export default ConnectProfilesAlreadyConnected
