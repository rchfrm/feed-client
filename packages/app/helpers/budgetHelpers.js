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

export default calcFeedMinBudgetInfo
