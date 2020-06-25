
import React from 'react'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/PricingPageCopy'

function PricingPageContent() {
  return (
    <article>
      <MarkdownText className="h4--text" markdown={copy.copy} />
    </article>
  )
}

export default PricingPageContent
