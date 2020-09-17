import React from 'react'
import produce from 'immer'

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
  initialTargetingState: {},
  setInitialTargetingState: {},
  saveCampaignSettings: () => {},
  togglePauseCampaign: () => {},
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
  updateTargetingBudget: () => {},
  disableSaving: false,
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
  initPage: () => {},
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
  const [initialTargetingState, setInitialTargetingState] = React.useState(initialState.targetingState)

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
    // Start saving
    setSaving(true)
    toggleGlobalLoading(true)
    // Reset to summary view
    setCurrentView(initialState.currentView)
    const savedState = await targetingHelpers.saveCampaign(settings)
    // Update state
    console.log('savedState', savedState)
    setTargetingState(savedState)
    setInitialTargetingState(savedState)
    setSelectedCampaignRecc(null)
    setSaving(false)
    toggleGlobalLoading(false)
  }, [toggleGlobalLoading, toggleSidePanel])

  // PAUSE CAMPAIGN
  const togglePauseCampaign = React.useCallback((pause) => {
    const { paused } = targetingState
    const newPausedState = typeof pause === 'boolean' ? pause : !paused
    const newSettings = produce(targetingState, draftState => {
      draftState.paused = newPausedState
    })
    saveCampaignSettings(newSettings)
  }, [targetingState, saveCampaignSettings])

  // MIN BUDGET
  const [minHardBudget, setMinHardBudget] = React.useState(0)
  const [minReccBudget, setMinReccBudget] = React.useState(2)

  // FORMATTED BUDGET
  const [budgetFormatted, setBudgetFormatted] = React.useState(initialState.budgetFormatted)
  React.useEffect(() => {
    if (!targetingState.budget) return
    setBudgetFormatted(utils.formatCurrency(targetingState.budget, currency))
  }, [targetingState.budget, currency])

  // FUNCTION TO UPDATE BUDGET
  const updateTargetingBudget = React.useCallback((budget) => {
    setTargetingState((targetingState) => {
      return produce(targetingState, draftState => {
        draftState.budget = budget
      })
    })
  }, [])

  // UPDATE BUDGET IF RECC IS MORE THAN CURRENT
  React.useEffect(() => {
    if (targetingState.budget < minReccBudget) {
      updateTargetingBudget(minReccBudget)
    }
  // eslint-disable-next-line
  }, [minReccBudget])

  // DISABLE SAVING (eg if budget is too small)
  const [disableSaving, setDisableSaving] = React.useState(initialState.disableSaving)
  React.useEffect(() => {
    const disabled = targetingState.budget < minHardBudget
    setDisableSaving(disabled)
  }, [targetingState.budget, minHardBudget])

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
        minHardBudget={minHardBudget}
        targetingState={targetingState}
        updateTargetingBudget={updateTargetingBudget}
      />
    ) : null
    const button = state ? (
      <TargetingBudgetSaveButton
        targetingState={targetingState}
        saveCampaignSettings={saveCampaignSettings}
        budgetFormatted={budgetFormatted}
        disableSaving={disableSaving}
      />
    ) : null
    return { content, button }
  }
  // Toggle budget sidepanel
  const toggleMobileBudget = React.useCallback((state = true) => {
    const { content, button } = getBudgetSidePanelContent(state)
    setSidePanelContent(content)
    setSidePanelButton(button)
    toggleSidePanel(state)
    setMobileBudgetOpen(state)
    // Hide progress button
    setSelectedCampaignRecc(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSidePanelButton, toggleSidePanel, targetingState, budgetFormatted, updateTargetingBudget])

  React.useEffect(() => {
    const { button } = getBudgetSidePanelContent()
    setSidePanelButton(button)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budgetFormatted, disableSaving])

  // Set budget open to false when closing sidepanel
  React.useEffect(() => {
    if (!sidePanelContent) setMobileBudgetOpen(false)
  }, [sidePanelContent])


  // SETTINGS
  const [settingsReady, setSettingsReady] = React.useState(initialState.settingsReady)

  // LOCATION SETTINGS
  const [locationOptions, setLocationOptions] = React.useState(initialState.locationOptions)
  // * Selected cities and countries
  const [selectedCities, setSelectedCities] = React.useState(initialState.selectedCities)
  const [selectedCountries, setSelectedCountries] = React.useState(initialState.selectedCountries)
  // * Create initial location options
  const createLocationOptions = React.useCallback((popularLocations) => {
    const currentLocations = {
      cities: targetingState.cities,
      countries: targetingState.countries,
    }
    // Create object of location options grouped by country
    const locationOptions = targetingHelpers.formatPopularLocations(popularLocations, currentLocations)
    setLocationOptions(locationOptions)
    // Create initial state of location checkboxes
    const initialCities = currentLocations.cities.map(({ key }) => key)
    const initialCountries = currentLocations.countries.map(({ code }) => code)
    setSelectedCities(initialCities)
    setSelectedCountries(initialCountries)
  }, [targetingState.cities, targetingState.countries])

  // Update min budget based on selected countries and cities
  React.useEffect(() => {
    const totalCities = selectedCities.length
    const totalCountries = selectedCountries.length
    const minReccBudget = targetingHelpers.calcMinReccBudget({ minBudgetInfo, totalCities, totalCountries })
    setMinReccBudget(minReccBudget)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountries.length, selectedCities.length, artistId])


  // INIT TARGETING PAGE
  const initPage = React.useCallback((targetingState) => {
    // Set inital countires (to trigger min budget)
    const initialCities = targetingState.cities.map(({ key }) => key)
    const initialCountries = targetingState.countries.map(({ code }) => code)
    setSelectedCities(initialCities)
    setSelectedCountries(initialCountries)
    // Set targeting state
    setInitialTargetingState(targetingState)
    setTargetingState(targetingState)
  }, [])

  // RESET EVERYTHING WHEN ARTIST ID CHANGES
  React.useEffect(() => {
    setSettingsReady(false)
    setLocationOptions({})
    setSelectedCampaignRecc(null)
    setCurrentView(initialState.currentView)
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
        initialTargetingState,
        setInitialTargetingState,
        saveCampaignSettings,
        togglePauseCampaign,
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
        updateTargetingBudget,
        disableSaving,
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
        initPage,
      }}
    >
      {children}
    </TargetingContext.Provider>
  )
}

export { TargetingContext, TargetingContextProvider }
