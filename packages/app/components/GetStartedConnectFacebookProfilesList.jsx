import React from 'react'
import PropTypes from 'prop-types'

import GetStartedConnectFacebookProfilesItem from '@/app/GetStartedConnectFacebookProfilesItem'

const GetStartedConnectFacebookProfilesList = ({
  profiles,
  setIsConnecting,
  setSelectedProfile,
}) => {
  return (
    <>
      <div className={[
        'flex',
        Object.keys(profiles).length > 3 ? 'flex-row flex-wrap' : 'flex-column',
      ].join(' ')}
      >
        {Object.values(profiles).map((profile) => (
          <GetStartedConnectFacebookProfilesItem
            key={profile.id}
            profile={profile}
            profiles={profiles}
            setSelectedProfile={setSelectedProfile}
            setIsConnecting={setIsConnecting}
          />
        ))}
      </div>
    </>
  )
}

GetStartedConnectFacebookProfilesList.propTypes = {
  profiles: PropTypes.object.isRequired,
  setIsConnecting: PropTypes.func.isRequired,
  setSelectedProfile: PropTypes.func.isRequired,
}

GetStartedConnectFacebookProfilesList.defaultProps = {
}

export default GetStartedConnectFacebookProfilesList
