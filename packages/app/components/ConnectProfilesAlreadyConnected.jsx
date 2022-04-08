import React from 'react'
import PropTypes from 'prop-types'

import { UserContext } from '@/app/contexts/UserContext'

import ConnectProfilesItem from '@/app/ConnectProfilesItem'

const ConnectProfilesAlreadyConnected = ({ className }) => {
  const { user, userLoading } = React.useContext(UserContext)
  const { artists: connectedArtists } = user

  if (userLoading) return null

  return (
    <div className={[className].join(' ')}>
      <h2>Your profiles</h2>
      <ul className="xs:pl-16">
        {connectedArtists.map((artist) => {
          const { id, name, facebook_page_id, role } = artist

          const profile = {
            name,
            page_id: facebook_page_id,
            role,
          }

          return (
            <ConnectProfilesItem
              key={id}
              profile={profile}
              className="mb-6"
              isConnected
            />
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
