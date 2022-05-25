/* eslint-disable quotes */

export default {
  titlePartA: 'Grow your audience, generate sales',
  titlePartB: 'and never log in to Ads Manager again.',
  twoThousandPlus: 'Spending more than £2,000 per month? [Get in touch](https://meetings.hubspot.com/feed/enterprise)',
  currencies: {
    GBP: '£',
    USD: '$',
    EUR: '€',
    CAD: '$',
    AUD: '$',
    NOK: 'kr',
    MXN: '$',
    SEK: 'kr',
  },
  get currencyOptions() {
    return Object.keys(this.currencies)
  },
  footnotes: `
  ^ A profile is a Facebook page and Instagram account for the same person, brand or company\n
  ° Multiple objectives coming June-July 2022
  `,
}
