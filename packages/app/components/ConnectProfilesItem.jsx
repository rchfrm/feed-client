import React from 'react'
import PropTypes from 'prop-types'

import ArtistImage from '@/elements/ArtistImage'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

const ConnectProfilesItem = ({
  name,
  pageId,
  instagramUsername,
  role,
  isConnected,
  onClick,
  className,
}) => {
  const Wrapper = isConnected ? 'div' : 'button'

  return (
    <li
      className={[
        'relative',
        className,
      ].join(' ')}
    >
      <Wrapper onClick={onClick} className="flex items-center">
        <ArtistImage
          name={name}
          pageId={pageId}
          className="h-16 w-auto rounded-full"
        />
        <div className="ml-4 font-bold font-body text-md">{name}
          {instagramUsername && <p className="mb-0 font-normal"> (@{instagramUsername})</p>}
          {role && <p className="mb-0 font-normal">({role})</p>}
        </div>
        {!isConnected && <ArrowAltIcon direction="right" className="ml-4" />}
      </Wrapper>
    </li>
  )
}

ConnectProfilesItem.propTypes = {
  name: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  instagramUsername: PropTypes.string,
  role: PropTypes.string,
  isConnected: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

ConnectProfilesItem.defaultProps = {
  instagramUsername: '',
  role: '',
  onClick: () => null,
  className: null,
}

export default ConnectProfilesItem
