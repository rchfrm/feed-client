import React from 'react'

// IMPORT CONTEXTS
import { ArtistContext } from '@/app/contexts/ArtistContext'
import useControlsStore from '@/app/stores/controlsStore'
import usePostsStore from '@/app/stores/postsStore'
// IMPORT COMPONENTS
import AdSettingsSection from '@/app/AdSettingsSection'
import AdDefaultsStatus from '@/app/AdDefaultsStatus'
import AdDefaultsLink from '@/app/AdDefaultsLink'
import AdDefaultsLinkTracking from '@/app/AdDefaultsLinkTracking'
import PostSettingsPixelSelector from '@/app/PostSettingsPixelSelector'
// IMPORT COPY
import copy from '@/app/copy/PostsPageCopy'

import sidePanelStyles from '@/app/SidePanel.module.css'

const getTogglePromotionGlobal = state => state.togglePromotionGlobal

const PostsSettings = () => {
  // GET CONTEXTS
  const { artist, artistId, setPostPreferences } = React.useContext(ArtistContext)
  const defaultLink = useControlsStore(React.useCallback((state) => state.defaultLink, []))
  const togglePromotionGlobal = usePostsStore(getTogglePromotionGlobal)
  return (
    <div>
      <h2 className={sidePanelStyles.SidePanel__Header}>Ad Defaults</h2>
      <div className="content">
        {/* GLOBAL POST STATUS */}
        <AdSettingsSection
          header="Default Status"
          copy={copy.globalToggleIntro}
        >
          <AdDefaultsStatus
            artist={artist}
            artistId={artistId}
            setPostPreferences={setPostPreferences}
            togglePromotionGlobal={togglePromotionGlobal}
          />
        </AdSettingsSection>
        {/* DEFAULT LINK */}
        <AdSettingsSection
          header="Default Link"
          copy={copy.defaultLinkIntro}
        >
          <AdDefaultsLink
            className="mb-8"
            defaultLink={defaultLink}
            setPostPreferences={setPostPreferences}
          />
        </AdSettingsSection>
        {/* FB PIXEL */}
        <AdSettingsSection
          header="Facebook Pixel"
          copy={copy.facebookPixelIntro}
        >
          <PostSettingsPixelSelector />
        </AdSettingsSection>
        {/* LINK TRACKING */}
        <AdSettingsSection
          header="UTM parameters & tracking"
        >
          <AdDefaultsLinkTracking defaultLink={defaultLink} />
        </AdSettingsSection>
      </div>
    </div>
  )
}

export default PostsSettings
