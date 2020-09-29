import React from 'react'
// import PropTypes from 'prop-types'

import useAnimateOnMount from '@/hooks/useAnimateOnMount'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import { TargetingContext } from '@/app/contexts/TargetingContext'

import { formatCurrency } from '@/helpers/utils'

const TargetingProgressButton = () => {
  // DESTRUCTURE TARGETING CONTEXT
  const {
    targetingState,
    currentView,
    selectedCampaignRecc,
    setSelectedCampaignRecc,
    selectedCampaignType,
    minReccBudget,
    currency,
    currencyOffset,
    saveCampaignSettings,
    setCurrentView,
    isAnimatingView,
    toggleMobileBudget,
    mobileBudgetOpen,
    disableSaving,
  } = React.useContext(TargetingContext)
  // IS MOUNTED CONST
  const isMounted = React.useRef(true)
  React.useEffect(() => {
    return () => { isMounted.current = false }
  }, [])
  // SHOULD THE BUTTON BE SHOWN
  const [forceHideButton, setForceHideButton] = React.useState(false)
  const showButton = React.useMemo(() => {
    if (forceHideButton) return false
    if (mobileBudgetOpen) return false
    if (disableSaving === 'location') return false
    if (currentView === 'summary' && selectedCampaignType) return true
    if (currentView === 'customise') return true
    return false
  }, [forceHideButton, mobileBudgetOpen, disableSaving, currentView, selectedCampaignType])

  React.useEffect(() => {
    if (!isAnimatingView) {
      setForceHideButton(false)
    }
  }, [isAnimatingView])

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
    initial: 'hidden',
  })
  // Trigger animation
  React.useEffect(() => {
    // SHOW BUTTON
    if (showButton) {
      animatedDiv.showPresence()
      return
    }
    // HIDE BUTTON
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
    if (buttonType === 'goToCustomise') return 'Next'
    if (buttonType === 'goToBudget') return 'Set Budget'
  }
  const getSubtitle = React.useCallback((previousSubtitle) => {
    if (!showButton) return
    const isReccButton = buttonType === 'saveRecc' || buttonType === 'goToCustomise'
    if (isReccButton && !selectedCampaignRecc) {
      return previousSubtitle
    }
    if (buttonType === 'saveRecc' && selectedCampaignRecc) {
      return selectedCampaignRecc.title
    }
    if (buttonType === 'goToCustomise' && selectedCampaignRecc) {
      return 'Select your custom settings'
    }
    if (buttonType === 'goToBudget') {
      const minReccBudgetString = formatCurrency(minReccBudget / currencyOffset, currency)
      return `suggested min: ${minReccBudgetString}`
    }
  }, [showButton, buttonType, selectedCampaignRecc, minReccBudget, currency, currencyOffset])
  React.useEffect(() => {
    if (!showButton) return
    const newTitle = getTitle()
    const newSubtitle = getSubtitle(subtitle)
    setTitle(newTitle)
    setSubtitle(newSubtitle)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showButton, buttonType, getSubtitle])


  // SAVING RECCOMENDED CAMPAIGN
  const saveTargeting = useSaveTargeting({ targetingState, saveCampaignSettings })
  const saveSelectedRecc = React.useCallback(() => {
    setSelectedCampaignRecc(null)
    saveTargeting('settings', selectedCampaignRecc)
  }, [setSelectedCampaignRecc, selectedCampaignRecc, saveTargeting])

  // HANDLE BUTTON CLICK
  const onClick = React.useMemo(() => {
    if (!showButton) return
    // Click saves recc campaign
    if (buttonType === 'saveRecc') {
      return saveSelectedRecc
    }
    // Click goes to custom view
    if (buttonType === 'goToCustomise') {
      return () => {
        setForceHideButton(true)
        setSelectedCampaignRecc(null)
        setCurrentView('customise')
      }
    }
    // Click goes to set budget
    if (buttonType === 'goToBudget') {
      return () => {
        toggleMobileBudget(true)
      }
    }
    return () => {}
  }, [showButton, buttonType, saveSelectedRecc, setCurrentView, setSelectedCampaignRecc, toggleMobileBudget])


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
            'text-center',
          ].join(' ')}
          ref={animatedDiv.ref}
        >
          <button
            className={[
              'w-3/4',
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
