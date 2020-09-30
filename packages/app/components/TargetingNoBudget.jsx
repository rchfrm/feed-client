import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/targetingPageCopy'

const TargetingNoBudget = ({ setCurrentView }) => {
  return (
    <div>
      <h2>Getting Started</h2>
      <MarkdownText markdown={copy.noBudgetIntro} />
      <div>
        <Button
          onClick={() => setCurrentView('settings')}
          version="green"
        >
          Start promoting your posts
        </Button>
      </div>
    </div>
  )
}

TargetingNoBudget.propTypes = {
  setCurrentView: PropTypes.func.isRequired,
}

export default TargetingNoBudget
