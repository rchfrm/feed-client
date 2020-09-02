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
    <div
      className={[
        'fixed z-30',
        'left-0 right-0',
        'bottom-0',
        'px-3 mb-20',
        'sm:px-4',
        'md:px-10 md:mb-10',
      ].join(' ')}
    >
      <button
        className={[
          'w-full',
          'px-8 py-3 bg-green',
          'border-2 border-solid border-green',
          'text-black',
          'button--shadow',
        ].join(' ')}
        onClick={onClick}
        style={{
          borderRadius: '10vw',
          paddingBottom: '0.78rem',
        }}
      >
        <strong>{title}</strong>
        {subtitle && (
          <>
            <br />
            <span className="text-xs">{subtitle}</span>
          </>
        )}
      </button>
    </div>
  )
}

TargetingProgressButton.propTypes = {
}

TargetingProgressButton.defaultProps = {
}


export default TargetingProgressButton
