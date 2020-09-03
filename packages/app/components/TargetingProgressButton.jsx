import React from 'react'
// import PropTypes from 'prop-types'

import useAnimateOnMount from '@/hooks/useAnimateOnMount'

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

  // ANIMATE
  // Define animation config
  const animateToFrom = {
    y: { from: 10, to: 0 },
    scaleX: { from: 0.95, to: 1 },
    opacity: { from: 0, to: 1 },
  }
  // Setup animation hook
  const animatedDiv = useAnimateOnMount({
    animateToFrom,
    animationOptions: {
      duration: [0.4, 0.2],
      ease: ['back.out(2)', 'power1.out'],
    },
    initial: 'visible',
  })
  // Trigger animation
  React.useEffect(() => {
    if (showButton) return animatedDiv.showPresence()
    animatedDiv.hidePresence()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showButton])

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
  const [title, setTitle] = React.useState('')
  const [subtitle, setSubtitle] = React.useState('')
  const getTitle = () => {
    if (!showButton) return
    if (buttonType === 'saveRecc') return 'Save'
    if (buttonType === 'goToCustomise') return 'Customise'
    if (buttonType === 'goToBudget') return 'Set Budget'
  }
  const getSubtitle = React.useCallback((previousSubtitle) => {
    if (!showButton) return
    if (buttonType === 'saveRecc' && !selectedCampaignRecc) {
      return previousSubtitle
    }
    if (buttonType === 'saveRecc' && selectedCampaignRecc) {
      return selectedCampaignRecc.title
    }
    if (buttonType === 'goToBudget') {
      const minBudgetString = formatCurrency(minBudget, currency)
      return `min. budget ${minBudgetString}`
    }
  }, [showButton, buttonType, selectedCampaignRecc, minBudget, currency])
  React.useEffect(() => {
    if (!showButton) return
    const newTitle = getTitle()
    const newSubtitle = getSubtitle(subtitle)
    setTitle(newTitle)
    setSubtitle(newSubtitle)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showButton, buttonType, getSubtitle])


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

  return (
    <>
      {animatedDiv.isRendered && (
        <div
          className={[
            'fixed z-30',
            'left-0 right-0',
            'bottom-0',
            'px-3 mb-20',
            'sm:px-4',
            'md:px-10 md:mb-10',
          ].join(' ')}
          ref={animatedDiv.ref}
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
            {title && (<strong>{title}</strong>)}
            {subtitle && (
            <>
              <br />
              <span className="text-xs">{subtitle}</span>
            </>
            )}
          </button>
        </div>
      )}
    </>
  )
}

TargetingProgressButton.propTypes = {
}

TargetingProgressButton.defaultProps = {
}


export default TargetingProgressButton
