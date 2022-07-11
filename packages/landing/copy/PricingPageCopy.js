/* eslint-disable quotes */

import { addCommasToNumber, getCurrencySymbol } from '@/helpers/utils'

export const getMaxSpendString = (currency, maxSpend) => {
  const currencySymbol = getCurrencySymbol(currency)
  const formattedSpend = addCommasToNumber(maxSpend)
  if (currencySymbol === 'kr') {
    return `${formattedSpend} ${currencySymbol}`
  }
  return `${currencySymbol}${formattedSpend}`
}

export const pricingCopy = {
  strapLine: 'Grow reach, sales and **never log in to Ads Manager**',
  twoThousandPlus: (currency, maxSpend) => {
    const maxSpendString = getMaxSpendString(currency, maxSpend)
    return `Spending more than ${maxSpendString} per month? [Get in touch](https://meetings.hubspot.com/feed/enterprise)`
  },
  footnotes: `
  ^ A profile is a Facebook page and Instagram account for the same person, brand or company\n
  ° Multiple objectives coming June-July 2022
  `,
}
