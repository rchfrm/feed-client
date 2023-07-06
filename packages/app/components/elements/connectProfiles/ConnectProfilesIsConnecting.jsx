import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '@/elements/Spinner'

const ConnectProfilesIsConnecting = ({ profile, className }) => {
  return (
    <div className={[
      'flex flex-1 flex-column justify-center items-center',
      className,
    ].join(' ')}
    >
      <Spinner className="flex-none mb-10" />
      <div className="max-w-sm text-center">
        Setting up
        {' '}
        <div className="inline">
          <span className="font-bold">{profile.name}</span>
        </div>
        ...
      </div>
    </div>
  )
}

ConnectProfilesIsConnecting.propTypes = {
  profile: PropTypes.object,
  className: PropTypes.string,
}

ConnectProfilesIsConnecting.defaultProps = {
  profile: {},
  className: null,
}

export default ConnectProfilesIsConnecting
