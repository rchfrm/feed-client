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


// FOR DEV
// ---------------------------
export const demotargetingState = {
  minAge: 23,
  maxAge: 45,
  genders: 'men',
  countries: [{ id: 'uk', name: 'UK' }],
  cities: [
    { id: 'paris', name: 'Paris' },
    { id: 'marseille', name: 'Marseille' },
    { id: 'lislesursogue', name: 'L\'Isle sur Sogue' },
  ],
  budget: 3,
  minBudget: 2,
  paused: false,
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
