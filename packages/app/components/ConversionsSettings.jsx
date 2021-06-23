import React from 'react'

import MarkdownText from '@/elements/MarkdownText'
import ToggleSwitch from '@/elements/ToggleSwitch'

import PostLinksSelect from '@/app/PostLinksSelect'
import PixelEventSelector from '@/app/PixelEventSelector'
import CallToActionSelector from '@/app/CallToActionSelector'

import { defaultPostLinkId } from '@/app/helpers/linksHelpers'

import useControlsStore from '@/app/stores/controlsStore'

import copy from '@/app/copy/controlsPageCopy'

const getControlsStoreState = (state) => ({
  defaultLinkId: state.conversionsPreferences.defaultLinkId,
  conversionsEnabled: state.conversionsEnabled,
  setConversionsEnabled: state.setConversionsEnabled,
})

const ConversionsSettings = () => {
  const {
    defaultLinkId,
    conversionsEnabled,
    setConversionsEnabled,
  } = useControlsStore(getControlsStoreState)
  const [link, setLink] = React.useState(defaultLinkId || defaultPostLinkId)
  const [pixelEvent, setPixelEvent] = React.useState(null)
  const [callToAction, setCallToAction] = React.useState(null)

  return (
    <div className="mb-12">
      <MarkdownText markdown={copy.conversionsTitle} />
      <MarkdownText markdown={copy.conversionsDescription} className="mb-12" />
      <div className="flex items-center justify-between rounded-dialogue bg-grey-1 px-3 py-2 mb-12">
        <p className="font-bold mb-0">Enable Conversions</p>
        <ToggleSwitch
          state={conversionsEnabled}
          onChange={() => setConversionsEnabled(!conversionsEnabled)}
        />
      </div>
      <PostLinksSelect
        currentLinkId={link}
        updateParentLink={setLink}
        shouldSaveOnChange={false}
        includeDefaultLink
        includeAddLinkOption
        componentLocation="post"
        label="Default link"
        className="mb-12"
      />
      <PixelEventSelector
        pixelEvent={pixelEvent}
        setPixelEvent={setPixelEvent}
        className="mb-12"
      />
      <CallToActionSelector
        callToAction={callToAction}
        setCallToAction={setCallToAction}
        className="mb-12"
      />
    </div>
  )
}

export default ConversionsSettings
