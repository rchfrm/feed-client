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
import AdDefaultsPixelSelector from '@/app/AdDefaultsPixelSelector'
import CallToActionSelector from '@/app/CallToActionSelector'
// IMPORT COPY
import copy from '@/app/copy/controlsPageCopy'

import { setDefaultCallToAction } from '@/app/helpers/adDefaultsHelpers'

import sidePanelStyles from '@/app/SidePanel.module.css'

const getTogglePromotionGlobal = state => state.togglePromotionGlobal

const getControlsStoreState = (state) => ({
  defaultLink: state.defaultLink,
  postsPreferences: state.postsPreferences,
  updatePreferences: state.updatePreferences,
})

const AdDefaults = () => {
  // Get context values
  const { artist, artistId, setPostPreferences } = React.useContext(ArtistContext)
  // Get store values
  const togglePromotionGlobal = usePostsStore(getTogglePromotionGlobal)
  const { defaultLink, postsPreferences, updatePreferences } = useControlsStore(getControlsStoreState)
  const { callToAction: currentCallToAction } = postsPreferences
  // Set local state
  const [callToAction, setCallToAction] = React.useState(currentCallToAction)

  const handleSuccess = (newCallToAction) => {
    setCallToAction(newCallToAction)
    // Update store value
    updatePreferences(
      'postsPreferences',
      { callToAction: newCallToAction },
    )
  }

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
        {/* DEFAULT CALL TO ACTION */}
        <AdSettingsSection
          header="Call to Action"
          copy={copy.defaultCallToActionIntro}
        >
          <CallToActionSelector
            onSelect={setDefaultCallToAction}
            onSuccess={handleSuccess}
            callToAction={callToAction}
            setCallToAction={setCallToAction}
            shouldSaveOnChange
          />
        </AdSettingsSection>
        {/* FB PIXEL */}
        <AdSettingsSection
          header="Facebook Pixel"
          copy={copy.facebookPixelIntro}
        >
          <AdDefaultsPixelSelector />
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

export default AdDefaults
