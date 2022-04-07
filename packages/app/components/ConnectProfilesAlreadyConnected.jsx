import React from 'react'
import PropTypes from 'prop-types'

import { UserContext } from '@/app/contexts/UserContext'

import ConnectProfilesItem from '@/app/ConnectProfilesItem'

const ConnectProfilesAlreadyConnected = ({ className }) => {
  const { user, userLoading } = React.useContext(UserContext)
  const { artists: connectedArtists } = user

  if (userLoading || !connectedArtists.length) return null

  console.log(connectedArtists)

  return (
    <div className={[className].join(' ')}>
      <h2>Your profiles</h2>
      <ul className="pl-16">
        {connectedArtists.map((artist) => {
          const { id, name, facebook_page_id, role } = artist

          return (
            <ConnectProfilesItem
              key={id}
              name={name}
              pageId={facebook_page_id}
              role={role}
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
  className: '',
}

export default ConnectProfilesAlreadyConnected
