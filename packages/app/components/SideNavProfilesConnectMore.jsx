import React from 'react'
import Link from 'next/link'
import * as ROUTES from '@/app/constants/routes'

const SideNavProfilesConnectMore = () => {
  return (
    <Link href={{ pathname: ROUTES.CONNECT_ACCOUNTS }}>
      <a className={[
        'flex justify-center items-center',
        'h-12 w-full',
        'border-b border-solid border-grey-3 text-grey-2 no-underline text-2xl',
      ].join(' ')}
      >
        +
      </a>
    </Link>
  )
}

export default SideNavProfilesConnectMore
