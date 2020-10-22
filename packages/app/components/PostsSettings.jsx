import React from 'react'

// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/ArtistContext'
import usePostsStore from '@/app/hooks/usePostsStore'
// IMPORT ELEMENTS
import MarkdownText from '@/elements/MarkdownText'
// IMPORT COMPONENTS
import PostsSettingsSection from '@/app/PostsSettingsSection'
import PostsSettingsDefaultStatus from '@/app/PostsSettingsDefaultStatus'
import PostsSettingsDefaultLink from '@/app/PostsSettingsDefaultLink'
import PostsSettingsLinkTracking from '@/app/PostsSettingsLinkTracking'
import PostsConnectionsTooltip from '@/app/PostsConnectionsTooltip'
import PostConnections from '@/app/PostConnections'
// IMPORT COPY
import copy from '@/app/copy/PostsPageCopy'

import sidePanelStyles from '@/app/SidePanel.module.css'


const PostsSettings = () => {
  // GET CONTEXTS
  const { artist, artistId, setPostPreferences } = React.useContext(ArtistContext)
  // const { togglePromotionGlobal } = React.useContext(PostsContext)
  const { defaultLink, togglePromotionGlobal } = usePostsStore()
  return (
    <div>
      <h2 className={sidePanelStyles.SidePanel__Header}>Post Settings</h2>
      <div className="content">
        {/* GLOBAL POST STATUS */}
        <PostsSettingsSection
          header="Default Status"
          copy={copy.globalToggleIntro}
        >
          <PostsSettingsDefaultStatus
            artist={artist}
            artistId={artistId}
            setPostPreferences={setPostPreferences}
            togglePromotionGlobal={togglePromotionGlobal}
          />
        </PostsSettingsSection>
        {/* DEFAULT LINK */}
        <PostsSettingsSection
          header="Default Link"
          copy={copy.defaultLinkIntro}
        >
          <PostsSettingsDefaultLink
            className="mb-8"
            defaultLink={defaultLink}
          />
        </PostsSettingsSection>
        {/* LINK TRACKING */}
        <PostsSettingsSection
          header="Link Tracking"
        >
          <PostsSettingsLinkTracking utmOn={false} />
        </PostsSettingsSection>
        {/* CONNECTIONS */}
        <section>
          <h3 className="settingSection__header">Connections</h3>
          <MarkdownText className="settingSection__intro" markdown={copy.globalConnectionsIntro} />
          <PostsConnectionsTooltip className="mb-4 -mt-2" />
          <PostConnections className="pt-5" />
        </section>
      </div>
    </div>
  )
}

export default PostsSettings
