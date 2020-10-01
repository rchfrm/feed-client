import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/targetingPageCopy'

const TargetingNoBudget = ({ setCurrentView }) => {
  return (
    <div>
      <MarkdownText markdown={copy.noBudgetIntro} className="mb-8" />
      <div>
        <Button
          onClick={() => setCurrentView('settings')}
          version="green"
          className="text-xl"
        >
          Get Started
        </Button>
      </div>
    </div>
  )
}

TargetingNoBudget.propTypes = {
  setCurrentView: PropTypes.func.isRequired,
}

export default TargetingNoBudget
