import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import * as ROUTES from '@/app/constants/routes'

const SideNavProfilesConnectMore = ({ isExpanded }) => {
  return (
    <Link href={{ pathname: ROUTES.CONNECT_ACCOUNTS }}>
      <a className={[
        'flex items-center',
        'h-12 w-full',
        'border-b border-solid border-grey-3 text-grey-2 no-underline text-2xl',
        'hover:text-green text-grey-2',
        isExpanded ? 'justify-start' : 'justify-center',
      ].join(' ')}
      >
        {isExpanded && (
          <p className="text-base mr-2 mb-0">Connect more</p>
        )}
        +
      </a>
    </Link>
  )
}

SideNavProfilesConnectMore.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
}

export default SideNavProfilesConnectMore
