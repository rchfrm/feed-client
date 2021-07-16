import React from 'react'
import PropTypes from 'prop-types'

import PostLinksSelect from '@/app/PostLinksSelect'

import { track } from '@/app/helpers/trackingHelpers'

import useControlsStore from '@/app/stores/controlsStore'

import { setDefaultLink } from '@/app/helpers/linksHelpers'
import { parseUrl } from '@/helpers/utils'

const AdDefaultsLink = ({
  defaultLink,
  setPostPreferences,
  className,
}) => {
  const updateControlsStore = useControlsStore(state => state.updateControlsStore)
  const { id: defaultLinkId } = defaultLink
  const hasDefaultLink = !!defaultLinkId

  const onSuccess = React.useCallback((newArtist) => {
    // UPDATE STORE
    const newDefaultLink = updateControlsStore('chooseNewDefaultLink', { newArtist })
    // Update artist status
    const { preferences: { posts: { default_link_id } } } = newArtist
    setPostPreferences('default_link_id', default_link_id)
    // TRACK
    const { host: linkDomain } = parseUrl(newDefaultLink.href)
    track('set_default_link', { linkDomain })
  // eslint-disable-next-line
  }, [updateControlsStore, setPostPreferences, defaultLink])

  return (
    <div
      className={[
        'block relative',
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

AdDefaultsLink.propTypes = {
  defaultLink: PropTypes.object.isRequired,
  setPostPreferences: PropTypes.func.isRequired,
  className: PropTypes.string,
}

AdDefaultsLink.defaultProps = {
  className: null,
}


export default AdDefaultsLink
