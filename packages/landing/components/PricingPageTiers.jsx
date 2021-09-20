import React from 'react'

import PricingTiersMobile from '@/landing/PricingTiersMobile'
import PricingTiersDesktop from '@/landing/PricingTiersDesktop'

import useBreakpointTest from '@/landing/hooks/useBreakpointTest'

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
