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
  saveTargetingSettings: () => {},
  togglePauseCampaign: () => {},
  cancelUpdateSettings: () => {},
  saving: false,
  settingsSaved: false,
  settingsSavedInitial: false,
  errorUpdatingSettings: null,
  currentView: 'summary',
  setCurrentView: () => {},
  isAnimatingView: false,
  setIsAnimatingView: () => {},
  selectedCampaignRecc: null,
  setSelectedCampaignRecc: () => {},
  selectedCampaignType: '',
  setSelectedCampaignType: () => {},
  fbMin: 0,
  fbMinRounded: 0,
  minHardBudget: 0,
  minReccBudget: 0,
  setMinReccBudget: () => {},
  updateTargetingBudget: () => {},
  isFirstTimeUser: false,
  disableSaving: '',
  artistIsMusician: false,
  spotifyConnected: false,
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
      isMusician: artistIsMusician,
      spotifyConnected,
      min_daily_budget_info: minBudgetInfo,
      min_daily_budget_info: {
        currency: { offset: currencyOffset },
      },
    },
  } = React.useContext(ArtistContext)

  // SIDE PANEL context
  const { sidePanelContent, setSidePanelContent, toggleSidePanel, setSidePanelButton } = React.useContext(SidePanelContext)

  // CAMPAIGN SETTINGS VIEW ('summary' | 'settings')
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
  const [fbMin, setFbMin] = React.useState(initialState.fbMin)
  const [fbMinRounded, setFbMinRounded] = React.useState(initialState.fbMinRounded)
  const [minHardBudget, setMinHardBudget] = React.useState(initialState.minHardBudget)
  const [minReccBudget, setMinReccBudget] = React.useState(initialState.minRecBudget)

  // FORMATTED BUDGET
  const [budgetFormatted, setBudgetFormatted] = React.useState(initialState.budgetFormatted)
  React.useEffect(() => {
    if (!targetingState.budget) return
    const budgetOffset = targetingState.budget / currencyOffset
    setBudgetFormatted(utils.formatCurrency(budgetOffset, currency))
  }, [targetingState.budget, currency, currencyOffset])

  // INITIAL FLOW?
  const [isFirstTimeUser, setIsFirstTimeUse] = React.useState(false)
  React.useEffect(() => {
    if (!initialTargetingState.budget) return setIsFirstTimeUse(true)
    setIsFirstTimeUse(false)
  }, [initialTargetingState.budget])

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
  const createLocationOptions = React.useCallback((targetingState, popularLocations = {}) => {
    const currentLocations = {
      cities: targetingState.cities,
      countries: targetingState.countries,
    }
    // Create object of location options grouped by country
    const locationOptions = targetingHelpers.formatPopularLocations(currentLocations, popularLocations)
    setLocationOptions(locationOptions)
    return locationOptions
  }, [])

  // UPDATE MIN BUDGET AND LOCATIONS STATE when selected cities and location options changes
  React.useEffect(() => {
    // Update locations object with state of selected cities and countries
    const locationOptionsArray = Object.values(locationOptions)
    if (!locationOptionsArray.length) return
    const locationOptionsWithState = targetingHelpers.updateLocationOptionsState({ locationOptionsArray, selectedCities, selectedCountries })
    setLocationOptions(locationOptionsWithState)
    // Update min budget based on selected countries and cities
    const minReccBudget = targetingHelpers.calcMinReccBudget({ minBudgetInfo, locationOptions: locationOptionsWithState })
    setMinReccBudget(minReccBudget)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountries.length, selectedCities.length])

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
    // Create locations object
    const locationOptions = createLocationOptions(targetingState)
    // Set inital countries (to trigger min budget)
    const { cityKeys, countryCodes } = targetingState
    updateLocationsArrays({ cityKeys, countryCodes })
    // Set fb min
    const fbMin = targetingHelpers.calcMinBudget(minBudgetInfo, 'fbMin')
    setFbMin(fbMin)
    // Set fb min rounded
    const fbMinRounded = targetingHelpers.calcMinBudget(minBudgetInfo, 'fbMinRounded')
    setFbMinRounded(fbMinRounded)
    // Set hard budget
    const hardMinBudget = targetingHelpers.calcMinBudget(minBudgetInfo, 'hard')
    setMinHardBudget(hardMinBudget)
    // Set min recc budget
    const minReccBudget = targetingHelpers.calcMinReccBudget({ minBudgetInfo, locationOptions })
    setMinReccBudget(minReccBudget)
    // Set targeting state
    setInitialTargetingState(targetingState)
    setTargetingState(targetingState)
  }, [minBudgetInfo, createLocationOptions])

  // DISABLE SAVING (eg if budget is too small)
  const [disableSaving, setDisableSaving] = React.useState(initialState.disableSaving)
  React.useEffect(() => {
    const isBudgetTooSmall = targetingState.budget < minHardBudget
    const noLocations = !selectedCountries.length && !selectedCities.length
    // Disable with budget reason
    if (isBudgetTooSmall) return setDisableSaving('budget')
    // Disable with location reason
    if (noLocations) return setDisableSaving('location')
    // Reset
    setDisableSaving(initialState.disableSaving)
  }, [targetingState.budget, minHardBudget, currencyOffset, selectedCountries, selectedCities])

  // SAVE CAMPAIGN
  const [settingsSaved, setSettingsSaved] = React.useState(initialState.settingsSaved)
  const [settingsSavedInitial, setSettingsSavedInitial] = React.useState(initialState.settingsSavedInitial)
  const [errorUpdatingSettings, setErrorUpdatingSettings] = React.useState(null)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  const [saving, setSaving] = React.useState(false)
  const saveTargetingSettings = React.useCallback(async (settings) => {
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
      setSettingsSavedInitial(isFirstTimeUser)
      setTargetingState(savedState)
      setInitialTargetingState(savedState)
      setSettingsSaved(true)
    }
    setSelectedCampaignRecc(null)
    setSaving(false)
    toggleGlobalLoading(false)
  }, [artistId, toggleGlobalLoading, toggleSidePanel, selectedCities, selectedCountries, currencyOffset, isFirstTimeUser])
  // Set saved to false when going to settings view
  React.useEffect(() => {
    if (currentView === 'settings') {
      setSettingsSaved(false)
      setSettingsSaved(false)
    }
  }, [currentView])

  // PAUSE CAMPAIGN
  const togglePauseCampaign = React.useCallback(() => {
    const { status } = initialTargetingState
    const paused = status === 0
    const newPausedState = paused ? 1 : 0
    const newSettings = produce(initialTargetingState, draftState => {
      draftState.status = newPausedState
    })
    saveTargetingSettings(newSettings)
  }, [initialTargetingState, saveTargetingSettings])


  // RESET EVERYTHING WHEN ARTIST ID CHANGES
  React.useEffect(() => {
    setErrorFetchingSettings(null)
    setSettingsReady(false)
    setLocationOptions({})
    setSelectedCampaignRecc(null)
    setCurrentView(initialState.currentView)
    // RESET locations
    setSelectedCities(initialState.selectedCities)
    setSelectedCountries(initialState.selectedCountries)
    // RESET Targeting state
    setInitialTargetingState(initialState.targetingState)
    setTargetingState(initialState.targetingState)
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
        fbMinRounded={fbMinRounded}
        minReccBudget={minReccBudget}
        minHardBudget={minHardBudget}
        initialBudget={initialTargetingState.budget}
        targetingState={targetingState}
        updateTargetingBudget={updateTargetingBudget}
      />
    ) : null
    const button = state ? (
      <TargetingBudgetSaveButton
        initialTargetingState={initialTargetingState}
        targetingState={targetingState}
        saveTargetingSettings={saveTargetingSettings}
        disableSaving={!!disableSaving}
        isFirstTimeUser={isFirstTimeUser}
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
  }, [setSidePanelButton, toggleSidePanel, targetingState, minReccBudget, budgetFormatted, updateTargetingBudget, isFirstTimeUser])

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
        saveTargetingSettings,
        togglePauseCampaign,
        cancelUpdateSettings,
        saving,
        settingsSaved,
        settingsSavedInitial,
        errorUpdatingSettings,
        currentView,
        setCurrentView,
        isAnimatingView,
        setIsAnimatingView,
        selectedCampaignRecc,
        setSelectedCampaignRecc,
        selectedCampaignType,
        fbMin,
        fbMinRounded,
        minHardBudget,
        minReccBudget,
        setMinReccBudget,
        updateTargetingBudget,
        isFirstTimeUser,
        disableSaving,
        artistIsMusician,
        spotifyConnected,
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
