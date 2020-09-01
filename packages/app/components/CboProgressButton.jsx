import React from 'react'
// import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import { CboContext } from '@/app/contexts/CboContext'

import { formatCurrency } from '@/helpers/utils'

const CboProgressButton = () => {
  // DESTRUCTURE CBO CONTEXT
  const {
    currentView,
    selectedCampaignType,
    minBudget,
    currency,
  } = React.useContext(CboContext)
  // SHOULD THE BUTTON BE SHOWN
  const showButton = React.useMemo(() => {
    if (currentView === 'budget') return false
    if (currentView === 'summary' && !selectedCampaignType) return false
    return true
  }, [currentView, selectedCampaignType])
  // DEFINE BUTTON TITLE AND SUBTITLE
  const title = React.useMemo(() => {
    if (!showButton) return
    if (currentView === 'customise') return 'Set Budget'
    if (selectedCampaignType === 'custom') return 'Customise'
    if (selectedCampaignType === 'recommended') return 'Save'
  }, [currentView, selectedCampaignType, showButton])
  const subtitle = React.useMemo(() => {
    if (!showButton) return
    if (currentView !== 'customise') return null
    const minBudgetString = formatCurrency(minBudget, currency)
    return `min. budget ${minBudgetString}`
  }, [minBudget, currentView, currency, showButton])

  if (!showButton) return null

  return (
    <Button
      className={[
        'fixed z-30',
        'right-0 bottom-0',
        'mr-6 mb-6',
        'sm:mr-8 sm:mb-20',
        'md:mr-10 md:mb-10',
        'p-5 bg-green rounded-pill',
        'text-black',
        'shadow-md',
      ].join(' ')}
    >
      {title}
    </Button>
  )
}

CboProgressButton.propTypes = {
}

CboProgressButton.defaultProps = {
}


export default CboProgressButton
