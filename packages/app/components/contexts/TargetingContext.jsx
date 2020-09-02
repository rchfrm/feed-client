import React from 'react'
import useBreakpointTest from '@/hooks/useBreakpointTest'

import TargetingBudgetMobile from '@/app/TargetingBudgetMobile'
import TargetingBudgetSaveButton from '@/app/TargetingBudgetSaveButton'

import { InterfaceContext } from '@/contexts/InterfaceContext'
import { ArtistContext } from '@/contexts/ArtistContext'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const TargetingContext = React.createContext({
  cboState: {},
  setCboState: () => {},
  saveCampaignSettings: () => {},
  saving: false,
  currentView: '',
  setCurrentView: () => {},
  selectedCampaignRecc: null,
  setSelectedCampaignRecc: () => {},
  selectedCampaignType: '',
  setSelectedCampaignType: () => {},
  minBudget: 0,
  setMinBudget: () => {},
  currency: '',
  desktopLayoutWidth: 'md',
  isDesktopLayout: false,
  toggleMobileBudget: () => {},
})

TargetingContext.displayName = 'TargetingContext'

const TargetingContextProvider = ({ children }) => {
  // TARGETING STATE
  const [cboState, setCboState] = React.useState(targetingHelpers.demoCboState)
  // SAVE CAMPAIGN
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  const [saving, setSaving] = React.useState(false)
  const saveCampaignSettings = React.useCallback(async (settings) => {
    setSaving(true)
    toggleGlobalLoading(true)
    const savedState = await targetingHelpers.saveCampaign(settings)
    console.log('savedState', savedState)
    setCboState(savedState)
    setSaving(false)
    toggleGlobalLoading(false)
  }, [toggleGlobalLoading])
  // CAMPAIGN SETTINGS VIEW ('summary' | 'customise' | budget)
  const [currentView, setCurrentView] = React.useState('summary')
  // SELECTED CAMPAIGN REC
  const [selectedCampaignRecc, setSelectedCampaignRecc] = React.useState(null)
  // SELECTED CAMPAIGN OPTION ('recommended' | 'custom' | '')
  const [selectedCampaignType, setSelectedCampaignType] = React.useState('')
  React.useEffect(() => {
    const { type = null } = selectedCampaignRecc || {}
    setSelectedCampaignType(type)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCampaignRecc, setSelectedCampaignType])
  // MIN BUDGET
  const [minBudget, setMinBudget] = React.useState(2)
  // CURRENCY
  const { artistCurrency: currency } = React.useContext(ArtistContext)
  // GET DESKTOP LAYOUT TEST
  const desktopLayoutWidth = 'md'
  const isDesktopLayout = useBreakpointTest(desktopLayoutWidth)

  // OPEN MOBILE BUDGET SIDEPANEL
  const { setSidePanelContent, toggleSidePanel, setSidePanelButton } = React.useContext(SidePanelContext)
  const toggleMobileBudget = React.useCallback((state = true) => {
    const content = state ? (
      <TargetingBudgetMobile
        currency={currency}
        minBudget={minBudget}
        setCboState={setCboState}
        saveCampaignSettings={saveCampaignSettings}
      />
    ) : null
    const button = state ? (
      <TargetingBudgetSaveButton
        cboState={cboState}
        saveCampaignSettings={saveCampaignSettings}
      />
    ) : null
    setSidePanelContent(content)
    setSidePanelButton(button)
    toggleSidePanel(true)
  }, [currency, minBudget, cboState, saveCampaignSettings, setSidePanelContent, setSidePanelButton, toggleSidePanel])

  return (
    <TargetingContext.Provider
      value={{
        cboState,
        setCboState,
        saveCampaignSettings,
        saving,
        currentView,
        setCurrentView,
        selectedCampaignRecc,
        setSelectedCampaignRecc,
        selectedCampaignType,
        minBudget,
        setMinBudget,
        currency,
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
