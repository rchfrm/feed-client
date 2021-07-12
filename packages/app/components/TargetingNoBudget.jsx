import React from 'react'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/targetingPageCopy'

const TargetingNoBudget = () => {
  return (
    <div>
      <MarkdownText markdown={copy.noBudgetIntro} className="mb-8" />
    </div>
  )
}

TargetingNoBudget.propTypes = {

}

export default TargetingNoBudget
