import React from 'react'

// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/ArtistContext'
import useLinksStore from '@/app/hooks/useLinksStore'
// IMPORT COMPONENTS
import PostsSettingsSection from '@/app/PostsSettingsSection'
import PostsSettingsDefaultStatus from '@/app/PostsSettingsDefaultStatus'
import PostsSettingsDefaultLink from '@/app/PostsSettingsDefaultLink'
import PostsSettingsLinkTracking from '@/app/PostsSettingsLinkTracking'
// IMPORT COPY
import copy from '@/app/copy/PostsPageCopy'

import sidePanelStyles from '@/app/SidePanel.module.css'


const PostsSettings = () => {
  // GET CONTEXTS
  const { artist, artistId, setPostPreferences } = React.useContext(ArtistContext)
  // const { togglePromotionGlobal } = React.useContext(PostsContext)
  const { defaultLink, togglePromotionGlobal } = useLinksStore()
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
          <PostsSettingsLinkTracking defaultLink={defaultLink} />
        </PostsSettingsSection>
      </div>
    </div>
  )
}

export default PostsSettings
