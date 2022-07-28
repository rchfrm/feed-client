/* eslint-disable quotes */

import { getMaxSpendString } from '@/helpers/utils'

const pricingCopy = {
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

export default pricingCopy
