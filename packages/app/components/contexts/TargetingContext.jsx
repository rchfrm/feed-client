import React from 'react'
import produce from 'immer'
import useAsyncEffect from 'use-async-effect'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import useControlsStore from '@/app/stores/controlsStore'
import useBillingStore from '@/app/stores/billingStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import * as utils from '@/helpers/utils'
import * as targetingHelpers from '@/app/helpers/targetingHelpers'
import * as budgetHelpers from '@/app/helpers/budgetHelpers'

// Read from controls store
const setSpending = (state) => state.updateSpending

const getBillingStoreState = (state) => ({
  organizationArtists: state.organizationArtists,
  setOrganizationArtists: state.updateOrganizationArtists,
})

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
  selectedCampaignRecc: null,
  setSelectedCampaignRecc: () => {},
  selectedCampaignType: '',
  setSelectedCampaignType: () => {},
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
  settingsReady: false,
  setSettingsReady: () => {},
  createLocationOptions: () => {},
  locationOptions: {},
  setLocationOptions: () => {},
  popularLocations: {},
  setPopularLocations: () => {},
  selectedCities: [],
  setSelectedCities: () => {},
  selectedCountries: [],
  setSelectedCountries: () => {},
  errorFetchingSettings: null,
  initPage: () => {},
  targetingLoading: false,
  setTargetingLoading: () => {},
  budgetSlider: {},
  setBudgetSlider: () => {},
  updateCampaignBudget: () => {},
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
      feedMinBudgetInfo,
      feedMinBudgetInfo: {
        currencyOffset,
      },
      country_code,
    },
    updateBudget,
    updateSpendingPaused,
  } = React.useContext(ArtistContext)

  // Targeting loading state
  const [targetingLoading, setTargetingLoading] = React.useState(false)

  // Get Setter to set budget in the controls store
  const updateSpending = useControlsStore(setSpending)
  const { organizationArtists, setOrganizationArtists } = useBillingStore(getBillingStoreState)

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
  const [minReccBudget, setMinReccBudget] = React.useState(initialState.minRecBudget)

  // FORMATTED BUDGET
  const [budgetFormatted, setBudgetFormatted] = React.useState(initialState.budgetFormatted)
  React.useEffect(() => {
    if (! targetingState.budget) return
    const budgetOffset = targetingState.budget / currencyOffset
    setBudgetFormatted(utils.formatCurrency(budgetOffset, currency))
  }, [targetingState.budget, currency, currencyOffset])

  // INITIAL FLOW?
  const [isFirstTimeUser, setIsFirstTimeUse] = React.useState(false)
  React.useEffect(() => {
    if (! initialTargetingState.budget) return setIsFirstTimeUse(true)
    setIsFirstTimeUse(false)
  }, [initialTargetingState.budget])

  // FUNCTION TO UPDATE BUDGET
  const updateTargetingBudget = React.useCallback((budget) => {
    setTargetingState((targetingState) => {
      return produce(targetingState, (draftState) => {
        draftState.budget = budget
      })
    })
  }, [])

  // FUNCTION TO UPDATE CAMPAIGN BUDGET
  const updateCampaignBudget = React.useCallback((campaignBudget) => {
    setTargetingState((targetingState) => {
      return produce(targetingState, (draftState) => {
        draftState.campaignBudget = campaignBudget
      })
    })
  }, [])

  // GET DESKTOP LAYOUT TEST
  const { desktopLayoutWidth } = initialState
  const isDesktopLayout = useBreakpointTest(desktopLayoutWidth)

  // SETTINGS
  const [settingsReady, setSettingsReady] = React.useState(initialState.settingsReady)

  // LOCATION SETTINGS
  const [locationOptions, setLocationOptions] = React.useState(initialState.locationOptions)
  const [popularLocations, setPopularLocations] = React.useState(initialState.popularLocations)
  // * Selected cities and countries
  const [selectedCities, setSelectedCities] = React.useState(initialState.selectedCities)
  const [selectedCountries, setSelectedCountries] = React.useState(initialState.selectedCountries)

  // Budget slider instance (can be used to get, set and reset the slider value from outside the Slider component)
  const [budgetSlider, setBudgetSlider] = React.useState(null)

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
    if (! locationOptionsArray.length) return
    const locationOptionsWithState = targetingHelpers.updateLocationOptionsState({ locationOptionsArray, selectedCities, selectedCountries })
    setLocationOptions(locationOptionsWithState)
    // Update min budget based on selected countries and cities
    const minReccBudget = budgetHelpers.calcMinReccBudget(feedMinBudgetInfo, locationOptionsWithState)
    setMinReccBudget(minReccBudget)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountries.length, selectedCities.length])

  // INIT TARGETING PAGE
  const [errorFetchingSettings, setErrorFetchingSettings] = React.useState(null)
  const initPage = React.useCallback(async (targetingState, error) => {
    // Handle error
    if (error) {
      setErrorFetchingSettings(error)
      return
    }
    setErrorFetchingSettings(null)
    // Fetch popular locations and create location options object
    const { popularLocations } = await targetingHelpers.fetchPopularLocations(artistId)
    if (popularLocations.countries.length === 0 && Boolean(country_code)) {
      popularLocations.countries = [country_code]
    }
    setPopularLocations(popularLocations)
    const locationOptions = createLocationOptions(targetingState, popularLocations)
    // Set initial countries (to trigger min budget)
    const { cityKeys } = targetingState
    let { countryCodes } = targetingState
    if (countryCodes.length === 0 && Boolean(country_code)) {
      countryCodes = [country_code]
    }
    updateLocationsArrays({ cityKeys, countryCodes })
    // Set min recc budget
    const minReccBudget = budgetHelpers.calcMinReccBudget(feedMinBudgetInfo, locationOptions)
    setMinReccBudget(minReccBudget)
    // Set targeting state
    setInitialTargetingState(targetingState)
    setTargetingState(targetingState)
    updateSpending((targetingState.budget / currencyOffset), ! targetingState.status)
    setSettingsReady(true)
  }, [artistId, country_code, createLocationOptions, feedMinBudgetInfo, updateSpending, currencyOffset])

  // DISABLE SAVING (e.g. if budget is too small)
  const [disableSaving, setDisableSaving] = React.useState(initialState.disableSaving)
  React.useEffect(() => {
    // GET BUDGET INFO
    const { minorUnit: {
      minHard: minHardBudget,
    } = {} } = feedMinBudgetInfo
    const isBudgetTooSmall = targetingState.budget < minHardBudget
    const noLocations = ! selectedCountries.length && ! selectedCities.length

    // Disable with budget reason
    if (isBudgetTooSmall) return setDisableSaving('budget')
    // Disable with location reason
    if (noLocations) return setDisableSaving('location')
    // Reset
    setDisableSaving(initialState.disableSaving)
  }, [targetingState.budget, feedMinBudgetInfo, currencyOffset, selectedCountries, selectedCities, locationOptions])

  React.useEffect(() => {
    const minReccBudget = budgetHelpers.calcMinReccBudget(feedMinBudgetInfo, locationOptions)
    setMinReccBudget(minReccBudget)
  }, [feedMinBudgetInfo, locationOptions])

  const updateOrganizationArtists = React.useCallback((spendingStatus) => {
    const currentOrganizationArtistIndex = organizationArtists.findIndex((artist) => artist.id === artistId)
    const updatedOrganizationArtists = produce(organizationArtists, (draftState) => {
      draftState[currentOrganizationArtistIndex].preferences.targeting.status = spendingStatus
    })
    setOrganizationArtists(updatedOrganizationArtists)
  }, [artistId, setOrganizationArtists, organizationArtists])

  // SAVE CAMPAIGN
  const settingsSaved = React.useRef(initialState.settingsSaved)
  const [settingsSavedInitial, setSettingsSavedInitial] = React.useState(initialState.settingsSavedInitial)
  const [errorUpdatingSettings, setErrorUpdatingSettings] = React.useState(null)
  const [saving, setSaving] = React.useState(false)
  const saveTargetingSettings = React.useCallback(async (settings) => {
    // Start saving
    setSaving(true)
    setTargetingLoading(true)
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
      settingsSaved.current = true
      setSettingsSavedInitial(isFirstTimeUser)
      setTargetingState(savedState)
      setInitialTargetingState(savedState)
      updateSpendingPaused(savedState.status)
      updateOrganizationArtists(savedState.status)
      updateBudget(savedState.budget / currencyOffset)
      updateSpending((savedState.budget / currencyOffset), ! savedState.status)
    }
    setSelectedCampaignRecc(null)
    setSaving(false)
    setTargetingLoading(false)
  }, [artistId, setTargetingLoading, selectedCities, selectedCountries, currencyOffset, isFirstTimeUser, updateSpendingPaused, updateBudget, updateSpending, updateOrganizationArtists])

  // PAUSE CAMPAIGN
  const togglePauseCampaign = React.useCallback(() => {
    const { status } = initialTargetingState
    const isPaused = status === 0
    const newPausedState = isPaused ? 1 : 0
    const newSettings = produce(initialTargetingState, (draftState) => {
      if (isPaused) {
        draftState.campaignBudget.startDate = null
        draftState.campaignBudget.endDate = null
        draftState.campaignBudget.totalBudget = 0
      }

      draftState.status = newPausedState
    })

    saveTargetingSettings(newSettings)
    updateSpendingPaused(newPausedState)
    updateOrganizationArtists(newPausedState)
  }, [initialTargetingState, saveTargetingSettings, updateSpendingPaused, updateOrganizationArtists])

  // CANCEL UPDATE SETTINGS
  const cancelUpdateSettings = React.useCallback(() => {
    if (settingsSaved.current) {
      settingsSaved.current = false
      return
    }
    // Set targeting state to initial state (except budget)
    const { budget } = targetingState
    const resetState = {
      ...initialTargetingState,
      budget,
    }
    setTargetingState(resetState)
    // Reset selected locations
    // Set initial countries  (to trigger min budget)
    const { cityKeys, countryCodes } = resetState
    updateLocationsArrays({ cityKeys, countryCodes })
  }, [targetingState, initialTargetingState])

  // Reset and initialise on mount or when artist id changes
  useAsyncEffect(async (isMounted) => {
    setErrorFetchingSettings(null)
    setSettingsReady(false)
    setLocationOptions({})
    setSelectedCampaignRecc(null)

    // Reset locations
    setSelectedCities(initialState.selectedCities)
    setSelectedCountries(initialState.selectedCountries)

    // Reset targeting state
    setInitialTargetingState(initialState.targetingState)
    setTargetingState(initialState.targetingState)

    // Reset budget slider instance
    setBudgetSlider(initialState.budgetSlider)

    // Fetch and initialise targeting state
    if (artistId) {
      const state = await targetingHelpers.fetchTargetingState(artistId, currencyOffset)
      if (! isMounted()) return

      const { error } = state
      await initPage(state, error)
    }
  }, [artistId])


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
        selectedCampaignRecc,
        setSelectedCampaignRecc,
        selectedCampaignType,
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
        settingsReady,
        setSettingsReady,
        createLocationOptions,
        locationOptions,
        setLocationOptions,
        popularLocations,
        selectedCities,
        setSelectedCities,
        selectedCountries,
        setSelectedCountries,
        errorFetchingSettings,
        initPage,
        targetingLoading,
        budgetSlider,
        setBudgetSlider,
        updateCampaignBudget,
      }}
    >
      {children}
    </TargetingContext.Provider>
  )
}

export { TargetingContext, TargetingContextProvider }
