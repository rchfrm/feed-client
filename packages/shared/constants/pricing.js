export const currencies = [
  'GBP',
  'USD',
  'EUR',
  'CAD',
  'AUD',
  'NOK',
  'SEK',
]

export const pricingNumbers = {
  legacy: {
    monthlyCost: {
      GBP: 0,
      USD: 0,
      EUR: 0,
      CAD: 0,
      AUD: 0,
      NOK: 0,
      SEK: 0,
    },
    maxSpend: {
      GBP: 0,
      USD: 0,
      EUR: 0,
      CAD: 0,
      AUD: 0,
      SEK: 0,
      NOK: 0,
    },
    serviceFeePercentage: 0.1,
  },
  free: {
    monthlyCost: {
      GBP: 0,
      USD: 0,
      EUR: 0,
      CAD: 0,
      AUD: 0,
      NOK: 0,
      SEK: 0,
    },
    maxSpend: {
      GBP: 100,
      USD: 100,
      EUR: 100,
      CAD: 200,
      AUD: 200,
      NOK: 1000,
      SEK: 1000,
    },
    serviceFeePercentage: 0,
  },
  growth: {
    monthlyCost: {
      GBP: 25,
      USD: 30,
      EUR: 30,
      CAD: 40,
      AUD: 45,
      NOK: 300,
      SEK: 300,
    },
    maxSpend: {
      GBP: 250,
      USD: 300,
      EUR: 300,
      CAD: 400,
      AUD: 450,
      SEK: 3000,
      NOK: 3000,
    },
    serviceFeePercentage: 0,
  },
  pro: {
    monthlyCost: {
      GBP: 50,
      USD: 60,
      EUR: 60,
      CAD: 80,
      AUD: 90,
      NOK: 600,
      SEK: 600,
    },
    maxSpend: {
      GBP: 2000,
      USD: 2400,
      EUR: 2400,
      CAD: 3200,
      AUD: 3600,
      SEK: 24000,
      NOK: 24000,
    },
    serviceFeePercentage: 0,
  },
}

const { free, growth, pro } = pricingNumbers

export const pricingPlans = [
  {
    name: 'free',
    description: 'Audience growth for independent artists. Suitable for any level of budget.',
    monthlyCost: free.monthlyCost,
    serviceFeePercentage: free.serviceFeePercentage,
    features: [
      'One user and one profile*',
      'Organic insights & benchmarks',
    ],
    maxSpend: free.maxSpend,
  },
  {
    name: 'growth',
    description: 'Extra features to step up growth and manage multiple artists.',
    monthlyCost: growth.monthlyCost,
    serviceFeePercentage: growth.serviceFeePercentage,
    features: [
      'Everything in **Free** plus...',
      'Connect unlimited profiles^',
    ],
    maxSpend: growth.maxSpend,
  },
  {
    name: 'pro',
    description: 'For pro marketers & those looking to sell vinyl, merch and tickets.',
    monthlyCost: pro.monthlyCost,
    serviceFeePercentage: pro.serviceFeePercentage,
    features: [
      'Everything in **Growth** plus...',
    ],
    maxSpend: pro.maxSpend,
  },
]
