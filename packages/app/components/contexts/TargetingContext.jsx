import React from 'react'
import useBreakpointTest from '@/hooks/useBreakpointTest'

import TargetingBudgetMobile from '@/app/TargetingBudgetMobile'
import TargetingBudgetSaveButton from '@/app/TargetingBudgetSaveButton'

import { InterfaceContext } from '@/contexts/InterfaceContext'
import { ArtistContext } from '@/contexts/ArtistContext'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import * as utils from '@/helpers/utils'
import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const TargetingContext = React.createContext({
  targetingState: {},
  setTargetingState: () => {},
  saveCampaignSettings: () => {},
  saving: false,
  currentView: '',
  setCurrentView: () => {},
  isAnimatingView: false,
  setIsAnimatingView: () => {},
  selectedCampaignRecc: null,
  setSelectedCampaignRecc: () => {},
  selectedCampaignType: '',
  setSelectedCampaignType: () => {},
  minBudget: 0,
  setMinBudget: () => {},
  currency: '',
  budgetFormatted: '',
  desktopLayoutWidth: 'md',
  isDesktopLayout: false,
  toggleMobileBudget: () => {},
})

TargetingContext.displayName = 'TargetingContext'

const TargetingContextProvider = ({ children }) => {
  // Import side panel context
  const { setSidePanelContent, toggleSidePanel, setSidePanelButton } = React.useContext(SidePanelContext)

  // TARGETING STATE
  const [targetingState, setTargetingState] = React.useState(targetingHelpers.demotargetingState)

  // SELECTED CAMPAIGN REC
  const [selectedCampaignRecc, setSelectedCampaignRecc] = React.useState(null)

  // SELECTED CAMPAIGN OPTION ('recommended' | 'custom' | '')
  const [selectedCampaignType, setSelectedCampaignType] = React.useState('')
  React.useEffect(() => {
    const { type = null } = selectedCampaignRecc || {}
    setSelectedCampaignType(type)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCampaignRecc, setSelectedCampaignType])

  // SAVE CAMPAIGN
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  const [saving, setSaving] = React.useState(false)
  const saveCampaignSettings = React.useCallback(async (settings) => {
    // Close side panel
    toggleSidePanel(false)

    setSaving(true)
    toggleGlobalLoading(true)
    const savedState = await targetingHelpers.saveCampaign(settings)
    console.log('savedState', savedState)
    setTargetingState(savedState)
    setSelectedCampaignRecc(null)
    setSaving(false)
    toggleGlobalLoading(false)
  }, [toggleGlobalLoading, toggleSidePanel])

  // CAMPAIGN SETTINGS VIEW ('summary' | 'customise' | budget)
  const [currentView, setCurrentView] = React.useState('summary')
  const [isAnimatingView, setIsAnimatingView] = React.useState(false)

  // MIN BUDGET
  const [minBudget, setMinBudget] = React.useState(2)

  // CURRENCY
  const { artistCurrency: currency } = React.useContext(ArtistContext)

  // FORMATTED BUDGET
  const [budgetFormatted, setBudgetFormatted] = React.useState(utils.formatCurrency(targetingState.budget, currency))
  React.useEffect(() => {
    setBudgetFormatted(utils.formatCurrency(targetingState.budget, currency))
  }, [targetingState.budget, currency])

  // GET DESKTOP LAYOUT TEST
  const desktopLayoutWidth = 'md'
  const isDesktopLayout = useBreakpointTest(desktopLayoutWidth)

  // OPEN MOBILE BUDGET SIDEPANEL
  const toggleMobileBudget = React.useCallback((state = true) => {
    const content = state ? (
      <TargetingBudgetMobile
        currency={currency}
        minBudget={minBudget}
        targetingState={targetingState}
        setTargetingState={setTargetingState}
        saveCampaignSettings={saveCampaignSettings}
      />
    ) : null
    const button = state ? (
      <TargetingBudgetSaveButton
        targetingState={targetingState}
        saveCampaignSettings={saveCampaignSettings}
        budgetFormatted={budgetFormatted}
      />
    ) : null
    setSidePanelContent(content)
    setSidePanelButton(button)
    toggleSidePanel(state)
  }, [currency, minBudget, targetingState, saveCampaignSettings, setSidePanelContent, setSidePanelButton, toggleSidePanel, budgetFormatted])
  React.useEffect(() => {
    const button = (
      <TargetingBudgetSaveButton
        targetingState={targetingState}
        saveCampaignSettings={saveCampaignSettings}
        budgetFormatted={budgetFormatted}
      />
    )
    setSidePanelButton(button)
  }, [targetingState, budgetFormatted, saveCampaignSettings, setSidePanelButton])

  return (
    <TargetingContext.Provider
      value={{
        targetingState,
        setTargetingState,
        saveCampaignSettings,
        saving,
        currentView,
        setCurrentView,
        isAnimatingView,
        setIsAnimatingView,
        selectedCampaignRecc,
        setSelectedCampaignRecc,
        selectedCampaignType,
        minBudget,
        setMinBudget,
        currency,
        budgetFormatted,
        desktopLayoutWidth,
        isDesktopLayout,
        toggleMobileBudget,
      }}
    >
      {children}
    </TargetingContext.Provider>
  )
}

export { TargetingContext, TargetingContextProvider }
