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
  budget: (cboState, currency) => {
    const { budget } = cboState
    const budgetFormatted = utils.formatCurrency(budget, currency)
    return `${budgetFormatted} per day`
  },
  ages: (cboState) => {
    const { minAge, maxAge } = cboState
    return `${minAge} - ${maxAge}`
  },
  genders: (cboState) => {
    const { genders } = cboState
    return genders
  },
  countries: (cboState) => {
    const { countries } = cboState
    return countries.map(({ name }) => name).join(', ')
  },
  cities: (cboState) => {
    const { cities } = cboState
    return cities.map(({ name }) => name).join(', ')
  },
}


// FOR DEV
// ---------------------------
export const demoCboState = {
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
    id: 1,
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
    id: 2,
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
