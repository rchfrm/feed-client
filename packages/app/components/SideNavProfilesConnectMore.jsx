import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import * as ROUTES from '@/app/constants/routes'

const SideNavProfilesConnectMore = ({ className }) => {
  return (
    <div className={['h4--text', className].join(' ')}>
      <p className={['mb-0'].join(' ')}>
        <Link
          href={{
            pathname: ROUTES.CONNECT_ACCOUNTS,
          }}
        >
          <a className="inline-flex no-underline">
            <strong className="pr-2" style={{ transform: 'translateY(0.095rem)' }}>+ </strong>
            <strong>connect more accounts</strong>
          </a>
        </Link>
      </p>
    </div>
  )
}

SideNavProfilesConnectMore.propTypes = {
  className: PropTypes.string,
}

SideNavProfilesConnectMore.defaultProps = {
  className: null,
}

export default SideNavProfilesConnectMore
