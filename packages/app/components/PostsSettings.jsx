import React from 'react'

// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/ArtistContext'
import usePostsStore from '@/app/hooks/usePostsStore'
// IMPORT ELEMENTS
import MarkdownText from '@/elements/MarkdownText'
// IMPORT COMPONENTS
import PostsConnectionsTooltip from '@/app/PostsConnectionsTooltip'
import PostConnections from '@/app/PostConnections'
import PostsSettingsDefaultStatus from '@/app/PostsSettingsDefaultStatus'
import PostsSettingsDefaultLink from '@/app/PostsSettingsDefaultLink'
import PostsSettingsLinkTracking from '@/app/PostsSettingsLinkTracking'
// IMPORT COPY
import copy from '@/app/copy/PostsPageCopy'

import styles from '@/app/PostSettings.module.css'
import sidePanelStyles from '@/app/SidePanel.module.css'


const PostsSettings = () => {
  // GET CONTEXTS
  const { artist, artistId, setPostPreferences } = React.useContext(ArtistContext)
  // const { togglePromotionGlobal } = React.useContext(PostsContext)
  const { defaultLink, togglePromotionGlobal } = usePostsStore()
  return (
    <section>
      <h2 className={sidePanelStyles.SidePanel__Header}>Post Settings</h2>
      <div className="content">
        {/* GLOBAL POST STATE SELECTOR */}
        <div className={styles.settingSection}>
          <h3 className="settingSection__header">Default Status</h3>
          <MarkdownText className="settingSection__intro" markdown={copy.globalToggleIntro} />
          <PostSettingsDefaultStatus
            artist={artist}
            artistId={artistId}
            setPostPreferences={setPostPreferences}
            togglePromotionGlobal={togglePromotionGlobal}
          />
        </div>
        {/* DEFAULT LINK */}
        <section className={styles.settingSection}>
          <h3 className="settingSection__header">Default Link</h3>
          <MarkdownText className="settingSection__intro" markdown={copy.defaultLinkIntro} />
          <PostsSettingsDefaultLink
            className="mb-8"
            defaultLink={defaultLink}
          />
        </section>
        {/* LINK TRACKING */}
        <div className={styles.settingSection}>
          <h3 className="settingSection__header">Link Tracking</h3>
          <MarkdownText className="settingSection__intro" markdown={copy.linkTrackingIntro} />
          <PostsSettingsLinkTracking utmOn={false} />
        </div>
        {/* CONNECTIONS */}
        <div className={styles.settingSection}>
          <h3 className="settingSection__header">Connections</h3>
          <MarkdownText className="settingSection__intro" markdown={copy.globalConnectionsIntro} />
          <PostsConnectionsTooltip className="mb-4 -mt-2" />
          <PostConnections className={styles.connectionsList} />
        </div>
      </div>
    </section>
  )
}

export default PostsSettings
