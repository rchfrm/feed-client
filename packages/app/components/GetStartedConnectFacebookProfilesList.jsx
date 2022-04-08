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

GetStartedConnectFacebookProfilesList.propTypes = {
  profiles: PropTypes.array.isRequired,
  setIsConnecting: PropTypes.func.isRequired,
  setSelectedProfile: PropTypes.func.isRequired,
}

GetStartedConnectFacebookProfilesList.defaultProps = {
}

export default GetStartedConnectFacebookProfilesList
