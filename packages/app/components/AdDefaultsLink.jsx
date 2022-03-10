import React from 'react'
import PropTypes from 'prop-types'

import PostLinksSelect from '@/app/PostLinksSelect'
import ControlsSettingsSectionFooter from '@/app/ControlsSettingsSectionFooter'

import { track } from '@/helpers/trackingHelpers'

import useControlsStore from '@/app/stores/controlsStore'

import { setDefaultLink } from '@/app/helpers/linksHelpers'
import { parseUrl } from '@/helpers/utils'

import copy from '@/app/copy/controlsPageCopy'

const getControlsStoreState = (state) => ({
  updateLinks: state.updateLinks,
  updatePreferences: state.updatePreferences,
})

const AdDefaultsLink = ({
  defaultLink,
  setPostPreferences,
  className,
}) => {
  const { updateLinks, updatePreferences } = useControlsStore(getControlsStoreState)
  const { id: defaultLinkId } = defaultLink
  const hasDefaultLink = !!defaultLinkId

  const onSuccess = React.useCallback((newArtist) => {
    const { preferences: { posts: { default_link_id } } } = newArtist
    // Update controls store
    const newDefaultLink = updateLinks('chooseNewDefaultLink', { newArtist })
    updatePreferences({
      postsPreferences: {
        defaultLinkId: default_link_id,
      },
    })
    // Update artist status
    setPostPreferences('default_link_id', default_link_id)
    // TRACK
    const { host: linkDomain } = parseUrl(newDefaultLink.href)
    track('set_default_link', { linkDomain })
  // eslint-disable-next-line
  }, [updateLinks, setPostPreferences, defaultLink])

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
        className="mb-14"
      />
      <ControlsSettingsSectionFooter copy={copy.defaultLinkFooter} className="text-insta" />
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
