import React from 'react'
import PropTypes from 'prop-types'

import { useAsync } from 'react-async'

import { SidePanelContext } from '@/contexts/SidePanelContext'

import ToggleSwitch from '@/elements/ToggleSwitch'
import Error from '@/elements/Error'

import AdDefaultsStatusConfirmation from '@/app/AdDefaultsStatusConfirmation'

import * as server from '@/app/helpers/appServer'

// Call the server with the new post status
const updatePostSettings = async ({ updatePostStatus, artistId, pendingDefaultPostStatus }) => {
  if (!updatePostStatus) return
  // Toggle all posts on server
  const { success } = await server.toggleDefaultPromotionStatus(artistId, pendingDefaultPostStatus)
  if (!success) return
  // Patch artist post preferences
  await server.patchArtistPromotionStatus(artistId, pendingDefaultPostStatus)
  return pendingDefaultPostStatus
}

const AdDefaultsStatus = ({
  artistId,
  setPostPreferences,
  togglePromotionGlobal,
  defaultPromotionEnabled,
  updatePreferences,
}) => {
  const { setSidePanelLoading } = React.useContext(SidePanelContext)

  // UPDATE POST STATUS SETTINGS
  const [defaultPostStatus, setDefaultPostStatus] = React.useState(defaultPromotionEnabled)
  const [pendingDefaultPostStatus, setPendingDefaultPostStatus] = React.useState(defaultPromotionEnabled)
  const [updatePostStatus, triggerStatusUpdate] = React.useState(false)
  const [showPostStatusConfirmation, setShowPostStatusConfirmation] = React.useState(false)

  // Call this from the radio buttons...
  const updateGlobalStatus = React.useCallback((value) => {
    // Update pending status
    setPendingDefaultPostStatus(value)
    // Show confirmation
    setShowPostStatusConfirmation(true)
  }, [])

  // UPDATE POST STATUS SETTINGS ON SERVER
  // Run this to fetch posts when the artist changes
  const { error, isPending, cancel: cancelUpdatePostSettings } = useAsync({
    promiseFn: updatePostSettings,
    watch: updatePostStatus,
    // The variable(s) to pass to promiseFn
    updatePostStatus,
    pendingDefaultPostStatus,
    artistId,
    // When promise resolves
    onResolve: (newDefaultPostStatus) => {
      triggerStatusUpdate(false)
      if (typeof newDefaultPostStatus === 'boolean') {
        // Update Component status
        setDefaultPostStatus(newDefaultPostStatus)
        // Update artist status
        setPostPreferences('promotion_enabled_default', newDefaultPostStatus)
        // Update controls store
        updatePreferences({
          postsPreferences: {
            defaultPromotionEnabled: newDefaultPostStatus,
          },
        })
        // Update status on all posts
        togglePromotionGlobal(newDefaultPostStatus)
      }
    },
  })

  // Cancel initial run
  React.useEffect(() => {
    cancelUpdatePostSettings()
  }, [cancelUpdatePostSettings])

  // Update loading state on panel while fetching from server
  React.useEffect(() => {
    setSidePanelLoading(isPending)
  }, [isPending, setSidePanelLoading])

  return (
    <div>
      <Error error={error} />
      <div className="w-1/2 xs:w-1/3 sm:w-1/4 md:w-1/3 lg:w-1/4">
        <div className="flex justify-between items-center mb-3">
          <p className="mr-2 mb-0">Posts:</p>
          <ToggleSwitch
            state={defaultPostStatus.post}
            onChange={updateGlobalStatus}
          />
        </div>
        <div className="flex justify-between items-center mb-3">
          <p className="mr-2 mb-0">Stories:</p>
          <ToggleSwitch
            state={defaultPostStatus.post}
            onChange={updateGlobalStatus}
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="mr-2 mb-0">Reels:</p>
          <ToggleSwitch
            state={defaultPostStatus.post}
            onChange={updateGlobalStatus}
          />
        </div>
      </div>
      <AdDefaultsStatusConfirmation
        triggerStatusUpdate={triggerStatusUpdate}
        confirmationOpen={showPostStatusConfirmation}
        dismissConfirmation={() => setShowPostStatusConfirmation(false)}
      />
    </div>
  )
}

AdDefaultsStatus.propTypes = {
  artistId: PropTypes.string.isRequired,
  setPostPreferences: PropTypes.func.isRequired,
  togglePromotionGlobal: PropTypes.func.isRequired,
}

export default AdDefaultsStatus
