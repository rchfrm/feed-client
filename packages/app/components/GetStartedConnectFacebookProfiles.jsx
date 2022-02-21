import React from 'react'
import PropTypes from 'prop-types'

import GetStartedConnectFacebookProfilesList from '@/app/GetStartedConnectFacebookProfilesList'

import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import copy from '@/app/copy/getStartedCopy'

const GetStartedConnectFacebookProfiles = ({
  artistAccounts,
  setIsConnecting,
  selectedProfile,
  setSelectedProfile,
  error,
}) => {
  return (
    <>
      <h3 className="mb-4 font-medium text-xl mb-4">{copy.facebookConnectMultipleProfilesSubtitle}</h3>
      <MarkdownText className="sm:w-2/3 text-grey-3 italic" markdown={copy.facebookConnectMultipleProfilesDescription} />
      <Error error={error} />
      <div className="flex flex-1 flex-column justify-center items-center">
        <GetStartedConnectFacebookProfilesList
          profiles={artistAccounts}
          setIsConnecting={setIsConnecting}
          selectedProfile={selectedProfile}
          setSelectedProfile={setSelectedProfile}
        />
      </div>
    </>
  )
}

GetStartedConnectFacebookProfiles.propTypes = {
  artistAccounts: PropTypes.object.isRequired,
  setIsConnecting: PropTypes.func.isRequired,
  selectedProfile: PropTypes.object.isRequired,
  setSelectedProfile: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
}

GetStartedConnectFacebookProfiles.defaultProps = {
}

export default GetStartedConnectFacebookProfiles
