import React from 'react'
import PropTypes from 'prop-types'

import GetStartedConnectFacebookProfilesItem from '@/app/GetStartedConnectFacebookProfilesItem'
import GetStartedConnectFacebookConnectButton from '@/app/GetStartedConnectFacebookConnectButton'

import RadioButtons from '@/elements/RadioButtons'

const GetStartedConnectFacebookProfilesList = ({
  profiles,
  setIsConnecting,
  selectedProfile,
  setSelectedProfile,
}) => {
  const profileOptions = Object.values(profiles).map((profile) => ({
    value: profile.page_id,
    label: <GetStartedConnectFacebookProfilesItem profile={profile} />,
  }))

  const [facebookPageId, setFacebookPageId] = React.useState(profileOptions[0].value)

  const handleChange = (value) => {
    setFacebookPageId(value)
  }

  React.useEffect(() => {
    // Grab the right profile object based on the selected radiobutton value
    const filteredSelectedProfile = Object.entries(profiles).reduce((result, [key, value]) => {
      if (key === facebookPageId) {
        result[key] = value
      }
      return result
    }, {})

    setSelectedProfile(filteredSelectedProfile)
  }, [profiles, facebookPageId, setSelectedProfile])

  return (
    <>
      <div className="mt-4 w-100">
        <RadioButtons
          options={profileOptions}
          onChange={handleChange}
          selectedValue={facebookPageId}
          trackGroupLabel="Connect profiles"
          labelPosition="left"
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
  profiles: PropTypes.object.isRequired,
  setIsConnecting: PropTypes.func.isRequired,
  selectedProfile: PropTypes.object,
  setSelectedProfile: PropTypes.func.isRequired,
}

GetStartedConnectFacebookProfilesList.defaultProps = {
  selectedProfile: null,
}

export default GetStartedConnectFacebookProfilesList
