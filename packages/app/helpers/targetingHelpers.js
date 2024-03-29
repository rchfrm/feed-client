import produce from 'immer'

import * as utils from '@/helpers/utils'
import * as server from '@/app/helpers/appServer'
import * as api from '@/helpers/api'
import { fireSentryError } from '@/app/helpers/sentryHelpers'
import moment from 'moment'


// BUDGET FEATURES
// ---------------
const getBudgetFeatures = (baseBudget = 3) => {
  return [
    {
      featureName: 'Include Stories',
      budgetLimit: baseBudget + 2,
    },
    {
      featureName: 'Retargeting',
      budgetLimit: baseBudget + 8,
    },
  ]
}

export const getNextBudgetUpgrade = (currentBudget) => {
  // Define array of upgrades
  const potentialUpgrades = getBudgetFeatures()
  const availableUpgrades = potentialUpgrades.reduce((upgrades, upgrade) => {
    const { budgetLimit } = upgrade
    if (currentBudget < budgetLimit) return [...upgrades, upgrade]
    return upgrades
  }, [])
  // Return first budget upgrade
  return availableUpgrades[0]
}


// Get slider config
const getSliderRange = (defaultMin, defaultMax, sliderStep, initialBudget) => {
  // If no initial budget use defaults
  if (! initialBudget) {
    return [defaultMin, defaultMax]
  }
  // Budget less than default min
  if (initialBudget < defaultMin) {
    return [initialBudget, defaultMax]
  }
  // Budget greater than default max
  if (initialBudget >= defaultMax) {
    const range = defaultMax - defaultMin
    const newMin = Math.round((initialBudget - ((range * 3) / 4)) * sliderStep) / sliderStep
    const newMax = newMin + range
    return [newMin, newMax]
  }
  // Else defaults
  return [defaultMin, defaultMax]
}

export const calcBudgetSliderConfig = (minBase, minHard, initialBudget, objective) => {
  const sliderStep = Math.round(minBase / 4)
  const defaultMaxMultiplier = objective === 'sales' ? 30 : 20
  const defaultMin = minHard
  const defaultMax = minBase * defaultMaxMultiplier
  const sliderValueRange = getSliderRange(defaultMin, defaultMax, sliderStep, initialBudget)
  return { sliderStep, sliderValueRange }
}

export const getSaveDisabledReason = (reason) => {
  if (reason === 'budget') return 'Budget is too small'
  return 'Select at least one location'
}

// SUMMARY HELPERS
// ---------------

export const getSummary = {
  budget: (targetingState, currency) => {
    const { budget } = targetingState
    const budgetFormatted = utils.formatCurrency(budget, currency)
    return `${budgetFormatted} per day`
  },
  ages: (targetingState) => {
    const { age_min, age_max } = targetingState
    return `${age_min} - ${age_max}`
  },
  genders: (targetingState) => {
    const { genders } = targetingState
    const totalGenders = genders.length
    if (! totalGenders) return 'All'
    return genders.reduce((str, gender, index) => {
      const isLast = index === totalGenders - 1
      const name = utils.capitalise(gender)
      if (isLast) return `${str}${name}`
      return `${str}${name}, `
    }, '')
  },
  platforms: (targetingState) => {
    const { platforms } = targetingState
    const totalPlatforms = platforms.length
    if (! totalPlatforms) return 'Both'
    return platforms.reduce((str, gender, index) => {
      const isLast = index === totalPlatforms - 1
      const name = utils.capitalise(gender)
      if (isLast) return `${str}${name}`
      return `${str}${name}, `
    }, '')
  },
  countries: (targetingState) => {
    const { countries } = targetingState
    if (! countries || ! countries.length) return '-'
    return countries.map(({ name }) => name).join(', ')
  },
  cities: (targetingState) => {
    const { cities } = targetingState
    if (! cities || ! cities.length) return '-'
    return cities.map(({ name }) => name).join(', ')
  },
}


// SETTINGS HELPERS
// ----------------

// Fetch the popular locations
export const fetchPopularLocations = async (artistId) => {
  const { res, error } = await server.getTargetingPopularLocations(artistId)
  if (error) {
    // Sentry error
    fireSentryError({
      category: 'Controls',
      action: 'Error fetching popular locations',
      description: error.message,
    })
    return { error }
  }
  return { popularLocations: res?.geolocations, error }
}

const getMergedLocations = (currentRegions, popularRegions, locationKey) => {
  return currentRegions.reduce((arr, location) => {
    // Is the current location already in the popular location list?
    const isAlreadyPresent = popularRegions.length ? popularRegions.find((l) => l[locationKey] === location[locationKey]) : false
    // Yes? Ignore
    if (isAlreadyPresent) return arr
    // No? Add it
    return [...arr, location]
  }, popularRegions)
}



