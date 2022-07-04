export const currencies = [
  'GBP',
  'USD',
  'EUR',
  'CAD',
  'AUD',
  'NOK',
  'MXN',
  'SEK',
]

export const plans = {
  basic: {
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
    maxSpendMultiple: 0,
  },
  growth: {
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
    maxSpendMultiple: 10,
  },
  pro: {
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
    maxSpendMultiple: 40,
  },
  managed: {
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
  },
}
