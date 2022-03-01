import React from 'react'
import PropTypes from 'prop-types'

import ArtistImage from '@/elements/ArtistImage'

const GetStartedConnectFacebookConnectedProfileItem = ({ profile }) => {
  const { name, role, facebook_page_id } = profile

  return (
    <li
      className="flex items-center"
    >
      <ArtistImage
        className="h-16 w-auto rounded-full"
        pageId={facebook_page_id}
        name={name}
      />
      <div className="ml-6">
        <p className="mb-1 font-bold">{name}</p>
        <p className="text-sm mb-0">{role}</p>
      </div>
    </li>
  )
}

GetStartedConnectFacebookConnectedProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}

GetStartedConnectFacebookConnectedProfileItem.defaultProps = {
}

export default GetStartedConnectFacebookConnectedProfileItem
