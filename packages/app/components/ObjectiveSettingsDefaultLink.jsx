import React from 'react'
import PropTypes from 'prop-types'

import LinksSelect from '@/app/LinksSelect'

import { track } from '@/helpers/trackingHelpers'

import useControlsStore from '@/app/stores/controlsStore'

import { setDefaultLink } from '@/app/helpers/linksHelpers'
import { parseUrl } from '@/helpers/utils'

const getControlsStoreState = (state) => ({
  updateLinks: state.updateLinks,
  updatePreferences: state.updatePreferences,
})

const ObjectiveSettingsDefaultLink = ({
  defaultLink,
  setPostPreferences,
  objective,
  label,
  className,
}) => {
  const { updateLinks, updatePreferences } = useControlsStore(getControlsStoreState)
  const { id: defaultLinkId } = defaultLink || {}
  const hasDefaultLink = !! defaultLinkId
  const hasGrowthObjective = objective === 'growth'
  const hasSalesObjective = objective === 'sales'

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
      <LinksSelect
        currentLinkId={defaultLinkId}
        onSelect={setDefaultLink}
        onSuccess={onSuccess}
        includeAddLinkOption
        includeIntegrationLinks={hasGrowthObjective}
        includeLooseLinks={! hasGrowthObjective}
        hasSalesObjective={hasSalesObjective}
        componentLocation="defaultLink"
        label={label}
        className="mb-14"
      />
      {! hasDefaultLink && (
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

ObjectiveSettingsDefaultLink.propTypes = {
  defaultLink: PropTypes.object,
  setPostPreferences: PropTypes.func.isRequired,
  objective: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
}

ObjectiveSettingsDefaultLink.defaultProps = {
  defaultLink: null,
  objective: '',
  label: '',
  className: null,
}

export default ObjectiveSettingsDefaultLink
