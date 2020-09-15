import * as utils from '@/helpers/utils'

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
    return genders
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
export const createLocationsObject = (locations) => {
  return locations.cities.reduce((obj, city) => {
    const { countryCode } = city
    const countryObj = obj[countryCode]
    const cityWithSelected = { ...city, selected: false }
    // If country already exists, add location
    if (countryObj) {
      countryObj.cities.push(cityWithSelected)
      return obj
    }
    // Else start building country object
    const country = locations.countries.find(({ key }) => key === countryCode)
    const { audiencePercent, name, key } = country
    obj[countryCode] = {
      name,
      key,
      audiencePercent,
      cities: [cityWithSelected],
      selected: false,
    }
    return obj
  }, {})
}


// FOR DEV
// ---------------------------
export const demotargetingState = {
  minAge: 23,
  maxAge: 45,
  genders: 'men',
  countries: [{ id: 'uk', name: 'UK', countryCode: 'GB' }],
  cities: [
    { key: 'paris', name: 'Paris', countryCode: 'FR' },
    { key: 'marseille', name: 'Marseille' },
    { key: 'lislesursogue', name: 'L\'Isle sur Sogue' },
  ],
  budget: 3,
  minBudget: 2,
  paused: false,
}


export const fetchTargetingCities = (artistId) => {
  const demoTargetingCities = {
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

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Fetched loactions for ', artistId)
      resolve(demoTargetingCities)
    }, 400)
  })
}

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

export const demoRecs = [
  {
    id: '1',
    title: 'Option A',
    type: 'recommended',
    budget: 5,
    minAge: 18,
    maxAge: 65,
    genders: 'all',
    countries: [{ id: 'uk', name: 'UK' }],
    cities: [{ id: 'paris', name: 'Paris' }],
  },
  {
    id: '2',
    title: 'Option B',
    type: 'recommended',
    budget: 6,
    minAge: 18,
    maxAge: 65,
    genders: 'all',
    countries: [{ id: 'france', name: 'France' }],
    cities: [{ id: 'london', name: 'London' }, { id: 'bolton', name: 'Bolton' }],
  },
]
