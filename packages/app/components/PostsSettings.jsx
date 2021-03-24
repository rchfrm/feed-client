import React from 'react'

// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/ArtistContext'
import useLinksStore from '@/app/stores/linksStore'
import usePostsStore from '@/app/stores/postsStore'
// IMPORT COMPONENTS
import PostsSettingsSection from '@/app/PostsSettingsSection'
import PostsSettingsDefaultStatus from '@/app/PostsSettingsDefaultStatus'
import PostsSettingsDefaultLink from '@/app/PostsSettingsDefaultLink'
import PostsSettingsLinkTracking from '@/app/PostsSettingsLinkTracking'
import PostSettingsPixelSelector from '@/app/PostSettingsPixelSelector'
// IMPORT COPY
import copy from '@/app/copy/PostsPageCopy'

import sidePanelStyles from '@/app/SidePanel.module.css'

const getTogglePromotionGlobal = state => state.togglePromotionGlobal

const PostsSettings = () => {
  // GET CONTEXTS
  const { artist, artistId, setPostPreferences } = React.useContext(ArtistContext)
  const defaultLink = useLinksStore(React.useCallback((state) => state.defaultLink, []))
  const togglePromotionGlobal = usePostsStore(getTogglePromotionGlobal)
  return (
    <div>
      <h2 className={sidePanelStyles.SidePanel__Header}>Global Post Settings</h2>
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
            setPostPreferences={setPostPreferences}
          />
        </PostsSettingsSection>
        {/* FB PIXEL */}
        <PostsSettingsSection
          header="Facebook Pixel"
          copy={copy.facebookPixelIntro}
        >
          <PostSettingsPixelSelector />
        </PostsSettingsSection>
        {/* LINK TRACKING */}
        <PostsSettingsSection
          header="UTM parameters & tracking"
        >
          <PostsSettingsLinkTracking defaultLink={defaultLink} />
        </PostsSettingsSection>
      </div>
    </div>
  )
}

export default PostsSettings
