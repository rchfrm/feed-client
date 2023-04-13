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
      GBP: 500,
      USD: 600,
      EUR: 600,
      CAD: 800,
      AUD: 900,
      SEK: 6000,
      NOK: 6000,
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
      GBP: 1000,
      USD: 1200,
      EUR: 1200,
      CAD: 1600,
      AUD: 1600,
      SEK: 12000,
      NOK: 12000,
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
