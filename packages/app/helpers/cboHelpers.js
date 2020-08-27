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
    return countries.join(', ')
  },
  cities: (cboState) => {
    const { cities } = cboState
    return cities.join(', ')
  },
}


// FOR DEV
// ---------------------------
export const demoCboState = {
  minAge: 23,
  maxAge: 45,
  genders: 'men',
  countries: ['UK'],
  cities: ['Paris', 'Marseille', 'L\'Isle sur Sogue'],
  budget: 3,
  minBudget: 2,
}

export const setCboState = (oldState, newState) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const state = {
        ...oldState,
        ...newState,
      }
      resolve(state)
    }, 500)
  })
}

export const demoRecs = [
  {
    id: 1,
    budget: 5,
    countries: [{ id: 'uk', name: 'UK' }],
    cities: [{ id: 'paris', name: 'Paris' }],
  },
  {
    id: 2,
    budget: 6,
    countries: [{ id: 'france', name: 'France' }],
    cities: [{ id: 'london', name: 'London' }, { id: 'bolton', name: 'Bolton' }],
  },
]
