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
  cancelUpdateSettings: () => {},
  saving: false,
  settingsSaved: false,
  errorUpdatingSettings: null,
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
  disableSaving: '',
  currency: '',
  currencyOffset: 0,
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
  errorFetchingSettings: null,
  initPage: () => {},
}

const TargetingContext = React.createContext(initialState)

TargetingContext.displayName = 'TargetingContext'

const TargetingContextProvider = ({ children }) => {
  // ARTIST context
  const {
    artistCurrency: currency,
    artistId,
    artist: {
      min_daily_budget_info: minBudgetInfo,
      min_daily_budget_info: {
        currency: { offset: currencyOffset },
      },
    },
  } = React.useContext(ArtistContext)

  // SIDE PANEL context
  const { sidePanelContent, setSidePanelContent, toggleSidePanel, setSidePanelButton } = React.useContext(SidePanelContext)

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

  // MIN BUDGET
  const [minHardBudget, setMinHardBudget] = React.useState(0)
  const [minReccBudget, setMinReccBudget] = React.useState(2)

  // FORMATTED BUDGET
  const [budgetFormatted, setBudgetFormatted] = React.useState(initialState.budgetFormatted)
  React.useEffect(() => {
    if (!targetingState.budget) return
    const budgetOffset = targetingState.budget / currencyOffset
    setBudgetFormatted(utils.formatCurrency(budgetOffset, currency))
  }, [targetingState.budget, currency, currencyOffset])

  // FUNCTION TO UPDATE BUDGET
  const updateTargetingBudget = React.useCallback((budget) => {
    setTargetingState((targetingState) => {
      return produce(targetingState, draftState => {
        draftState.budget = budget
      })
    })
  }, [])

  // // UPDATE BUDGET IF RECC IS MORE THAN CURRENT
  // React.useEffect(() => {
  //   if (targetingState.budget < minReccBudget) {
  //     updateTargetingBudget(minReccBudget)
  //   }
  // // eslint-disable-next-line
  // }, [minReccBudget])


  // GET DESKTOP LAYOUT TEST
  const { desktopLayoutWidth } = initialState
  const isDesktopLayout = useBreakpointTest(desktopLayoutWidth)

  // SETTINGS
  const [settingsReady, setSettingsReady] = React.useState(initialState.settingsReady)

  // LOCATION SETTINGS
  const [locationOptions, setLocationOptions] = React.useState(initialState.locationOptions)
  // * Selected cities and countries
  const [selectedCities, setSelectedCities] = React.useState(initialState.selectedCities)
  const [selectedCountries, setSelectedCountries] = React.useState(initialState.selectedCountries)
  // * Function to set selected cities and countries
  const updateLocationsArrays = ({ cityKeys = [], countryCodes = [] }) => {
    setSelectedCities(cityKeys)
    setSelectedCountries(countryCodes)
  }
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
    const { cityKeys, countryCodes } = targetingState
    updateLocationsArrays({ cityKeys, countryCodes })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetingState.cities, targetingState.countries])

  // Update min budget based on selected countries and cities
  React.useEffect(() => {
    const totalCities = selectedCities.length
    const totalCountries = selectedCountries.length
    const minReccBudget = targetingHelpers.calcMinReccBudget({ minBudgetInfo, totalCities, totalCountries })
    setMinReccBudget(minReccBudget)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountries.length, selectedCities.length, artistId])

  // CANCEL UPDATE SETTINGS
  const cancelUpdateSettings = React.useCallback(() => {
    // Set view to summary
    setCurrentView('summary')
    // Set targeting state to initial state (except budget)
    const { budget } = targetingState
    const resetState = {
      ...initialTargetingState,
      budget,
    }
    setTargetingState(resetState)
    // Reset selected locations
    // Set inital countries  (to trigger min budget)
    const { cityKeys, countryCodes } = resetState
    updateLocationsArrays({ cityKeys, countryCodes })
  }, [targetingState, initialTargetingState])


  // INIT TARGETING PAGE
  const [errorFetchingSettings, setErrorFetchingSettings] = React.useState(null)
  const initPage = React.useCallback((targetingState, error) => {
    // Handle error
    if (error) {
      setErrorFetchingSettings(error)
      return
    }
    setErrorFetchingSettings(null)
    // Set inital countries  (to trigger min budget)
    const { cityKeys, countryCodes } = targetingState
    updateLocationsArrays({ cityKeys, countryCodes })
    // Set targeting state
    setInitialTargetingState(targetingState)
    setTargetingState(targetingState)
  }, [])

  // DISABLE SAVING (eg if budget is too small)
  const [disableSaving, setDisableSaving] = React.useState(initialState.disableSaving)
  React.useEffect(() => {
    const isBudgetTooSmall = (targetingState.budget * currencyOffset) < minHardBudget
    // Disable with budget reason
    if (isBudgetTooSmall) return setDisableSaving('budget')
    const noLocations = !selectedCountries.length && !selectedCities.length
    // Disable with location reason
    if (noLocations) return setDisableSaving('location')
    // Reset
    setDisableSaving(initialState.disableSaving)
  }, [targetingState.budget, minHardBudget, currencyOffset, selectedCountries, selectedCities])

  // SAVE CAMPAIGN
  const [settingsSaved, setSettingsSaved] = React.useState(initialState.settingsSaved)
  const [errorUpdatingSettings, setErrorUpdatingSettings] = React.useState(null)
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
    // Save to server
    const savedState = await targetingHelpers.saveCampaign({
      artistId,
      newSettings: settings,
      selectedCities,
      selectedCountries,
      currencyOffset,
    })
    if (savedState.error) {
      setErrorUpdatingSettings(savedState.error)
    } else {
      // Update state
      setTargetingState(savedState)
      setInitialTargetingState(savedState)
      setSettingsSaved(true)
    }
    setSelectedCampaignRecc(null)
    setSaving(false)
    toggleGlobalLoading(false)
  }, [artistId, toggleGlobalLoading, toggleSidePanel, selectedCities, selectedCountries, currencyOffset])
  // Set saved to false when going to settings view
  React.useEffect(() => {
    console.log('currentView', currentView)
    if (currentView === 'customise') {
      setSettingsSaved(false)
    }
  }, [currentView])

  // PAUSE CAMPAIGN
  const togglePauseCampaign = React.useCallback((pause) => {
    const { paused } = targetingState
    const newPausedState = typeof pause === 'boolean' ? pause : !paused
    const newSettings = produce(targetingState, draftState => {
      draftState.paused = newPausedState
    })
    saveCampaignSettings(newSettings)
  }, [targetingState, saveCampaignSettings])


  // RESET EVERYTHING WHEN ARTIST ID CHANGES
  React.useEffect(() => {
    setErrorFetchingSettings(null)
    setSettingsReady(false)
    setLocationOptions({})
    setSelectedCampaignRecc(null)
    setCurrentView(initialState.currentView)
    if (!artistId) return
    const fbMin = targetingHelpers.calcMinBudget(minBudgetInfo, 'hard')
    setMinHardBudget(fbMin)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistId])

  // MOBILE BUDGET SIDEPANEL
  const [mobileBudgetOpen, setMobileBudgetOpen] = React.useState(initialState.mobileBudgetOpen)
  // Get budget content
  const getBudgetSidePanelContent = (state = true) => {
    const content = state ? (
      <TargetingBudgetMobile
        currency={currency}
        currencyOffset={currencyOffset}
        minReccBudget={minReccBudget}
        minHardBudget={minHardBudget}
        initialBudget={initialTargetingState.budget}
        targetingState={targetingState}
        updateTargetingBudget={updateTargetingBudget}
      />
    ) : null
    const button = state ? (
      <TargetingBudgetSaveButton
        targetingState={targetingState}
        saveCampaignSettings={saveCampaignSettings}
        disableSaving={!!disableSaving}
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
    if (!mobileBudgetOpen) return
    const { button } = getBudgetSidePanelContent()
    setSidePanelButton(button)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budgetFormatted, disableSaving, mobileBudgetOpen])

  // Set budget open to false when closing sidepanel
  React.useEffect(() => {
    if (!sidePanelContent) setMobileBudgetOpen(false)
  }, [sidePanelContent])

  return (
    <TargetingContext.Provider
      value={{
        targetingState,
        setTargetingState,
        initialTargetingState,
        setInitialTargetingState,
        saveCampaignSettings,
        togglePauseCampaign,
        cancelUpdateSettings,
        saving,
        settingsSaved,
        errorUpdatingSettings,
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
        currencyOffset,
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
        errorFetchingSettings,
        initPage,
      }}
    >
      {children}
    </TargetingContext.Provider>
  )
}

export { TargetingContext, TargetingContextProvider }
