import * as utils from '@/helpers/utils'
import * as api from '@/helpers/api'
import { fireSentryError } from '@/app/helpers/sentryHelpers'
import { pricingNumbers } from '@/constants/pricing'

// TESTING
// -------
const triggerBudgetError = ({ errorMessage, value, currencyCode }) => {
  const errorDescription = `${errorMessage}\nCalculated value is ${value}, in currency ${currencyCode}`
  fireSentryError({ description: errorDescription })
}

// This checks that the rounding has produced a reasonable budget amount
const checkBudgetError = ({
  minBaseUnrounded,
  minHard,
  minRecommendedBase,
  minRecommendedStories,
  currencyCode,
}) => {
  // Check minHard error
  if (((minHard / minBaseUnrounded) < 2) || ((minHard / minBaseUnrounded) > 3)) {
    return { errorMessage: 'minHard Error', value: minHard / minBaseUnrounded, currencyCode }
  }
  // Check minBase error
  if (((minRecommendedBase / minBaseUnrounded) < 3) || ((minRecommendedBase / minBaseUnrounded) > 4)) {
    return { errorMessage: 'minRecommendedBase Error', value: minRecommendedBase / minBaseUnrounded, currencyCode }
  }
  // Check minStories error
  if (((minRecommendedStories / minBaseUnrounded) < 5) || ((minRecommendedStories / minBaseUnrounded) > 7)) {
    return { errorMessage: 'minRecommendedStories Error', value: minRecommendedStories / minBaseUnrounded, currencyCode }
  }
  // No errors
  return null
}

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

const getFbMinMultipleCalc = (fbMin, serviceFee) => (fbMultiple, rounded = true) => {
  const amount = (fbMultiple * fbMin) / (1 - serviceFee)
  if (! rounded) return amount
  return roundUpAmount(amount)
}

// CALC MIN BUDGET PROPS
// ---------------------

export const calcFeedMinBudgetInfo = (artist) => {
  if (! artist || ! artist.min_daily_budget_info) return
  // Service Feed
  const serviceFee = 10 / 100
  // Extra info from artist
  const { min_daily_budget_info: {
    amount: fbMin,
    currency: { code: currencyCode, offset: currencyOffset },
  } } = artist
  const calcFbMinMultiple = getFbMinMultipleCalc(fbMin, serviceFee)
  // Calc min values
  const minBaseUnrounded = calcFbMinMultiple(1, false)
  const minBase = calcFbMinMultiple(1)
  const minHard = Math.min(calcFbMinMultiple(2), minBase * 2)
  const minRecommendedBase = Math.min(calcFbMinMultiple(3), minBase * 3)
  const minRecommendedStories = Math.min(calcFbMinMultiple(5), minBase * 5)
  const extraCountryCost = minBase
  const extraCityCost = minBase / 4
  // The values in the smallest currency unit (eg pence)
  const minorUnit = {
    minBaseUnrounded,
    minBase,
    minHard,
    minRecommendedBase,
    minRecommendedStories,
    extraCountryCost,
    extraCityCost,
  }
  // The value in the largest currency unit (eg pound)
  const majorUnit = {
    minBaseUnrounded: minBaseUnrounded / currencyOffset,
    minBase: minBase / currencyOffset,
    minHard: minHard / currencyOffset,
    minRecommendedBase: minRecommendedBase / currencyOffset,
    minRecommendedStories: minRecommendedStories / currencyOffset,
    extraCountryCost: extraCountryCost / currencyOffset,
    extraCityCost: extraCityCost / currencyOffset,
  }
  // The value as a formatted string
  const string = {
    minBaseUnrounded: utils.formatCurrency(majorUnit.minBaseUnrounded, currencyCode),
    minBase: utils.formatCurrency(majorUnit.minBase, currencyCode),
    minHard: utils.formatCurrency(majorUnit.minHard, currencyCode),
    minRecommendedBase: utils.formatCurrency(majorUnit.minRecommendedBase, currencyCode),
    minRecommendedStories: utils.formatCurrency(majorUnit.minRecommendedStories, currencyCode),
    extraCountryCost: utils.formatCurrency(majorUnit.extraCountryCost, currencyCode),
    extraCityCost: utils.formatCurrency(majorUnit.extraCityCost, currencyCode),
  }

  // Check for errors
  const budgetError = checkBudgetError({
    minBaseUnrounded,
    minHard,
    minRecommendedBase,
    minRecommendedStories,
    currencyCode,
  })
  // Trigger error in Sentry (if there is one)
  if (budgetError) triggerBudgetError(budgetError)

  return {
    minorUnit,
    majorUnit,
    string,
    currencyCode,
    currencyOffset,
  }
}


