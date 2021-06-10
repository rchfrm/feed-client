import React from 'react'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/controlsPageCopy'

import ConversionsSettings from '@/app/ConversionsSettings'
import ConversionsWizard from '@/app/ConversionsWizard'

const ConversionsContent = () => {
  const { artist: { preferences } } = React.useContext(ArtistContext)
  const hasSetUpConversions = Object.values(preferences.conversions).every(Boolean)
  return (
    <>
      <div className="mb-12">
        <MarkdownText markdown={copy.conversionsTitle} />
        <MarkdownText markdown={copy.conversionsDescription} />
      </div>
      {hasSetUpConversions
        ? <ConversionsSettings />
        : <ConversionsWizard />}
    </>
  )
}

ConversionsContent.propTypes = {

}

export default ConversionsContent
