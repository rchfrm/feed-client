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
  if (!initialBudget) {
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
    if (!totalGenders) return 'All'
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
    if (!totalPlatforms) return 'Both'
    return platforms.reduce((str, gender, index) => {
      const isLast = index === totalPlatforms - 1
      const name = utils.capitalise(gender)
      if (isLast) return `${str}${name}`
      return `${str}${name}, `
    }, '')
  },
  countries: (targetingState) => {
    const { countries } = targetingState
    if (!countries || !countries.length) return '-'
    return countries.map(({ name }) => name).join(', ')
  },
  cities: (targetingState) => {
    const { cities } = targetingState
    if (!cities || !cities.length) return '-'
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
  return produce(settings, draftSettings => {
    const { cities, countries } = draftSettings.geo_locations
    draftSettings.budget = currencyOffset ? Math.round(draftSettings.budget * currencyOffset) : 0
    draftSettings.cities = cities
    draftSettings.countries = countries
    draftSettings.cityKeys = cities.map(({ key }) => key)
    draftSettings.countryCodes = countries.map(({ code }) => code)
  })
}

export const fetchTargetingState = async (artistId, currencyOffset) => {
  if (!artistId) {
    const errorMessage = 'Cannot fetch targeting state because no artist ID has been provided'
    console.error(errorMessage)
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

  const payload = {
    ...newSettings,
    ...(currencyOffset && { budget: newSettings.budget / currencyOffset }),
    geo_locations: {
      cities: selectedCities,
      countries: selectedCountries,
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

export const getSpendingData = (dailyData) => {
  if (!dailyData) return null

  const latestDayOfSpend = Object.keys(dailyData).filter(date => dailyData[date] > 0).pop()
  const latestDayOf0Spend = Object.keys(dailyData).filter(date => date < latestDayOfSpend && dailyData[date] === 0).pop()
  const firstDayOfData = Object.keys(dailyData)[0]
  const startOfCurrentSpendingPeriod = latestDayOf0Spend
    ? moment(latestDayOf0Spend, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD')
    : firstDayOfData
  const lengthOfCurrentSpendingPeriod = Object.keys(dailyData).filter(date => date >= startOfCurrentSpendingPeriod).length
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
