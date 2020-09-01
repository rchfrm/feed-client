import React from 'react'
import useBreakpointTest from '@/hooks/useBreakpointTest'

import { InterfaceContext } from '@/contexts/InterfaceContext'
import { ArtistContext } from '@/contexts/ArtistContext'

import * as cboHelpers from '@/app/helpers/cboHelpers'

const CboContext = React.createContext({
  cboState: {},
  setCboState: () => {},
  saveCampaignSettings: () => {},
  saving: false,
  currentView: '',
  setCurrentView: () => {},
  selectedCampaignType: '',
  setSelectedCampaignType: () => {},
  minBudget: 0,
  setMinBudget: () => {},
  currency: '',
  desktopLayoutWidth: 'md',
  isDesktopLayout: false,
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
  // SELECTED CAMPAIGN OPTION ('recommended' | 'custom' | '')
  const [selectedCampaignType, setSelectedCampaignType] = React.useState('')
  // MIN BUDGET
  const [minBudget, setMinBudget] = React.useState(2)
  // CURRENCY
  const { artistCurrency: currency } = React.useContext(ArtistContext)
  // GET DESKTOP LAYOUT TEST
  const desktopLayoutWidth = 'md'
  const isDesktopLayout = useBreakpointTest(desktopLayoutWidth)

  return (
    <CboContext.Provider
      value={{
        cboState,
        setCboState,
        saveCampaignSettings,
        saving,
        currentView,
        setCurrentView,
        selectedCampaignType,
        setSelectedCampaignType,
        minBudget,
        setMinBudget,
        currency,
        desktopLayoutWidth,
        isDesktopLayout,
      }}
    >
      {children}
    </CboContext.Provider>
  )
}

export { CboContext, CboContextProvider }
