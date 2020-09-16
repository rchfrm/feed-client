import React from 'react'
import useBreakpointTest from '@/hooks/useBreakpointTest'

import TargetingBudgetMobile from '@/app/TargetingBudgetMobile'
import TargetingBudgetSaveButton from '@/app/TargetingBudgetSaveButton'

import { InterfaceContext } from '@/contexts/InterfaceContext'
import { ArtistContext } from '@/contexts/ArtistContext'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import * as utils from '@/helpers/utils'
import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const initialState = {
  targetingState: {},
  setTargetingState: () => {},
  saveCampaignSettings: () => {},
  saving: false,
  currentView: 'summary',
  setCurrentView: () => {},
  isAnimatingView: false,
  setIsAnimatingView: () => {},
  selectedCampaignRecc: null,
  setSelectedCampaignRecc: () => {},
  selectedCampaignType: '',
  setSelectedCampaignType: () => {},
  minHardBudget: 0,
  minReccBudget: 0,
  setMinReccBudget: () => {},
  currency: '',
  budgetFormatted: '',
  desktopLayoutWidth: 'md',
  isDesktopLayout: false,
  toggleMobileBudget: () => {},
  mobileBudgetOpen: false,
  settingsReady: false,
  setSettingsReady: () => {},
  createLocationOptions: () => {},
  locationOptions: {},
  selectedCities: [],
  setSelectedCities: () => {},
  selectedCountries: [],
  setSelectedCountries: () => {},
}

const TargetingContext = React.createContext(initialState)

TargetingContext.displayName = 'TargetingContext'

const TargetingContextProvider = ({ children }) => {
  // SIDE PANEL context
  const { sidePanelContent, setSidePanelContent, toggleSidePanel, setSidePanelButton } = React.useContext(SidePanelContext)

  // ARTIST context
  const {
    artistCurrency: currency,
    artistId,
    artist: { min_daily_budget_info: minBudgetInfo },
  } = React.useContext(ArtistContext)

  // CAMPAIGN SETTINGS VIEW ('summary' | 'customise')
  const [currentView, setCurrentView] = React.useState(initialState.currentView)
  const [isAnimatingView, setIsAnimatingView] = React.useState(initialState.isAnimatingView)

  // TARGETING STATE
  const [targetingState, setTargetingState] = React.useState(initialState.targetingState)

  // SELECTED CAMPAIGN REC
  const [selectedCampaignRecc, setSelectedCampaignRecc] = React.useState(initialState.selectedCampaignRecc)

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

  // MIN BUDGET
  const [minHardBudget, setMinHardBudget] = React.useState(0)
  const [minReccBudget, setMinReccBudget] = React.useState(2)

  // FORMATTED BUDGET
  const [budgetFormatted, setBudgetFormatted] = React.useState(utils.formatCurrency(targetingState.budget, currency))
  React.useEffect(() => {
    setBudgetFormatted(utils.formatCurrency(targetingState.budget, currency))
  }, [targetingState.budget, currency])

  // GET DESKTOP LAYOUT TEST
  const { desktopLayoutWidth } = initialState
  const isDesktopLayout = useBreakpointTest(desktopLayoutWidth)

  // MOBILE BUDGET SIDEPANEL
  const [mobileBudgetOpen, setMobileBudgetOpen] = React.useState(initialState.mobileBudgetOpen)
  // Get budget content
  const getBudgetSidePanelContent = (state = true) => {
    const content = state ? (
      <TargetingBudgetMobile
        currency={currency}
        minReccBudget={minReccBudget}
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
    return { content, button }
  }
  // Toggle budget
  const toggleMobileBudget = React.useCallback((state = true) => {
    const { content, button } = getBudgetSidePanelContent(state)
    setSidePanelContent(content)
    setSidePanelButton(button)
    toggleSidePanel(state)
    setMobileBudgetOpen(state)
    // Hide progress button
    setSelectedCampaignRecc(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSidePanelButton, toggleSidePanel])

  React.useEffect(() => {
    const { button } = getBudgetSidePanelContent()
    setSidePanelButton(button)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budgetFormatted])

  // Set budget open to false when closing sidepanel
  React.useEffect(() => {
    if (!sidePanelContent) setMobileBudgetOpen(false)
  }, [sidePanelContent])


  // SETTINGS
  const [settingsReady, setSettingsReady] = React.useState(initialState.settingsReady)

  // LOCATION SETTINGS
  const [locationOptions, setLocationOptions] = React.useState(initialState.locationOptions)
  // * Selected cities and countries
  const [selectedCountries, setSelectedCountries] = React.useState(initialState.selectedCountries)
  const [selectedCities, setSelectedCities] = React.useState(initialState.selectedCities)
  // * Create initial location options
  const createLocationOptions = React.useCallback((popularLocations) => {
    // Create object of location options grouped by country
    const locationOptions = targetingHelpers.createLocationsObject(popularLocations)
    setLocationOptions(locationOptions)
  }, [])
  // Update min budget based on selected countries and cities
  React.useEffect(() => {
    const totalCities = selectedCities.length
    const totalCountries = selectedCountries.length
    const minReccBudget = targetingHelpers.calcMinReccBudget({ minBudgetInfo, totalCities, totalCountries })
    setMinReccBudget(minReccBudget)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountries.length, selectedCities.length, artistId])


  // RESET EVERYTHING WHEN ARTIST ID CHANGES
  React.useEffect(() => {
    setSettingsReady(false)
    setLocationOptions({})
    setSelectedCampaignRecc(null)
    setCurrentView('summary')
    if (!artistId) return
    const fbMin = targetingHelpers.calcMinBudget(minBudgetInfo, 'hard')
    setMinHardBudget(fbMin)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistId])

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
        minHardBudget,
        minReccBudget,
        setMinReccBudget,
        currency,
        budgetFormatted,
        desktopLayoutWidth,
        isDesktopLayout,
        toggleMobileBudget,
        mobileBudgetOpen,
        settingsReady,
        setSettingsReady,
        createLocationOptions,
        locationOptions,
        selectedCities,
        setSelectedCities,
        selectedCountries,
        setSelectedCountries,
      }}
    >
      {children}
    </TargetingContext.Provider>
  )
}

export { TargetingContext, TargetingContextProvider }