// Create locations object (sort cities into countries)
export const formatPopularLocations = (currentLocations, popularLocations) => {
  const { cities: popularCities = [], countries: popularCountries = [] } = popularLocations
  const { cities: currentCities, countries: currentCountries } = currentLocations
  // Get array of current cities and country keys/codes
  const currentCityKeys = currentCities.map(({ key }) => key)
  const currentCountryCodes = currentCountries.map(({ code }) => code)
  // Merge current cities and popular cities
  const citiesMerged = getMergedLocations(currentCities, popularCities, 'key')
  // Merge current countires and popular countires
  const countriesMerged = getMergedLocations(currentCountries, popularCountries, 'code')
  // Build initial locations OBJ based on available countries
  const locationCountries = countriesMerged.reduce((obj, country) => {
    const { code } = country
    const isCountrySelected = country ? currentCountryCodes.includes(code) : false
    obj[code] = {
      ...country,
      cities: [],
      totalCitiesSelected: 0,
      selected: isCountrySelected,
    }
    return obj
  }, {})
  // Build popular locations
  return citiesMerged.reduce((obj, city) => {
    const { country_code, country_name, key } = city
    const countryObj = obj[country_code]
    const isCitySelected = currentCityKeys.includes(key)
    const cityWithSelectedState = { ...city, selected: isCitySelected }
    // If country already exists, add location
    if (countryObj) {
      if (cityWithSelectedState.selected) {
        countryObj.totalCitiesSelected += 1
      }
      countryObj.cities.push(cityWithSelectedState)
      return obj
    }
    // Else start building country object
    const country = countriesMerged.find(({ code }) => code === country_code)
    const { audience_pct, name } = country || {}
    obj[country_code] = {
      name: name || country_name,
      code: country_code,
      audience_pct,
      cities: [cityWithSelectedState],
      selected: false,
      totalCitiesSelected: 1,
    }
    return obj
  }, locationCountries)
}

// Update selected states on location object
export const updateLocationOptionsState = ({ locationOptionsArray, selectedCities, selectedCountries }) => {
  return locationOptionsArray.reduce((obj, country) => {
    const { code: countryCode, cities } = country
    const isCountrySelected = selectedCountries.includes(countryCode)
    let totalCitiesSelected = 0
    const citiesWithStates = cities.map((city) => {
      const { key } = city
      const isCitySelected = selectedCities.includes(key)
      if (isCitySelected) totalCitiesSelected += 1
      return {
        ...city,
        selected: isCitySelected,
      }
    })
    obj[countryCode] = {
      ...country,
      selected: isCountrySelected,
      cities: citiesWithStates,
      totalCitiesSelected,
    }
    return obj
  }, {})
}


// FETCH CAMPAIGN SETTINGS
// ----------------------
const formatSettings = (settings, currencyOffset) => {
  // Format settings
  return produce(settings, (draftSettings) => {
    const { cities, countries } = draftSettings.geo_locations
    draftSettings.budget = currencyOffset ? Math.round(draftSettings.budget * currencyOffset) : 0
    draftSettings.cities = cities
    draftSettings.countries = countries
    draftSettings.cityKeys = cities.map(({ key }) => key)
    draftSettings.countryCodes = countries.map(({ code }) => code)
    draftSettings.campaignBudget = {
      startDate: draftSettings.campaign_budget?.date_from ? new Date(draftSettings.campaign_budget.date_from) : null,
      endDate: draftSettings.campaign_budget?.date_to ? new Date(draftSettings.campaign_budget.date_to) : null,
      totalBudget: draftSettings.campaign_budget?.total,
    }
    delete draftSettings.campaign_budget
  })
}

export const fetchTargetingState = async (artistId, currencyOffset) => {
  if (! artistId) {
    const errorMessage = 'Cannot fetch targeting state because no artist ID has been provided'
    return { error: { message: errorMessage } }
  }
  const { res: settings, error } = await server.getTargetingSettings(artistId)
  // Handle error
  if (error) {
    // Sentry error
    fireSentryError({
      category: 'Controls',
      action: 'Error fetching targeting settings',
      description: error.message,
    })
    return { error }
  }
  return formatSettings(settings, currencyOffset)
}

// SAVE CAMPAIGN SETTINGS
// ----------------------
export const saveCampaign = async ({
  artistId,
  newSettings,
  selectedCities,
  selectedCountries,
  currencyOffset,
  useDummyData,
}) => {
  if (useDummyData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newSettings)
      }, 1000)
    })
  }

  const { campaignBudget, ...otherNewSettings } = newSettings

  const payload = {
    ...otherNewSettings,
    ...(currencyOffset && { budget: otherNewSettings.budget / currencyOffset }),
    geo_locations: {
      cities: selectedCities,
      countries: selectedCountries,
    },
    campaign_budget: {
      date_from: campaignBudget?.startDate,
      date_to: campaignBudget?.endDate,
      total: campaignBudget?.totalBudget,
    },
  }
  const { res: settings, error } = await server.saveTargetingSettings(artistId, payload)
  // Handle error
  if (error) {
    // Sentry error
    fireSentryError({
      category: 'Controls',
      action: 'Error saving targeting settings',
      description: error.message,
    })
    return { error }
  }
  return formatSettings(settings, currencyOffset)
}