const testForSelectedCountries = (locationOptionsArray) => {
  return !! locationOptionsArray.find(({ selected }) => selected)
}

const countCountriesSpannedByCities = (locationOptionsArray) => {
  const spannedCountries = locationOptionsArray.filter(({ totalCitiesSelected }) => {
    return totalCitiesSelected && totalCitiesSelected >= 1
  })
  return spannedCountries.length
}

export const calcLocationsCost = (budgetInfo, locationOptions) => {
  // Get units for locations
  const { minorUnit: { extraCountryCost, extraCityCost } } = budgetInfo
  // Convert locations to array
  const locationOptionsArray = Object.values(locationOptions)
  // Test if at least one country is selected
  const hasSelectedCountry = testForSelectedCountries(locationOptionsArray)
  // If no countries are selected, count how many countries the selected cities span
  // (no need to do this if at least one country has been selected)
  const countriesWithSelectedCities = ! hasSelectedCountry ? countCountriesSpannedByCities(locationOptionsArray) : undefined
  // If no country selected and selected cities span only 1 country, then no cost
  if (! hasSelectedCountry && countriesWithSelectedCities <= 1) return 0
  // Calc cost of locations
  let ignoreCountry = true
  const locationCost = locationOptionsArray.reduce((cost, { selected: countrySelected, totalCitiesSelected }) => {
    if (countrySelected) {
      // Ignore the first country
      if (ignoreCountry) {
        ignoreCountry = false
        return cost
      }
      cost += extraCountryCost
      return cost
    }
    const totalCitiesCapped = Math.min(totalCitiesSelected, 4)
    cost += extraCityCost * totalCitiesCapped
    return cost
  }, 0)
  return locationCost
}

export const calcMinReccBudget = (budgetInfo, locationOptions) => {
  if (! Object.keys(budgetInfo).length || ! Object.keys(locationOptions).length) return null

  const { minorUnit: { minRecommendedBase } } = budgetInfo
  const locationCost = calcLocationsCost(budgetInfo, locationOptions)
  const totalMinRecc = minRecommendedBase + locationCost
  return totalMinRecc
}

// GET MIN BUDGETS
/**
* @param {string} artistId
* @returns {Promise<any>}
*/
export const getMinBudgets = async (artistId) => {
  const endpoint = `artists/${artistId}/min_budgets`
  const payload = {}
  const errorTracking = {
    category: 'Budgets',
    action: 'Get min budgets',
  }
  return api.requestWithCatch('get', endpoint, payload, errorTracking)
}

/**
 * @param {('free' | 'growth' | 'pro' | 'legacy')} tier
 * @param {number} dailyBudget
 * @param {object} currency
 */
export const mayExceedSpendCap = (
  tier,
  dailyBudget,
  currency = { code: 'GBP', offset: 100 },
) => {
  if (! tier || tier === 'legacy') return false
  const spendCap = pricingNumbers[tier].maxSpend[currency.code]
  const spendCapMinorUnit = spendCap * currency.offset
  const dailySpendCap = spendCapMinorUnit / 30
  return dailyBudget >= dailySpendCap
}
