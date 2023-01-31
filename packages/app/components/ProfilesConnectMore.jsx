import React from 'react'
import PropTypes from 'prop-types'
import useHover from '@/app/hooks/useHover'
import Link from 'next/link'
import PlusIcon from '@/icons/PlusIcon'
import * as ROUTES from '@/app/constants/routes'
import brandColors from '@/constants/brandColors'

const ProfilesConnectMore = ({ isExpanded, className }) => {
  const [hoverRef, isHover] = useHover()

  return (
    <Link href={{ pathname: ROUTES.CONNECT_ACCOUNTS }}>
      <a
        className={[
          'flex items-center',
          'w-full',
          'border-b border-solid border-anthracite text-grey no-underline',
          'hover:text-green text-grey',
          isExpanded ? null : 'justify-center',
          className,
        ].join(' ')}
        ref={hoverRef}
      >
        <PlusIcon className="w-5 h-auto" fill={isHover ? brandColors.green : brandColors.greyDark} />
        <p
          className={[
            'text-base mb-0',
            isExpanded ? 'opacity-1 w-auto delay-300 ml-3 transition-opacity' : 'opacity-0 w-0 mr-0',
          ].join(' ')}
        >Connect more
        </p>
      </a>
    </Link>
  )
}

ProfilesConnectMore.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
}

export default ProfilesConnectMore
