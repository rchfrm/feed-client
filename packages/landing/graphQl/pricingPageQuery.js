export default () => `
query {
  pricing {
    promoBanner
    tiers {
      tierName
      tierId
      minSpend
      serviceFee
      commission
      subscription
    }
    pricingStructure {
      title
      breakdownId
    }
    adNetworks {
      title
      applicableTiers
    }
    functions {
      title
      applicableTiers
    }
    pricingCopy
  }
}`
