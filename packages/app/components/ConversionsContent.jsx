import React from 'react'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/controlsPageCopy'

import ConversionsSettings from '@/app/ConversionsSettings'
import ConversionsWizard from '@/app/ConversionsWizard'

const ConversionsContent = () => {
  const { artist: { conversions_enabled: conversionsEnabled } } = React.useContext(ArtistContext)
  return (
    <>
      <div className="mb-12">
        <MarkdownText markdown={copy.conversionsTitle} />
        <MarkdownText markdown={copy.conversionsDescription} />
      </div>
      {conversionsEnabled
        ? <ConversionsSettings />
        : <ConversionsWizard />}
    </>
  )
}

ConversionsContent.propTypes = {

}

export default ConversionsContent
