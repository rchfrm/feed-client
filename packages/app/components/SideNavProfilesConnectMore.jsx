import React from 'react'
import Link from 'next/link'
import * as ROUTES from '@/app/constants/routes'

const SideNavProfilesConnectMore = () => {
  return (
    <Link href={{ pathname: ROUTES.CONNECT_ACCOUNTS }}>
      <a className={[
        'flex justify-center items-center',
        'h-12 w-full',
        'border-b border-solid border-grey-3 text-white no-underline',
      ].join(' ')}
      >
        <strong className="text-2xl">+</strong>
      </a>
    </Link>
  )
}

export default SideNavProfilesConnectMore
