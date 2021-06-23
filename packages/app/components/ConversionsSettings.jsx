import React from 'react'

import MarkdownText from '@/elements/MarkdownText'

import PostLinksSelect from '@/app/PostLinksSelect'
import PixelEventSelector from '@/app/PixelEventSelector'

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

  return (
    <div className="mb-12">
      <MarkdownText markdown={copy.conversionsTitle} />
      <MarkdownText markdown={copy.conversionsDescription} />

      <PixelEventSelector
        pixelEvent={pixelEvent}
        setPixelEvent={setPixelEvent}
      />

      <PostLinksSelect
        currentLinkId={link}
        updateParentLink={setLink}
        shouldSaveOnChange={false}
        includeDefaultLink
        includeAddLinkOption
        componentLocation="post"
        label="Default link"
      />
    </div>
  )
}

ConversionsSettings.propTypes = {

}

export default ConversionsSettings
