import React from 'react'

import PricingTiersMobile from '@/PricingTiersMobile'
import PricingTiersDesktop from '@/PricingTiersDesktop'

import useBreakpointTest from '@/hooks/useBreakpointTest'

const PricingPageTiers = ({ pageData }) => {
  const isDesktopLayout = useBreakpointTest('sm')
  return (
    <section className={['bmw'].join(' ')}>
      {isDesktopLayout ? (
        <PricingTiersDesktop pageData={pageData} />
      ) : (
        <PricingTiersMobile pageData={pageData} />
      )}
    </section>
  )
}

export default PricingPageTiers
