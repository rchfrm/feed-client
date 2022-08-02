import React from 'react'
import PropTypes from 'prop-types'

import GetStartedConnectFacebookProfilesList from '@/app/GetStartedConnectFacebookProfilesList'

import copy from '@/app/copy/getStartedCopy'

const GetStartedConnectFacebookProfiles = ({
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

GetStartedConnectFacebookProfiles.propTypes = {
  artistAccounts: PropTypes.array.isRequired,
  setIsConnecting: PropTypes.func.isRequired,
  setSelectedProfile: PropTypes.func.isRequired,
}

GetStartedConnectFacebookProfiles.defaultProps = {
}

export default GetStartedConnectFacebookProfiles