// Fetch geo locations
export const getGeoLocations = (query) => {
  const requestUrl = `/actions/search/geolocations?q=${query}`
  const payload = null
  const errorTracking = {
    category: 'Targeting',
    action: 'Fetch geo locations',
  }

  return api.requestWithCatch('get', requestUrl, payload, errorTracking)
}

export const getInterests = (query) => {
  const requestUrl = `/actions/search/interests?q=${query}`
  const payload = null
  const errorTracking = {
    category: 'Targeting',
    action: 'Fetch interests',
  }

  return api.requestWithCatch('get', requestUrl, payload, errorTracking)
}

export const getTotalSpentInPeriod = (dailyData, startDate) => {
  if (! dailyData) return 0

  const dateKeys = Object.keys(dailyData)
  const startDateIndex = dateKeys.findIndex((key) => key === moment(startDate).format('yyyy-MM-DD'))
  const endDateIndex = dateKeys.length

  return dateKeys.slice(startDateIndex, endDateIndex).reduce((total, key) => {
    return total + dailyData[key]
  }, 0)
}

export const getSpendingData = (dailyData) => {
  if (! dailyData) return null

  const latestDayOfSpend = Object.keys(dailyData).filter((date) => dailyData[date] > 0).pop()
  const latestDayOf0Spend = Object.keys(dailyData).filter((date) => date < latestDayOfSpend && dailyData[date] === 0).pop()
  const firstDayOfData = Object.keys(dailyData)[0]
  const startOfCurrentSpendingPeriod = latestDayOf0Spend
    ? moment(latestDayOf0Spend, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD')
    : firstDayOfData
  const lengthOfCurrentSpendingPeriod = Object.keys(dailyData).filter((date) => date >= startOfCurrentSpendingPeriod).length
  return {
    hasSpentConsecutivelyLessThan30Days: lengthOfCurrentSpendingPeriod < 30,
    daysOfSpending: lengthOfCurrentSpendingPeriod,
  }
}

export const getBudgetSuggestions = (objective, minBaseUnrounded) => {
  let multipliers = [4, 6, 9]

  if (objective === 'sales') {
    multipliers = [12, 15, 20]
  }

  return multipliers.map((multiplier) => {
    return Math.round((multiplier * minBaseUnrounded))
  })
}

export const budgetPauseReasonOptions = [
  {
    name: "I don't have the budget right now",
    value: 'no-budget',
  },
  {
    name: "Temporary pause - I'll be back",
    value: 'temporary-pause',
  },
  {
    name: 'Growth was too slow',
    value: 'slow-growth',
    objective: 'growth',
  },
  {
    name: "I didn't see enough sales",
    value: 'not-enough-sales',
    objective: 'sales',
  },
  {
    name: "I didn't see enough visits to my website",
    value: 'not-enough-traffic',
    objective: 'traffic',
  },
  {
    name: "Didn't increase engagement enough",
    value: 'not-enough-engagement',
  },
  {
    name: 'Other',
    value: 'other',
  },
]

export const formatInterestSearchResponse = (interest, platform) => {
  return {
    name: interest.name,
    topic: interest.topic,
    platformId: interest.id,
    platform,
    audienceSizeLowerBound: interest.audience_size_lower_bound,
    audienceSizeUpperBound: interest.audience_size_upper_bound,
    path: interest.path,
    isActive: true,
  }
}

const today = new Date()
today.setHours(0, 0, 0, 0)
/**
 * @param {{ campaignBudget?: { endDate: string }}} targeting
 * @returns {boolean}
 */
export const hasActiveCampaignBudget = (targeting) => {
  const campaignEndDateString = targeting?.campaignBudget?.endDate
  if (campaignEndDateString) {
    const campaignEndDate = new Date(campaignEndDateString)
    if (campaignEndDate > today) {
      return true
    }
  }
  return false
}

/**
 * @param {{ startDate: string, totalBudget: number }} campaignBudget
 * @param {{ [key: string]: number }} adSpendData
 * @returns {number}
 */
export const getRemainingBudget = (campaignBudget, adSpendData) => {
  const startDate = new Date(campaignBudget.startDate)
  const totalSpent = getTotalSpentInPeriod(adSpendData, startDate)
  return Number((campaignBudget.totalBudget - totalSpent).toFixed(2))
}

/**
 * @param {string} endDateString
 * @return {number}
 */
export const getRemainingDays = (endDateString) => {
  const endDate = new Date(endDateString)
  const oneDayInMilliseconds = 1000 * 60 * 60 * 24
  const diffInMilliseconds = endDate - today
  return Math.round(diffInMilliseconds / oneDayInMilliseconds)
}
