import React from 'react'
import PropTypes from 'prop-types'

import GetStartedConnectFacebookProfilesItem from '@/app/GetStartedConnectFacebookProfilesItem'
import GetStartedConnectFacebookConnectButton from '@/app/GetStartedConnectFacebookConnectButton'

const GetStartedConnectFacebookProfilesList = ({ profiles, setIsConnecting, setHasSaved }) => {
  return (
    <div className="flex flex-column items-center">
      <ul>
        {profiles.map((profile) => {
          return (
            <GetStartedConnectFacebookProfilesItem
              key={profile.page_id}
              profile={profile}
            />
          )
        })}
      </ul>
      <GetStartedConnectFacebookConnectButton
        profiles={profiles}
        setIsConnecting={setIsConnecting}
        setHasSaved={setHasSaved}
      />
    </div>
  )
}

GetStartedConnectFacebookProfilesList.propTypes = {
  profiles: PropTypes.array.isRequired,
  setIsConnecting: PropTypes.func.isRequired,
}

GetStartedConnectFacebookProfilesList.defaultProps = {
}

export default GetStartedConnectFacebookProfilesList
