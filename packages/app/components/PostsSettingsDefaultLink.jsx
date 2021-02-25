import React from 'react'
import PropTypes from 'prop-types'

import PostLinksSelect from '@/app/PostLinksSelect'

import { track } from '@/app/helpers/trackingHelpers'

import useLinksStore from '@/app/store/linksStore'

import { setDefaultLink } from '@/app/helpers/linksHelpers'

const PostsSettingsDefaultLink = ({
  defaultLink,
  setPostPreferences,
  className,
}) => {
  const updateLinksStore = useLinksStore(state => state.updateLinksStore)
  const { id: defaultLinkId } = defaultLink
  const hasDefaultLink = !!defaultLinkId

  const onSuccess = React.useCallback((newArtist) => {
    // TRACK
    if (!hasDefaultLink) {
      track({
        action: 'set_default_link',
        category: 'links',
      })
    } else {
      track({
        action: 'change_default_link',
        category: 'links',
      })
    }
    // UPDATE STORE
    updateLinksStore('chooseNewDefaultLink', { newArtist })
    // Update artist status
    const { preferences: { posts: { default_link_id } } } = newArtist
    setPostPreferences('default_link_id', default_link_id)
  // eslint-disable-next-line
  }, [updateLinksStore, setPostPreferences, defaultLink])
  return (
    <div
      className={[
        'block relative pr-3',
        className,
      ].join(' ')}
    >
      <PostLinksSelect
        currentLinkId={defaultLinkId}
        onSelect={setDefaultLink}
        onSuccess={onSuccess}
        includeAddLinkOption
        componentLocation="defaultLink"
      />
      {!hasDefaultLink && (
        <div
          className={[
            'absolute top-0 right-0',
            'mr-1 -mt-2',
            'w-4 h-4',
            'bg-red rounded-full',
          ].join(' ')}
        />
      )}
    </div>
  )
}

PostsSettingsDefaultLink.propTypes = {
  defaultLink: PropTypes.object.isRequired,
  setPostPreferences: PropTypes.func.isRequired,
  className: PropTypes.string,
}

PostsSettingsDefaultLink.defaultProps = {
  className: null,
}


export default PostsSettingsDefaultLink
