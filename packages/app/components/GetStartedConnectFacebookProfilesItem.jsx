import React from 'react'
import PropTypes from 'prop-types'

const GetStartedConnectFacebookProfilesItem = ({ profile }) => {
  const { picture, name, instagram_username } = profile

  return (
    <li
      className={[
        'relative',
        'mb-6',
      ].join(' ')}
    >
      <div className="flex items-center">
        {/* IMAGE */}
        <div className="w-16 h-16 mr-8">
          <div className="media media--square mb-4">
            <img
              className={['center--image rounded-full'].join(' ')}
              src={picture}
              alt={`${name} Facebook profile photo`}
            />
          </div>
        </div>
        {/* NAME */}
        <div className="font-bold font-body text-md">{name}
          {instagram_username && <p className="mb-0 font-normal"> (@{instagram_username})</p>}
        </div>
        {/* CONNECT BUTTON */}
        <div className="ml-auto">
          {/* <ToggleSwitch
            state={connect}
            onChange={onConnectClick}
          /> */}
        </div>
      </div>
    </li>
  )
}

GetStartedConnectFacebookProfilesItem.propTypes = {
  profile: PropTypes.object.isRequired,
}

GetStartedConnectFacebookProfilesItem.defaultProps = {
}

export default GetStartedConnectFacebookProfilesItem
