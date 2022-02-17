import React from 'react'
import PropTypes from 'prop-types'

import GetStartedConnectFacebookProfilesItem from '@/app/GetStartedConnectFacebookProfilesItem'
import GetStartedConnectFacebookConnectButton from '@/app/GetStartedConnectFacebookConnectButton'

import RadioButtons from '@/elements/RadioButtons'

const GetStartedConnectFacebookProfilesList = ({ profiles, setIsConnecting }) => {
  const [selectedProfile, setSelectedProfile] = React.useState(null)

  const profileOptions = profiles.map((profile) => ({
    value: profile.page_id,
    label: <GetStartedConnectFacebookProfilesItem profile={profile} />,
  }))

  const [facebookPageId, setFacebookPageId] = React.useState(profileOptions[0].value)

  const handleChange = (value) => {
    setFacebookPageId(value)
  }

  React.useEffect(() => {
    setSelectedProfile(profiles.find((profile) => profile.page_id === facebookPageId))
  }, [profiles, facebookPageId])

  return (
    <>
      <div className="mt-4">
        <RadioButtons
          options={profileOptions}
          onChange={handleChange}
          selectedValue={facebookPageId}
          trackGroupLabel="Connect profiles"
        />
      </div>
      <GetStartedConnectFacebookConnectButton
        selectedProfile={selectedProfile}
        setIsConnecting={setIsConnecting}
      />
    </>
  )
}

GetStartedConnectFacebookProfilesList.propTypes = {
  profiles: PropTypes.array.isRequired,
  setIsConnecting: PropTypes.func.isRequired,
}

GetStartedConnectFacebookProfilesList.defaultProps = {
}

export default GetStartedConnectFacebookProfilesList
