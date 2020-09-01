import React from 'react'
// import PropTypes from 'prop-types'

import { TargetingContext } from '@/app/contexts/TargetingContext'

import { formatCurrency } from '@/helpers/utils'

const TargetingProgressButton = () => {
  // DESTRUCTURE TARGETING CONTEXT
  const {
    currentView,
    selectedCampaignRecc,
    setSelectedCampaignRecc,
    selectedCampaignType,
    minBudget,
    currency,
    saveCampaignSettings,
  } = React.useContext(TargetingContext)
  // IS MOUNTED CONST
  const isMounted = React.useRef(true)
  React.useEffect(() => {
    return () => { isMounted.current = false }
  }, [])
  // SHOULD THE BUTTON BE SHOWN
  const showButton = React.useMemo(() => {
    if (currentView === 'budget') return false
    if (currentView === 'summary' && !selectedCampaignType) return false
    return true
  }, [currentView, selectedCampaignType])
  // DEFINE THE BUTTON TYPE
  const buttonType = React.useMemo(() => {
    if (!showButton) return
    if (currentView === 'summary' && selectedCampaignType === 'recommended') {
      return 'saveRecc'
    }
    if (currentView === 'summary' && selectedCampaignType === 'custom') {
      return 'goToCustomise'
    }
    if (currentView === 'customise') {
      return 'goToBudget'
    }
  }, [showButton, currentView, selectedCampaignType])
  // DEFINE BUTTON TITLE AND SUBTITLE
  const title = React.useMemo(() => {
    if (!showButton) return
    if (buttonType === 'saveRecc') return 'Save'
    if (buttonType === 'goToCustomise') return 'Customise'
    if (buttonType === 'goToBudget') return 'Set Budget'
  }, [showButton, buttonType])
  const subtitle = React.useMemo(() => {
    if (!showButton) return
    if (buttonType === 'saveRecc' && selectedCampaignRecc) {
      return selectedCampaignRecc.title
    }
    if (buttonType === 'goToBudget') {
      const minBudgetString = formatCurrency(minBudget, currency)
      return `min. budget ${minBudgetString}`
    }
    // default
    return ''
  }, [showButton, buttonType, minBudget, currency, selectedCampaignRecc])

  // SAVING RECCOMENDED CAMPAIGN
  const saveSelectedRecc = React.useCallback(async () => {
    await saveCampaignSettings(selectedCampaignRecc)
    if (isMounted.current) {
      setSelectedCampaignRecc(null)
    }
  }, [selectedCampaignRecc, saveCampaignSettings, setSelectedCampaignRecc])

  // HANDLE BUTTON CLICK
  const onClick = React.useMemo(() => {
    if (!showButton) return
    // CLICK SAVES RECC CAMPAIGN
    if (buttonType === 'saveRecc') {
      return saveSelectedRecc
    }
    return () => {}
  }, [showButton, buttonType, saveSelectedRecc])

  if (!showButton) return null

  return (
    <button
      className={[
        'fixed z-30',
        'right-0 bottom-0',
        'mr-6 mb-6',
        'sm:mr-8 sm:mb-20',
        'md:mr-10 md:mb-10',
        'px-8 py-3 bg-green rounded-pill',
        'text-black',
        'shadow-md',
      ].join(' ')}
      onClick={onClick}
    >
      <strong>{title}</strong>
      {subtitle && (
        <>
          <br />
          <span className="text-xs">{subtitle}</span>
        </>
      )}
    </button>
  )
}

TargetingProgressButton.propTypes = {
}

TargetingProgressButton.defaultProps = {
}


export default TargetingProgressButton
