import React from 'react'

// IMPORT CONTEXTS
import { ArtistContext } from '@/app/contexts/ArtistContext'
import useControlsStore from '@/app/stores/controlsStore'
import usePostsStore from '@/app/stores/postsStore'
// IMPORT COMPONENTS
import AdSettingsSection from '@/app/AdSettingsSection'
import AdDefaultsStatus from '@/app/AdDefaultsStatus'
import AdDefaultsCallToAction from '@/app/AdDefaultsCallToAction'
import AdDefaultsAdAccount from '@/app/AdDefaultsAdAccount'
import AdDefaultsPixelSelector from '@/app/AdDefaultsPixelSelector'
import AdDefaultsPixelEvent from '@/app/AdDefaultsPixelEvent'
import ControlsContentSection from '@/app/ControlsContentSection'
// IMPORT COPY
import copy from '@/app/copy/controlsPageCopy'

const getTogglePromotionGlobal = state => state.togglePromotionGlobal

const getControlsStoreState = (state) => ({
  postsPreferences: state.postsPreferences,
  conversionsPreferences: state.conversionsPreferences,
  updatePreferences: state.updatePreferences,
  optimizationPreferences: state.optimizationPreferences,
})

const AdDefaults = () => {
  // Get context values
  const { artistId, setPostPreferences } = React.useContext(ArtistContext)
  // Get store values
  const togglePromotionGlobal = usePostsStore(getTogglePromotionGlobal)
  const { postsPreferences, conversionsPreferences, optimizationPreferences, updatePreferences } = useControlsStore(getControlsStoreState)
  const { callToAction: defaultCallToAction, defaultPromotionEnabled } = postsPreferences
  const { facebookPixelEvent } = conversionsPreferences
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'

  return (
    <div>
      <h2>Promotion Settings</h2>
      <ControlsContentSection action="fill in these fields">
        {/* GLOBAL POST STATUS */}
        <AdSettingsSection
          header="Automated post selection"
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
        {/* FB AD ACCOUNT */}
        <AdSettingsSection
          header="Facebook Ad Account"
          copy={copy.facebookAdAccountIntro}
        >
          <AdDefaultsAdAccount
            className="mb-8"
          />
        </AdSettingsSection>
        {/* FB PIXEL */}
        <AdSettingsSection
          header="Facebook Pixel"
          copy={copy.facebookPixelIntro}
        >
          <AdDefaultsPixelSelector />
        </AdSettingsSection>
        {/* FB PIXEL EVENT */}
        {hasSalesObjective && (
          <AdSettingsSection
            header="Facebook Pixel Event"
            copy={copy.facebookPixelEventIntro}
          >
            <AdDefaultsPixelEvent
              facebookPixelEvent={facebookPixelEvent}
              updatePreferences={updatePreferences}
              className="mb-8"
            />
          </AdSettingsSection>
        )}
      </ControlsContentSection>
    </div>
  )
}

export default AdDefaults
