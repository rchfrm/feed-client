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
  currencies: [
    'GBP',
    'USD',
    'EUR',
    'CAD',
    'AUD',
    'NOK',
    'MXN',
    'SEK',
  ],
  footnotes: `
  ^ A profile is a Facebook page and Instagram account for the same person, brand or company\n
  ° Multiple objectives coming June-July 2022
  `,
  pricingPlans: [
    {
      name: 'Basic',
      description: 'Audience growth for beginners. Suitable for any level of budget.',
      monthlyCost: {
        GBP: 0,
        USD: 0,
        EUR: 0,
        CAD: 0,
        AUD: 0,
        NOK: 0,
        MXN: 0,
        SEK: 0,
      },
      serviceFeePercentage: 0.1,
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
      maxSpendMultiple: 0,
    },
    {
      name: 'Growth',
      description: 'Extra features to step up your growth and manage multiple accounts.',
      monthlyCost: {
        GBP: 25,
        USD: 30,
        EUR: 30,
        CAD: 40,
        AUD: 45,
        NOK: 300,
        MXN: 600,
        SEK: 300,
      },
      serviceFeePercentage: 0,
      features: [
        'Everything in **Basic** plus...',
        'Growth and website view objectives',
        'Custom targeting locations',
        'Prioritise a post for instant promotion',
        'Edit individual ad text, links and CTA',
        'Override automated post selection',
        'Connect unlimited profiles^',
      ],
      maxSpendMultiple: 10,
    },
    {
      name: 'Pro',
      description: 'For pro marketers & those ready to sell to their audience via conversion ads.',
      monthlyCost: {
        GBP: 50,
        USD: 60,
        EUR: 60,
        CAD: 80,
        AUD: 90,
        NOK: 600,
        MXN: 1200,
        SEK: 600,
      },
      serviceFeePercentage: 0,
      features: [
        'Everything in **Growth** plus...',
        'Run sales ads (conversion ads)',
        'Meta pixel based retargeting',
        'Clear reporting on return from ad spend',
      ],
      maxSpendMultiple: 40,
    },
  ],
  managedPlan: {
    name: 'Managed',
    description: 'Add a digital marketing expert to your team. Everything in the Pro tier plus the benefits below:',
    monthlyCost: {
      GBP: 350,
      USD: 400,
      EUR: 400,
      CAD: 600,
      AUD: 600,
      NOK: 4000,
      MXN: 9000,
      SEK: 4000,
    },
    serviceFeePercentage: 0,
    features: [
      'Regular strategy and insight calls',
      'Set-up support &amp; ongoing management of Feed ads',
      'Multiple objectives°',
      'Maximise your results &amp; what you’re learning ',
      'Dedicated account manager',
    ],
  },
}
