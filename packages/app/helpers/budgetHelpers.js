import * as utils from '@/helpers/utils'


// ROUNDING
// --------

const getRoundingValue = (amount) => {
  if (amount < 750) return 100
  if (amount < 5000) return 1_000
  if (amount < 50000) return 10_000
  return 100_000
}

const roundUpAmount = (amount) => {
  const roundTo = getRoundingValue(amount)
  return Math.ceil(amount / roundTo) * roundTo
}

const getFbMinMultipleCalc = (fbMin, serviceFee) => (multiple) => {
  return roundUpAmount((multiple * fbMin) / (1 - serviceFee))
}

export const calcFeedMinBudgetInfo = (artist) => {
  if (!artist || !artist.min_daily_budget_info) return
  // Service Feed
  const serviceFee = 10 / 100
  // Extra info from artist
  const { min_daily_budget_info: {
    amount: fbMin,
    currency: { code: currencyCode, offset: currencyOffset },
  } } = artist
  const calcFbMinMultiple = getFbMinMultipleCalc(fbMin, serviceFee)
  // Calc min values
  const minBase = calcFbMinMultiple(1)
  const minHard = Math.min(calcFbMinMultiple(2), minBase * 2)
  const minReccomendedBase = Math.min(calcFbMinMultiple(3), minBase * 3)
  const minReccomendedStories = Math.min(calcFbMinMultiple(5), minBase * 5)
  const extraCountryCost = minBase
  const extraCityCost = minBase / 4
  // The values in the smallest currency unit (eg pence)
  const minorUnit = {
    minBase,
    minHard,
    minReccomendedBase,
    minReccomendedStories,
    extraCountryCost,
    extraCityCost,
  }
  // The value in the largest currency unit (eg pound)
  const majorUnit = {
    minBase: minBase / currencyOffset,
    minHard: minHard / currencyOffset,
    minReccomendedBase: minReccomendedBase / currencyOffset,
    minReccomendedStories: minReccomendedStories / currencyOffset,
    extraCountryCost: extraCountryCost / currencyOffset,
    extraCityCost: extraCityCost / currencyOffset,
  }
  // The value as a formatted string
  const string = {
    minBase: utils.formatCurrency(majorUnit.minBase, currencyCode),
    minHard: utils.formatCurrency(majorUnit.minHard, currencyCode),
    minReccomendedBase: utils.formatCurrency(majorUnit.minReccomendedBase, currencyCode),
    minReccomendedStories: utils.formatCurrency(majorUnit.minReccomendedStories, currencyCode),
    extraCountryCost: utils.formatCurrency(majorUnit.extraCountryCost, currencyCode),
    extraCityCost: utils.formatCurrency(majorUnit.extraCityCost, currencyCode),
  }

  return {
    minorUnit,
    majorUnit,
    string,
    currencyCode,
    currencyOffset,
  }
}

export const calcLocationsCost = (budgetInfo, locationOptions) => {
  const { minorUnit: { minBase } } = budgetInfo
  // Get units for locations
  const countryUnit = minBase
  const cityUnit = Math.round(minBase * 0.25)
  // Calc cost of locations
  const locationOptionsArray = Object.values(locationOptions)
  const locationCost = locationOptionsArray.reduce((cost, { selected: countrySelected, totalCitiesSelected }, index) => {
    if (countrySelected) {
      // Ignore the first country
      if (index === 0) return cost
      cost += countryUnit
      return cost
    }
    const totalCitiesCapped = Math.min(totalCitiesSelected, 4)
    cost += cityUnit * totalCitiesCapped
    return cost
  }, 0)
  return locationCost
}

export const calcMinReccBudget = (budgetInfo, locationOptions) => {
  const { minorUnit: { minReccomendedBase } } = budgetInfo
  const locationCost = calcLocationsCost(budgetInfo, locationOptions)
  return minReccomendedBase + locationCost
}
