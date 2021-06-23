import React from 'react'

import MarkdownText from '@/elements/MarkdownText'

import PostLinksSelect from '@/app/PostLinksSelect'
import PixelEventSelector from '@/app/PixelEventSelector'
import CallToActionSelector from '@/app/CallToActionSelector'

import { defaultPostLinkId } from '@/app/helpers/linksHelpers'

import useControlsStore from '@/app/stores/controlsStore'

import copy from '@/app/copy/controlsPageCopy'

const getControlsStoreState = (state) => ({
  defaultLinkId: state.conversionsPreferences.defaultLinkId,
})

const ConversionsSettings = () => {
  const { defaultLinkId } = useControlsStore(getControlsStoreState)
  const [link, setLink] = React.useState(defaultLinkId || defaultPostLinkId)
  const [pixelEvent, setPixelEvent] = React.useState(null)
  const [callToAction, setCallToAction] = React.useState(null)

  return (
    <div className="mb-12">
      <MarkdownText markdown={copy.conversionsTitle} />
      <MarkdownText markdown={copy.conversionsDescription} />
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
