import * as utils from '@/helpers/utils'

// FOR DEV
// ---------------------------
export const demotargetingState = {
  minAge: 23,
  maxAge: 45,
  genders: [],
  countries: [
    { key: 'GB', name: 'UK' },
    { key: 'DE', name: 'Germany' },
  ],
  cities: [
    { key: 'paris', name: 'Paris', countryCode: 'FR' },
    { key: 'marseille', name: 'Marseille', countryCode: 'FR' },
    { key: 'lislesursogue', name: 'L\'Isle sur Sogue', countryCode: 'FR' },
  ],
  budget: 2,
  minReccBudget: 2,
  paused: false,
}


export const demoRecs = [
  {
    id: '1',
    title: 'Option A',
    type: 'recommended',
    budget: 5,
    minAge: 18,
    maxAge: 65,
    countries: [{ key: 'GB', name: 'UK' }],
    cities: [{ key: 'paris', name: 'Paris' }],
  },
  {
    id: '2',
    title: 'Option B',
    type: 'recommended',
    budget: 6,
    minAge: 18,
    maxAge: 65,
    countries: [{ key: 'FR', name: 'France' }],
    cities: [{ key: 'london', name: 'London' }, { key: 'bolton', name: 'Bolton' }],
  },
]


const demoPopuplarLocations = {
  countries: [
    { key: 'GB', name: 'UK', audiencePercent: 34 },
    { key: 'FR', name: 'France', audiencePercent: 23 },
  ],
  cities: [
    { key: 'paris', name: 'Paris', countryCode: 'FR', audiencePercent: 12 },
    { key: 'marseille', name: 'Marseille', countryCode: 'FR', audiencePercent: 8 },
    { key: 'nice', name: 'Nice', countryCode: 'FR', audiencePercent: 4 },

    { key: 'london', name: 'London', countryCode: 'GB', audiencePercent: 22 },
    { key: 'bolton', name: 'Bolton', countryCode: 'GB', audiencePercent: 16 },
    { key: 'bristol', name: 'Bristol', countryCode: 'GB', audiencePercent: 14 },
    { key: 'cardiff', name: 'Cardiff', countryCode: 'GB', audiencePercent: 8 },
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


// SUMMARY HELPERS
// ---------------
export const fetchTargetingState = (artistId) => {
  if (!artistId) {
    const errorMessage = 'Cannot fetch targeting state because no artist ID has been provided'
    console.error(errorMessage)
    return { error: { message: errorMessage } }
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(demotargetingState)
    }, 500)
  })
}

export const getSummary = {
  budget: (targetingState, currency) => {
    const { budget } = targetingState
    const budgetFormatted = utils.formatCurrency(budget, currency)
    return `${budgetFormatted} per day`
  },
  ages: (targetingState) => {
    const { minAge, maxAge } = targetingState
    return `${minAge} - ${maxAge}`
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
    return countries.map(({ name }) => name).join(', ')
  },
  cities: (targetingState) => {
    const { cities } = targetingState
    return cities.map(({ name }) => name).join(', ')
  },
}


// SETTINGS HELPERS
// ----------------

// Fetch the popular locations
export const fetchPopularLocations = (artistId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Fetched loactions for ', artistId)
      resolve(demoPopuplarLocations)
    }, 400)
  })
}

const getMergedLocations = (current, popular) => {
  return current.reduce((arr, location) => {
    const { key: currKey } = location
    // Is the current city already in the popular city list?
    const isAlreadyPresent = popular.find(({ key }) => key === currKey)
    // Yes? Ignore
    if (isAlreadyPresent) return arr
    // No? Add it
    return [...arr, location]
  }, popular)
}

// Create locations object (sort cities into countries)
export const createLocationsObject = (popularLocations, currentLocations) => {
  const { cities: popularCities, countries: popularCountries } = popularLocations
  const { cities: currentCities, countries: currentCountries } = currentLocations
  // Merge current cities and popular cities
  const citiesMerged = getMergedLocations(currentCities, popularCities)
  // Merge current countires and popular countires
  const countriesMerged = getMergedLocations(currentCountries, popularCountries)
  // Build initial locations OBJ based on available countries
  const locationCountries = countriesMerged.reduce((obj, country) => {
    const { key } = country
    obj[key] = {
      ...country,
      cities: [],
    }
    return obj
  }, {})
  // Build popular locations
  return citiesMerged.reduce((obj, city) => {
    const { countryCode } = city
    const countryObj = obj[countryCode]
    const cityWithSelected = { ...city, selected: false }
    // If country already exists, add location
    if (countryObj) {
      countryObj.cities.push(cityWithSelected)
      return obj
    }
    // Else start building country object
    const country = countriesMerged.find(({ key }) => key === countryCode)
    const { audiencePercent, name, key } = country
    obj[countryCode] = {
      name,
      key,
      audiencePercent,
      cities: [cityWithSelected],
      selected: false,
    }
    return obj
  }, locationCountries)
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
    fbMinBudgetFloat,
    minBudgetFloat,
  } = utils.getMinBudget(amount, currencyCode, currencyOffset)
  if (type === 'hard') return fbMinBudgetFloat
  return minBudgetFloat
}

// Calc min recc budget
export const calcMinReccBudget = ({ minBudgetInfo, totalCities, totalCountries }) => {
  const cityUnit = 0.25
  const countryUnit = 1
  const baseBudget = calcMinBudget(minBudgetInfo, 'recc')
  const fbMin = calcMinBudget(minBudgetInfo, 'hard')
  const cityCost = (fbMin * (cityUnit * totalCities))
  const countryCost = (fbMin * (countryUnit * totalCountries))
  return baseBudget + cityCost + countryCost
}


// SAVE CAMPAIGN SETTINGS
// ----------------------
export const saveCampaign = (oldState, newState) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const state = {
        ...oldState,
        ...newState,
      }
      resolve(state)
    }, 1000)
  })
}