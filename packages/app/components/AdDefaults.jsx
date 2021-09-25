import React from 'react'

// IMPORT CONTEXTS
import { ArtistContext } from '@/app/contexts/ArtistContext'
import useControlsStore from '@/app/stores/controlsStore'
import usePostsStore from '@/app/stores/postsStore'
// IMPORT COMPONENTS
import AdSettingsSection from '@/app/AdSettingsSection'
import AdDefaultsStatus from '@/app/AdDefaultsStatus'
import AdDefaultsLink from '@/app/AdDefaultsLink'
import AdDefaultsCallToAction from '@/app/AdDefaultsCallToAction'
import AdDefaultsPixelSelector from '@/app/AdDefaultsPixelSelector'
// IMPORT COPY
import copy from '@/app/copy/controlsPageCopy'

import sidePanelStyles from '@/app/SidePanel.module.css'

const getTogglePromotionGlobal = state => state.togglePromotionGlobal

const getControlsStoreState = (state) => ({
  defaultLink: state.defaultLink,
  postsPreferences: state.postsPreferences,
  updatePreferences: state.updatePreferences,
})

const AdDefaults = () => {
  // Get context values
  const { artistId, setPostPreferences } = React.useContext(ArtistContext)
  // Get store values
  const togglePromotionGlobal = usePostsStore(getTogglePromotionGlobal)
  const { defaultLink, postsPreferences, updatePreferences } = useControlsStore(getControlsStoreState)
  const { callToAction: defaultCallToAction, defaultPromotionEnabled } = postsPreferences

  return (
    <div>
      <h2 className={sidePanelStyles.SidePanel__Header}>Grow &amp; Nurture Defaults</h2>
      <div className="content">
        {/* GLOBAL POST STATUS */}
        <AdSettingsSection
          header="Automated post selection "
          copy={copy.globalToggleIntro}
        >
          <AdDefaultsStatus
            artistId={artistId}
            setPostPreferences={setPostPreferences}
            togglePromotionGlobal={togglePromotionGlobal}
            defaultPromotionEnabled={defaultPromotionEnabled}
            updatePreferences={updatePreferences}
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
        {/* DEFAULT CALL TO ACTION */}
        <AdSettingsSection
          header="Call to Action"
          copy={copy.defaultCallToActionIntro}
        >
          <AdDefaultsCallToAction
            className="mb-8"
            defaultCallToAction={defaultCallToAction}
            updatePreferences={updatePreferences}
          />
        </AdSettingsSection>
        {/* FB PIXEL */}
        <AdSettingsSection
          header="Facebook Pixel"
          copy={copy.facebookPixelIntro}
        >
          <AdDefaultsPixelSelector />
        </AdSettingsSection>
      </div>
    </div>
  )
}

export default AdDefaults
