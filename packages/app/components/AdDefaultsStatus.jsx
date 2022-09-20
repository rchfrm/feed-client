import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { SidePanelContext } from '@/contexts/SidePanelContext'

import ToggleSwitch from '@/elements/ToggleSwitch'
import Error from '@/elements/Error'

import AdDefaultsStatusConfirmation from '@/app/AdDefaultsStatusConfirmation'

import { batchTogglePromotionEnabled, updateDefaultPromotionStatus } from '@/app/helpers/artistHelpers'
import { capitalise } from '@/helpers/utils'

const AdDefaultsStatus = ({
  artistId,
  setPostPreferences,
  defaultPromotionEnabled,
  updatePreferences,
}) => {
  const [defaultPostStatus, setDefaultPostStatus] = React.useState(defaultPromotionEnabled)
  const [pendingDefaultPostStatus, setPendingDefaultPostStatus] = React.useState(defaultPromotionEnabled)
  const [postType, setPostType] = React.useState('')
  const [shouldUpdatePostStatus, setShouldUpdatePostStatus] = React.useState(false)
  const [shouldShowPostStatusConfirmation, setShouldShowPostStatusConfirmation] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const postTypes = ['post', 'story', 'reels']
  const { setSidePanelLoading } = React.useContext(SidePanelContext)

  useAsyncEffect(async (isMounted) => {
    if (!shouldUpdatePostStatus) {
      return
    }

    setIsLoading(true)

    const { res: { success } } = await batchTogglePromotionEnabled(artistId, postType, pendingDefaultPostStatus)
    if (!isMounted() || !success) {
      setIsLoading(false)
      return
    }

    const { res: artist, error } = await updateDefaultPromotionStatus(artistId, postType, pendingDefaultPostStatus)
    if (!isMounted()) {
      setIsLoading(false)
      return
    }

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setShouldUpdatePostStatus(false)
    const { promotion_enabled_default_per_type: newDefaultPostStatus } = artist.preferences.posts

    // Update local state
    setDefaultPostStatus(newDefaultPostStatus)

    // Update artist context
    setPostPreferences('promotion_enabled_default', newDefaultPostStatus)

    // Update controls store
    updatePreferences({
      postsPreferences: {
        defaultPromotionEnabled: newDefaultPostStatus,
      },
    })
    setIsLoading(false)
  }, [shouldUpdatePostStatus])

  // Call this on toggle switch change
  const updateGlobalStatus = React.useCallback((value, name) => {
    setPostType(name)

    // Update pending status
    setPendingDefaultPostStatus({
      ...pendingDefaultPostStatus,
      [name]: value,
    })

    setShouldShowPostStatusConfirmation(true)
  }, [pendingDefaultPostStatus])

  React.useEffect(() => {
    setSidePanelLoading(isLoading)
  }, [isLoading, setSidePanelLoading])

  return (
    <div>
      <Error error={error} />
      <div className="w-1/2 xs:w-1/3 sm:w-1/4 md:w-1/3 lg:w-1/4">
        {postTypes.map((type) => (
          <div className="flex justify-between items-center mb-3" key={type}>
            <p className="mr-2 mb-0">{capitalise(type)}</p>
            <ToggleSwitch
              name={type}
              state={defaultPostStatus[type]}
              onChange={updateGlobalStatus}
              isLoading={isLoading && type === postType}
            />
          </div>
        ))}
      </div>
      <AdDefaultsStatusConfirmation
        setShouldUpdatePostStatus={setShouldUpdatePostStatus}
        confirmationOpen={shouldShowPostStatusConfirmation}
        dismissConfirmation={() => setShouldShowPostStatusConfirmation(false)}
      />
    </div>
  )
}

AdDefaultsStatus.propTypes = {
  artistId: PropTypes.string.isRequired,
  setPostPreferences: PropTypes.func.isRequired,
  defaultPromotionEnabled: PropTypes.object.isRequired,
  updatePreferences: PropTypes.func.isRequired,
}

export default AdDefaultsStatus
