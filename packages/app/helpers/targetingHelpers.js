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
  paused: false,
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
export const calcBudgetSliderConfig = (fbMin) => {
  const sliderStep = Math.round(fbMin) / 4
  const sliderValueRange = [fbMin, fbMin * 30]
  return { sliderStep, sliderValueRange }
}

// Calc min recc budget
export const calcMinReccBudget = ({ minBudgetInfo, totalCities, totalCountries }) => {
  const cityUnit = 0.25
  const countryUnit = 1
  const baseBudget = calcMinBudget(minBudgetInfo, 'recc')
  const fbMin = calcMinBudget(minBudgetInfo, 'hard')
  const cityCost = (fbMin * (cityUnit * totalCities))
  const countryCost = (fbMin * (countryUnit * totalCountries))
  const minRec = baseBudget + cityCost + countryCost
  // Round min rec to slider step
  return minRec
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
        console.log('Fetched loactions for ', artistId)
        resolve(demoPopuplarLocations)
      }, 400)
    })
  }
  const { res: popularLocations, error } = await server.getTargetingPopularLocations(artistId)
  return { popularLocations, error }
}

const getMergedLocations = (current, popular, locationKey) => {
  return current.reduce((arr, location) => {
    // Is the current location already in the popular location list?
    const isAlreadyPresent = popular.find((l) => l[locationKey] === location[locationKey])
    // Yes? Ignore
    if (isAlreadyPresent) return arr
    // No? Add it
    return [...arr, location]
  }, popular)
}

// Create locations object (sort cities into countries)
export const formatPopularLocations = (popularLocations, currentLocations) => {
  const { cities: popularCities, countries: popularCountries } = popularLocations
  const { cities: currentCities, countries: currentCountries } = currentLocations
  // Merge current cities and popular cities
  const citiesMerged = getMergedLocations(currentCities, popularCities, 'key')
  // Merge current countires and popular countires
  const countriesMerged = getMergedLocations(currentCountries, popularCountries, 'code')
  // Build initial locations OBJ based on available countries
  const locationCountries = countriesMerged.reduce((obj, country) => {
    const { code } = country
    obj[code] = {
      ...country,
      cities: [],
    }
    return obj
  }, {})
  // Build popular locations
  return citiesMerged.reduce((obj, city) => {
    const { country_code } = city
    const countryObj = obj[country_code]
    const cityWithSelected = { ...city, selected: false }
    // If country already exists, add location
    if (countryObj) {
      countryObj.cities.push(cityWithSelected)
      return obj
    }
    // Else start building country object
    const country = countriesMerged.find(({ code }) => code === country_code)
    const { audience_pct, name, key } = country
    obj[country_code] = {
      name,
      key,
      audience_pct,
      cities: [cityWithSelected],
      selected: false,
    }
    return obj
  }, locationCountries)
}


// FETCH CAMPAIGN SETTINGS
// ----------------------
const formatSettings = (settings) => {
  // Format settings
  return produce(settings, draftSettings => {
    if (typeof draftSettings.paused !== 'boolean') {
      draftSettings.paused = false
    }
    draftSettings.cities = draftSettings.geo_locations.cities
    draftSettings.countries = draftSettings.geo_locations.countries
  })
}

export const fetchTargetingState = async (artistId) => {
  if (!artistId) {
    const errorMessage = 'Cannot fetch targeting state because no artist ID has been provided'
    console.error(errorMessage)
    return { error: { message: errorMessage } }
  }
  const { res: settings, error } = await server.getTargetingSettings(artistId)
  if (error) return { error }
  return formatSettings(settings)
}

// SAVE CAMPAIGN SETTINGS
// ----------------------
export const saveCampaign = async (artistId, newSettings, selectedCities, selectedCountries, useDummyData) => {
  if (useDummyData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newSettings)
      }, 1000)
    })
  }
  const { res: settings, error } = await server.saveTargetingSettings(artistId, newSettings, selectedCities, selectedCountries)
  if (error) return { error }
  return formatSettings(settings)
}
