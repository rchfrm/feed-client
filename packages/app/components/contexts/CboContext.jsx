import React from 'react'
import useBreakpointTest from '@/hooks/useBreakpointTest'

import CboBudgetMobile from '@/app/CboBudgetMobile'
import CboBudgetSaveButton from '@/app/CboBudgetSaveButton'

import { InterfaceContext } from '@/contexts/InterfaceContext'
import { ArtistContext } from '@/contexts/ArtistContext'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import * as cboHelpers from '@/app/helpers/cboHelpers'

const CboContext = React.createContext({
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

CboContext.displayName = 'CboContext'

const CboContextProvider = ({ children }) => {
  // CBO STATE
  const [cboState, setCboState] = React.useState(cboHelpers.demoCboState)
  // SAVE CAMPAIGN
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  const [saving, setSaving] = React.useState(false)
  const saveCampaignSettings = React.useCallback(async (settings) => {
    setSaving(true)
    toggleGlobalLoading(true)
    const savedState = await cboHelpers.saveCampaign(settings)
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
      <CboBudgetMobile
        currency={currency}
        minBudget={minBudget}
        setCboState={setCboState}
        saveCampaignSettings={saveCampaignSettings}
      />
    ) : null
    const button = state ? (
      <CboBudgetSaveButton
        cboState={cboState}
        saveCampaignSettings={saveCampaignSettings}
      />
    ) : null
    setSidePanelContent(content)
    setSidePanelButton(button)
    toggleSidePanel(true)
  }, [currency, minBudget, cboState, saveCampaignSettings, setSidePanelContent, setSidePanelButton, toggleSidePanel])

  return (
    <CboContext.Provider
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
    </CboContext.Provider>
  )
}

export { CboContext, CboContextProvider }
