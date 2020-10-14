import React from 'react'
import PropTypes from 'prop-types'

import { useAsync } from 'react-async'

// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/ArtistContext'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'
import { PostsContext } from '@/app/contexts/PostsContext'
// IMPORT ELEMENTS
import MarkdownText from '@/elements/MarkdownText'
import RadioButtons from '@/elements/RadioButtons'
import Error from '@/elements/Error'
// IMPORT COMPONENTS
import PostsConnectionsTooltip from '@/app/PostsConnectionsTooltip'
import PostSettingsStatusConfirmation from '@/app/PostSettingsStatusConfirmation'
import PostConnections from '@/app/PostConnections'
import PostsSettingsDefaultLink from '@/app/PostsSettingsDefaultLink'
// IMPORT COPY
import copy from '@/app/copy/PostsPageCopy'
// IMPORT HELPERS
import * as server from '@/app/helpers/appServer'
import { track } from '@/app/helpers/trackingHelpers'

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

const PostsSettings = () => {
  // GET CONTEXTS
  const { artist, artistId, setPostPreferences } = React.useContext(ArtistContext)
  const { setSidePanelLoading } = React.useContext(SidePanelContext)
  const { defaultLink, setDefaultLink, togglePromotionGlobal } = React.useContext(PostsContext)
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
        {/* DEFAULT LINK */}
        <section className={styles.settingSection}>
          <h3 className="settingSection__header">Default Link</h3>
          <MarkdownText className="settingSection__intro" markdown={copy.defaultLinkIntro} />
          <PostsSettingsDefaultLink
            className="mb-8"
            defaultLink={defaultLink}
            setDefaultLink={setDefaultLink}
          />
        </section>
        {/* CONNECTIONS */}
        <div className={styles.settingSection}>
          <h3 className="settingSection__header">Connections</h3>
          <MarkdownText className="settingSection__intro" markdown={copy.globalConnectionsIntro} />
          <PostsConnectionsTooltip className="mb-4 -mt-2" />
          <PostConnections className={styles.connectionsList} />
        </div>
      </div>
      <PostSettingsStatusConfirmation
        triggerStatusUpdate={triggerStatusUpdate}
        confirmationOpen={showPostStatusConfirmation}
        dismissConfirmation={() => setShowPostStatusConfirmation(false)}
      />
    </section>
  )
}

PostsSettings.propTypes = {
}


export default PostsSettings
