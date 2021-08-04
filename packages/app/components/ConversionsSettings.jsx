import React from 'react'

import MarkdownText from '@/elements/MarkdownText'
import ToggleSwitch from '@/elements/ToggleSwitch'
import Button from '@/elements/Button'

import PostLinksSelect from '@/app/PostLinksSelect'
import PixelEventSelector from '@/app/PixelEventSelector'
import CallToActionSelector from '@/app/CallToActionSelector'
import DefaultSettingsSavedAlert from '@/app/DefaultSettingsSavedAlert'

import { updateConversionsPreferences } from '@/app/helpers/conversionsHelpers'

import useControlsStore from '@/app/stores/controlsStore'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import copy from '@/app/copy/controlsPageCopy'

const getControlsStoreState = (state) => ({
  conversionsPreferences: state.conversionsPreferences,
  updatePreferences: state.updatePreferences,
  budget: state.budget,
  isSpendingPaused: state.isSpendingPaused,
  canRunConversions: state.canRunConversions,
  setConversionsEnabled: state.setConversionsEnabled,
  conversionsEnabled: state.conversionsEnabled,
})

const ConversionsSettings = () => {
  const {
    conversionsPreferences,
    updatePreferences,
    budget,
    isSpendingPaused,
    canRunConversions,
    setConversionsEnabled,
    conversionsEnabled,
  } = useControlsStore(getControlsStoreState)
  const [defaultLinkId, setDefaultLinkId] = React.useState(conversionsPreferences.defaultLinkId)
  const [facebookPixelEvent, setFacebookPixelEvent] = React.useState(conversionsPreferences.facebookPixelEvent)
  const [callToAction, setCallToAction] = React.useState(conversionsPreferences.callToAction)
  const [isLoading, setIsLoading] = React.useState(false)
  const [showAlert, setShowAlert] = React.useState(false)
  const { artistId } = React.useContext(ArtistContext)
  const hasSufficientBudget = budget >= 5
  const disabled = !conversionsEnabled || !canRunConversions

  const { setSidePanelButton, sidePanelOpen: isSidepanelOpen } = React.useContext(SidePanelContext)
  const isDesktopLayout = useBreakpointTest('md')
  const isMobileAndIsSidePanelOpen = !isDesktopLayout && isSidepanelOpen

  // Handle API request and navigate to the next step
  const saveSettings = React.useCallback(async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { res: { preferences }, error } = await updateConversionsPreferences(artistId, {
      defaultLinkId,
      facebookPixelEvent,
      callToAction,
    })
    setIsLoading(false)

    // Update global store value
    const { conversions } = preferences
    updatePreferences(
      'conversionsPreferences',
      {
        callToAction: conversions.call_to_action,
        facebookPixelEvent: conversions.facebook_pixel_event,
        defaultLinkId: conversions.default_link_id,
      },
    )
    setShowAlert(true)
  }, [artistId, callToAction, facebookPixelEvent, defaultLinkId, updatePreferences])

  // On changing the toggle switch
  const onChange = React.useCallback(() => {
    setConversionsEnabled(!conversionsEnabled)
  }, [conversionsEnabled, setConversionsEnabled])

  const saveButton = React.useMemo(() => (
    <Button
      type="button"
      version="green"
      onClick={saveSettings}
      className={[
        'w-full',
        isMobileAndIsSidePanelOpen ? 'border-white border-solid border-0 border-t-4' : null,
      ].join(' ')}
      loading={isLoading}
      disabled={disabled}
    >
      Save Conversions Settings
    </Button>
  ), [disabled, isLoading, saveSettings, isMobileAndIsSidePanelOpen])

  React.useEffect(() => {
    if (isMobileAndIsSidePanelOpen) {
      setSidePanelButton(saveButton)
    }
  }, [isMobileAndIsSidePanelOpen, setSidePanelButton, saveButton])

  return (
    <div className="mb-12">
      <MarkdownText markdown={copy.conversionsTitle} />
      <MarkdownText markdown={copy.conversionsDescription} className="mb-12" />
      <div
        className={[
          'flex items-center justify-between',
          'rounded-dialogue bg-grey-1',
          'px-3 py-2',
          (!hasSufficientBudget || isSpendingPaused) ? 'border-solid border-2 border-red mb-2' : 'mb-12',
        ].join(' ')}
      >
        <p className="font-bold mb-0">Enable Conversions</p>
        <ToggleSwitch
          state={conversionsEnabled}
          onChange={onChange}
          disabled={!canRunConversions}
        />
      </div>
      {(isSpendingPaused || !hasSufficientBudget) && (
        <MarkdownText markdown={copy.toggleWarning(isSpendingPaused, hasSufficientBudget)} className="text-red font-semibold mb-10" />
      )}
      <PostLinksSelect
        currentLinkId={defaultLinkId}
        updateParentLink={setDefaultLinkId}
        shouldSaveOnChange={false}
        includeDefaultLink
        includeAddLinkOption
        componentLocation="post"
        label="Default link"
        className="mb-12"
        disabled={disabled}
      />
      <PixelEventSelector
        pixelEvent={facebookPixelEvent}
        setPixelEvent={setFacebookPixelEvent}
        className="mb-12"
        disabled={disabled}
      />
      <CallToActionSelector
        callToAction={callToAction}
        setCallToAction={setCallToAction}
        className="mb-12"
        label="Call to Action"
        disabled={disabled}
      />
      {!isMobileAndIsSidePanelOpen && saveButton}
      {/* ALERT */}
      {showAlert && (
        <DefaultSettingsSavedAlert
          show={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
    </div>
  )
}

export default ConversionsSettings
