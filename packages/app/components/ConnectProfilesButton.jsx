import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

import * as ROUTES from '@/app/constants/routes'

const ConnectProfilesButton = ({ className }) => {
  return (
    <div className={['h4--text', className].join(' ')}>
      <p className={['mb-0'].join(' ')}>
        <Link
          href={{
            pathname: ROUTES.CONNECT_PROFILES,
          }}
        >
          <a><strong>+ connect more profiles</strong></a>
        </Link>
      </p>
    </div>
  )
}

ConnectProfilesButton.propTypes = {
  className: PropTypes.string,
}

ConnectProfilesButton.defaultProps = {
  className: null,
}


export default ConnectProfilesButton
