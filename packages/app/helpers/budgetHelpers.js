import * as utils from '@/helpers/utils'

export const calcFeedMinBudgetInfo = (artist) => {
  if (!artist || !artist.min_daily_budget_info) return
  // Extra info from artist
  const { min_daily_budget_info: {
    amount: fbMin,
    currency: { code: currencyCode, offset: currencyOffset },
  } } = artist
  // Calc min values
  const minUnit = utils.roundToFactorOfTen((fbMin) / 0.9)
  const minHard = utils.roundToFactorOfTen((2 * fbMin) / 0.9)
  const minReccomendedBase = utils.roundToFactorOfTen((3 * fbMin) / 0.9)
  const minReccomendedStories = utils.roundToFactorOfTen((5 * fbMin) / 0.9)
  // The values in the smallest currency unit (eg pence)
  const smallestUnit = {
    minUnit,
    minHard,
    minReccomendedBase,
    minReccomendedStories,
  }
  // The value in the largest currency unit (eg pound)
  const largestUnit = {
    minUnit: minUnit / currencyOffset,
    minHard: minHard / currencyOffset,
    minReccomendedBase: minReccomendedBase / currencyOffset,
    minReccomendedStories: minReccomendedStories / currencyOffset,
  }
  // The value as a string
  const string = {
    minUnit: utils.formatCurrency(largestUnit.minUnit, currencyCode),
    minHard: utils.formatCurrency(largestUnit.minHard, currencyCode),
    minReccomendedBase: utils.formatCurrency(largestUnit.minReccomendedBase, currencyCode),
    minReccomendedStories: utils.formatCurrency(largestUnit.minReccomendedStories, currencyCode),
  }
  return {
    smallestUnit,
    largestUnit,
    string,
    currencyCode,
    currencyOffset,
  }
}

export const calcLocationsCost = (budgetInfo, locationOptions) => {
  const { smallestUnit: { minUnit } } = budgetInfo
  // Get units for locations
  const countryUnit = minUnit
  const cityUnit = minUnit * 0.25
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
  const { smallestUnit: { minReccomendedBase } } = budgetInfo
  const locationCost = calcLocationsCost(budgetInfo, locationOptions)
  return minReccomendedBase + locationCost
}
