import React from 'react'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/controlsPageCopy'

const ConversionsSettings = () => {
  return (
    <div className="mb-12">
      <MarkdownText markdown={copy.conversionsTitle} />
      <MarkdownText markdown={copy.conversionsDescription} />
    </div>
  )
}

ConversionsSettings.propTypes = {

}

export default ConversionsSettings
