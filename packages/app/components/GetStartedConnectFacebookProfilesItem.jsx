import React from 'react'
import PropTypes from 'prop-types'

const GetStartedConnectFacebookProfilesItem = ({ profile }) => {
  const { picture, name, instagram_username } = profile

  return (
    <div
      className={[
        'w-full sm:w-72 relative',
        '-mt-3 mb-3',
      ].join(' ')}
    >
      <div className="flex items-center">
        <div className="w-12 h-12 mr-4">
          <div className="media media--square mb-4">
            <img
              className={['center--image rounded-full'].join(' ')}
              src={picture}
              alt={`${name} Facebook profile photo`}
            />
          </div>
        </div>
        <div className="font-bold font-body text-md">{name}
          {instagram_username && <p className="mb-0 font-normal"> (@{instagram_username})</p>}
        </div>
      </div>
    </div>
  )
}

GetStartedConnectFacebookProfilesItem.propTypes = {
  profile: PropTypes.object.isRequired,
}

GetStartedConnectFacebookProfilesItem.defaultProps = {
}

export default GetStartedConnectFacebookProfilesItem
