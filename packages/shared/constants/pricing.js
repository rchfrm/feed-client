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
    serviceFeePercentage: 0.1,
    maxSpendMultiple: 0,
  },
  basic: {
    monthlyCost: {
      GBP: 0,
      USD: 0,
      EUR: 0,
      CAD: 0,
      AUD: 0,
      NOK: 0,
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
      SEK: 600,
    },
    serviceFeePercentage: 0,
    maxSpendMultiple: 40,
  },
  managed: {
    monthlyCost: {
      GBP: 399,
      USD: 450,
      EUR: 450,
      CAD: 600,
      AUD: 700,
      NOK: 5000,
      SEK: 5000,
    },
    serviceFeePercentage: 0,
  },
  annualDiscount: 0.2,
}

const { basic, growth, pro, managed } = pricingNumbers

export const pricingPlans = [
  {
    name: 'basic',
    description: 'Audience growth for independent artists. Suitable for any level of budget.',
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
    name: 'growth',
    description: 'Extra features to step up growth and manage multiple artists.',
    monthlyCost: growth.monthlyCost,
    serviceFeePercentage: growth.serviceFeePercentage,
    features: [
      'Everything in **Basic** plus...',
      'Growth and website view objectives',
      'Custom targeting locations',
      'Prioritise a post for instant promotion',
      'Edit individual ad text, links and CTA',
      'Override automated post selection',
      'Meta pixel based retargeting',
      'Connect unlimited profiles^',
    ],
    maxSpendMultiple: growth.maxSpendMultiple,
  },
  {
    name: 'pro',
    description: 'For pro marketers & those looking to sell vinyl, merch and tickets.',
    monthlyCost: pro.monthlyCost,
    serviceFeePercentage: pro.serviceFeePercentage,
    features: [
      'Everything in **Growth** plus...',
      'Run sales or pre-save ads (conversion ads)',
      'Clear reporting on return from ad spend',
    ],
    maxSpendMultiple: pro.maxSpendMultiple,
  },
]

export const managedPlan = {
  name: 'managed',
  description: 'Add a digital marketing expert to your artist team. Everything in the Pro tier plus the benefits below:',
  monthlyCost: managed.monthlyCost,
  serviceFeePercentage: managed.serviceFeePercentage,
  features: [
    'Regular strategy and insight calls',
    'Set-up support &amp; ongoing management of Feed ads',
    'Multiple objectives°',
    'Maximise your results &amp; what you’re learning ',
    'Dedicated account manager',
  ],
}
