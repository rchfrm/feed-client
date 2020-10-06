import * as utils from '@/helpers/utils'
import * as server from '@/app/helpers/appServer'
import produce from 'immer'

// FOR DEV
// ---------------------------
export const demotargetingState = {
  age_min: 23,
  age_max: 45,
  genders: [],
  geo_locations: {
    countries: [
      { code: 'GB', name: 'UK' },
      { code: 'DE', name: 'Germany' },
    ],
    cities: [
      { key: 'paris', name: 'Paris', country_code: 'FR' },
      { key: 'marseille', name: 'Marseille', country_code: 'FR' },
      { key: 'lislesursogue', name: 'L\'Isle sur Sogue', country_code: 'FR' },
    ],
  },
  budget: 2.32,
  status: 0,
}


export const demoRecs = [
  {
    id: '1',
    title: 'Option A',
    type: 'recommended',
    budget: 5,
    age_min: 18,
    age_max: 65,
    countries: [{ key: 'GB', name: 'UK' }],
    cities: [{ key: 'paris', name: 'Paris' }],
  },
  {
    id: '2',
    title: 'Option B',
    type: 'recommended',
    budget: 6,
    age_min: 18,
    age_max: 65,
    countries: [{ key: 'FR', name: 'France' }],
    cities: [{ key: 'london', name: 'London' }, { key: 'bolton', name: 'Bolton' }],
  },
]


const demoPopuplarLocations = {
  countries: [
    { code: 'GB', name: 'UK', audience_pct: 34 },
    { code: 'FR', name: 'France', audience_pct: 23 },
    { code: 'GR', name: 'Greece', audience_pct: 12 },
    { code: 'CHD', name: 'Chad', audience_pct: 7 },
  ],
  cities: [
    { key: 'paris', name: 'Paris', country_code: 'FR', audience_pct: 12 },
    { key: 'marseille', name: 'Marseille', country_code: 'FR', audience_pct: 8 },
    { key: 'nice', name: 'Nice', country_code: 'FR', audience_pct: 4 },

    { key: 'london', name: 'London', country_code: 'GB', audience_pct: 22 },
    { key: 'bolton', name: 'Bolton', country_code: 'GB', audience_pct: 16 },
    { key: 'bristol', name: 'Bristol', country_code: 'GB', audience_pct: 14 },
    { key: 'cardiff', name: 'Cardiff', country_code: 'GB', audience_pct: 8 },
  ],
}

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

// Calc hard min budget
export const calcMinBudget = (minBudgetInfo, type) => {
  const {
    amount,
    currency: {
      code: currencyCode,
      offset: currencyOffset,
    },
  } = minBudgetInfo
  const {
    fbMinRounded,
    minBudgetRounded,
  } = utils.getMinBudget(amount, currencyCode, currencyOffset)
  if (type === 'hard') return fbMinRounded * currencyOffset
  return minBudgetRounded * currencyOffset
}

// Get slider config
const getSliderRange = (defaultMin, defaultMax, initialBudget) => {
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
    const newMin = initialBudget - ((range * 3) / 4)
    const newMax = newMin + range
    return [newMin, newMax]
  }
  // Else defaults
  return [defaultMin, defaultMax]
}

export const calcBudgetSliderConfig = (minHardBudget, initialBudget) => {
  const sliderStep = Math.round(minHardBudget) / 4
  const defaultMin = minHardBudget * 2
  const defaultMax = minHardBudget * 30
  const sliderValueRange = getSliderRange(defaultMin, defaultMax, initialBudget)
  return { sliderStep, sliderValueRange }
}

// Calc min recc budget
export const calcMinReccBudget = ({ minBudgetInfo, locationOptions }) => {
  const cityUnit = 0.25
  const countryUnit = 1
  const fbMin = calcMinBudget(minBudgetInfo, 'hard')
  const baseBudget = calcMinBudget(minBudgetInfo, 'recc')
  const locationOptionsArray = Object.values(locationOptions)
  const minRecc = locationOptionsArray.reduce((budget, { selected: countrySelected, totalCitiesSelected }, index) => {
    if (countrySelected) {
      // Ignore the first country
      if (index !== 0) {
        budget += (fbMin * countryUnit)
      }
      return budget
    }
    const cappedCities = Math.min(totalCitiesSelected, 4)
    budget += (fbMin * (cityUnit * cappedCities))
    return budget
  }, baseBudget)
  return minRecc
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
export const fetchPopularLocations = async (artistId, useDummyData) => {
  // * TEMP
  if (useDummyData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(demoPopuplarLocations)
      }, 400)
    })
  }
  const { res: popularLocations, error } = await server.getTargetingPopularLocations(artistId)
  return { popularLocations, error }
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
    draftSettings.budget = Math.round(draftSettings.budget * currencyOffset)
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
  if (error) return { error }
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
  const { age_min, age_max, budget, genders, status } = newSettings
  const payload = {
    age_min,
    age_max,
    budget: budget / currencyOffset,
    genders,
    geo_locations: {
      cities: selectedCities,
      countries: selectedCountries,
    },
    status,
  }
  const { res: settings, error } = await server.saveTargetingSettings(artistId, payload)
  if (error) return { error }
  return formatSettings(settings, currencyOffset)
}
