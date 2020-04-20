
import React from 'react'
import MarkdownText from './elements/MarkdownText'
import copy from '../copy/PricingPageCopy'

function PricingPageContent() {
  return (
    <div className="page--content">
      <MarkdownText className="h4--text" markdown={copy.copy} />
    </div>
  )
}

export default PricingPageContent
