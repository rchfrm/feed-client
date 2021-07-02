import React from 'react'

import MarkdownText from '@/elements/MarkdownText'
import ToggleSwitch from '@/elements/ToggleSwitch'
import Button from '@/elements/Button'

import PostLinksSelect from '@/app/PostLinksSelect'
import PixelEventSelector from '@/app/PixelEventSelector'
import CallToActionSelector from '@/app/CallToActionSelector'

import { defaultPostLinkId } from '@/app/helpers/linksHelpers'
import { updateConversionsPreferences } from '@/app/helpers/conversionsHelpers'

import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import copy from '@/app/copy/controlsPageCopy'

const getControlsStoreState = (state) => ({
  defaultLinkId: state.conversionsPreferences.defaultLinkId,
  conversionsEnabled: state.conversionsEnabled,
  setConversionsEnabled: state.setConversionsEnabled,
  conversionsPreferences: state.conversionsPreferences,
  updatePreferences: state.updatePreferences,
})

const ConversionsSettings = () => {
  const {
    defaultLinkId: linkId,
    conversionsEnabled,
    setConversionsEnabled,
    updatePreferences,
  } = useControlsStore(getControlsStoreState)
  const [defaultLinkId, setDefaultLinkId] = React.useState('')
  const [facebookPixelEvent, setFacebookPixelEvent] = React.useState('')
  const [callToAction, setCallToAction] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const { artist } = React.useContext(ArtistContext)

  // Handle API request and navigate to the next step
  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { res: { preferences }, error } = await updateConversionsPreferences(artist.id, {
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
  }

  return (
    <div className="mb-12">
      <MarkdownText markdown={copy.conversionsTitle} />
      <MarkdownText markdown={copy.conversionsDescription} className="mb-12" />
      <form onSubmit={onSubmit}>
        <div className="flex items-center justify-between rounded-dialogue bg-grey-1 px-3 py-2 mb-12">
          <p className="font-bold mb-0">Enable Conversions</p>
          <ToggleSwitch
            state={conversionsEnabled}
            onChange={() => setConversionsEnabled(!conversionsEnabled)}
          />
        </div>
        <PostLinksSelect
          currentLinkId={linkId || defaultPostLinkId}
          updateParentLink={setDefaultLinkId}
          shouldSaveOnChange={false}
          includeDefaultLink
          includeAddLinkOption
          componentLocation="post"
          label="Default link"
          className="mb-12"
        />
        <PixelEventSelector
          pixelEvent={facebookPixelEvent}
          setPixelEvent={setFacebookPixelEvent}
          className="mb-12"
        />
        <CallToActionSelector
          callToAction={callToAction}
          setCallToAction={setCallToAction}
          className="mb-12"
        />
        <Button
          type="submit"
          version="green"
          className="w-full"
          loading={isLoading}
        >
          Save Conversions Settings
        </Button>
      </form>
    </div>
  )
}

export default ConversionsSettings
