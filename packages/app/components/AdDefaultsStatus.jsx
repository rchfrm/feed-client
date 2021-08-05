import React from 'react'
import PropTypes from 'prop-types'

import { useAsync } from 'react-async'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import RadioButtons from '@/elements/RadioButtons'
import Error from '@/elements/Error'

import AdDefaultsStatusConfirmation from '@/app/AdDefaultsStatusConfirmation'

import * as server from '@/app/helpers/appServer'

const postSettingOptions = [
  {
    value: true,
    label: 'Yes',
    name: 'posts-enabled',
  },
  {
    value: false,
    label: 'No',
    name: 'posts-disabled',
  },
]

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
  artist,
  artistId,
  setPostPreferences,
  togglePromotionGlobal,
}) => {
  const { setSidePanelLoading } = React.useContext(SidePanelContext)
  // DEFINE INITIAL POST SETTINGS
  const { promotion_enabled_default: initialPostSettings } = artist.preferences.posts
  // UPDATE POST STATUS SETTINGS
  const [defaultPostStatus, setDefaultPostStatus] = React.useState(initialPostSettings)
  const [pendingDefaultPostStatus, setPendingDefaultPostStatus] = React.useState(initialPostSettings)
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
      <RadioButtons
        className="settingSection__options"
        options={postSettingOptions}
        onChange={updateGlobalStatus}
        selectedValue={defaultPostStatus}
        trackGroupLabel="Posts Default Status"
      />
      <AdDefaultsStatusConfirmation
        triggerStatusUpdate={triggerStatusUpdate}
        confirmationOpen={showPostStatusConfirmation}
        dismissConfirmation={() => setShowPostStatusConfirmation(false)}
      />
    </div>
  )
}

AdDefaultsStatus.propTypes = {
  artist: PropTypes.object.isRequired,
  artistId: PropTypes.string.isRequired,
  setPostPreferences: PropTypes.func.isRequired,
  togglePromotionGlobal: PropTypes.func.isRequired,
}

export default AdDefaultsStatus