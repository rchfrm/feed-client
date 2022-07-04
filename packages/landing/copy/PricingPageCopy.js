/* eslint-disable quotes */

import { addCommasToNumber, getCurrencySymbol } from '@/helpers/utils'
import { plans } from '@/constants/pricing'

export const getMaxSpendString = (currency, maxSpend) => {
  const currencySymbol = getCurrencySymbol(currency)
  const formattedSpend = addCommasToNumber(maxSpend)
  if (currencySymbol === 'kr') {
    return `${formattedSpend} ${currencySymbol}`
  }
  return `${currencySymbol}${formattedSpend}`
}

const { basic, growth, pro, managed } = plans

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
  pricingTiers: [
    {
      name: 'Basic',
      description: 'Audience growth for beginners. Suitable for any level of budget.',
      monthlyCost: basic.monthlyCost,
      serviceFeePercentage: basic.serviceFeePercentage,
      features: [
        'Promote on Facebook & Instagram',
        'Audience growth objectives',
        'Lookalikes and retargeting',
        '100% automated campaign setup',
        'Promote posts and stories',
        'Continuous A/B testing',
        'One user and one profile*',
        'Organic insights & benchmarks',
      ],
      maxSpendMultiple: basic.maxSpendMultiple,
    },
    {
      name: 'Growth',
      description: 'Extra features to step up your growth and manage multiple accounts.',
      monthlyCost: growth.monthlyCost,
      serviceFeePercentage: growth.serviceFeePercentage,
      features: [
        'Everything in **Basic** plus...',
        'Growth and website view objectives',
        'Custom targeting locations',
        'Prioritise a post for instant promotion',
        'Edit individual ad text, links and CTA',
        'Override automated post selection',
        'Connect unlimited profiles^',
      ],
      maxSpendMultiple: growth.maxSpendMultiple,
    },
    {
      name: 'Pro',
      description: 'For pro marketers & those ready to sell to their audience via conversion ads.',
      monthlyCost: pro.monthlyCost,
      serviceFeePercentage: pro.serviceFeePercentage,
      features: [
        'Everything in **Growth** plus...',
        'Run sales ads (conversion ads)',
        'Meta pixel based retargeting',
        'Clear reporting on return from ad spend',
      ],
      maxSpendMultiple: pro.maxSpendMultiple,
    },
  ],
  managedTier: {
    name: 'Managed',
    description: 'Add a digital marketing expert to your team. Everything in the Pro tier plus the benefits below:',
    monthlyCost: managed.monthlyCost,
    serviceFeePercentage: managed.serviceFeePercentage,
    features: [
      'Regular strategy and insight calls',
      'Set-up support &amp; ongoing management of Feed ads',
      'Multiple objectives°',
      'Maximise your results &amp; what you’re learning ',
      'Dedicated account manager',
    ],
  },
}
