import React from 'react'
import { useAsync } from 'react-async'

// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/ArtistContext'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'
// IMPORT ELEMENTS
import MarkdownText from '@/elements/MarkdownText'
import RadioButtons from '@/elements/RadioButtons'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
// IMPORT COMPONENTS
import PostSettingsStatusConfirmation from '@/app/PostSettingsStatusConfirmation'
import PostConnections from '@/app/PostConnections'
// IMPORT COPY
import copy from '@/app/copy/PostsPageCopy'
// IMPORT HELPERS
import server from '@/helpers/server'
import { track } from '@/helpers/trackingHelpers'

import styles from '@/app/PostSettings.module.css'
import sidePanelStyles from '@/app/SidePanel.module.css'

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

const PostsSettings = ({ togglePromotionGlobal }) => {
  // GET CONTEXTS
  const { artist, artistId, setPostPreferences } = React.useContext(ArtistContext)
  const { setSidePanelButton, toggleSidePanel, setSidePanelLoading } = React.useContext(SidePanelContext)
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
        // Track
        const actionType = newDefaultPostStatus ? 'enabled' : 'disabled'
        track({
          category: 'Posts',
          action: `Post promotion by default ${actionType}`,
          label: `artistId: ${artistId}`,
        })
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

  // DEFINE SIDEPANEL BUTTON
  const SidepanelButton = React.useCallback(() => {
    return (
      <Button version="green" onClick={toggleSidePanel}>
        Done
      </Button>
    )
  }, [toggleSidePanel])

  React.useEffect(() => {
    setSidePanelButton(SidepanelButton)
  }, [setSidePanelButton, SidepanelButton])

  return (
    <section>
      <h2 className={sidePanelStyles.SidePanel__Header}>Post Settings</h2>
      <div className="content">
        <Error error={error} />
        {/* GLOBAL POST STATE SELECTOR */}
        <div className={styles.settingSection}>
          <h3 className="settingSection__header">Default Status</h3>
          <MarkdownText className="settingSection__intro" markdown={copy.globalToggleIntro} />
          <RadioButtons
            className="settingSection__options"
            buttonOptions={postSettingOptions}
            onChange={updateGlobalStatus}
            selectedValue={defaultPostStatus}
          />
        </div>
        {/* CONNECTIONS */}
        <div className={styles.settingSection}>
          <h3 className="settingSection__header">Connections</h3>
          <MarkdownText className="settingSection__intro" markdown={copy.globalConnectionsIntro} />
          <PostConnections className={styles.connectionsList} />
        </div>
      </div>
      {/* POST STATE CHANGE CONFIRMATION */}
      {showPostStatusConfirmation && (
        <PostSettingsStatusConfirmation
          setConfirmation={setShowPostStatusConfirmation}
          newStatus={pendingDefaultPostStatus}
          triggerStatusUpdate={triggerStatusUpdate}
          setStatus={setDefaultPostStatus}
        />
      )}
    </section>
  )
}

export default PostsSettings
