import React from 'react'
import PropTypes from 'prop-types'

import PostLinksSelect from '@/app/PostLinksSelect'

import linksStore from '@/app/store/linksStore'

import { setDefaultLink } from '@/app/helpers/linksHelpers'

const PostsSettingsDefaultLink = ({
  defaultLink,
  className,
}) => {
  const updateLinksStore = linksStore(state => state.updateLinksStore)
  const onSuccess = React.useCallback((newArtist) => {
    updateLinksStore('updateDefault', { newArtist })
  }, [updateLinksStore])
  return (
    <div
      className={[
        'pr-3 block',
        className,
      ].join(' ')}
    >
      <PostLinksSelect
        currentLinkId={defaultLink.id}
        onSelect={setDefaultLink}
        onSuccess={onSuccess}
        includeAddLinkOption
        componentLocation="defaultLink"
      />
    </div>
  )
}

PostsSettingsDefaultLink.propTypes = {
  defaultLink: PropTypes.object.isRequired,
  className: PropTypes.string,
}

PostsSettingsDefaultLink.defaultProps = {
  className: null,
}


export default PostsSettingsDefaultLink
