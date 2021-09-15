import React from 'react'
import PropTypes from 'prop-types'

import BannerBase from '@/landing/elements/BannerBase'
import BasicTextPage from '@/landing/BasicTextPage'


import PricingPageTiers from '@/landing/PricingPageTiers'
import PricingPageDescription from '@/landing/PricingPageDescription'
import PrimaryCTA from '@/landing/PrimaryCTA'

const PricingPage = ({ pageData }) => {
  const { promoBanner, pricingCopy } = pageData
  return (
    <>
      {/* Promotion */}
      {promoBanner && (
        <BannerBase copy={promoBanner} />
      )}

      <BasicTextPage
        pageData={{ title: 'Pricing' }}
        endContent={<PricingPageTiers pageData={pageData} />}
        isFullWidth
      />

      <PrimaryCTA />

      {pricingCopy && (
        <PricingPageDescription copy={pricingCopy} />
      )}
    </>
  )
}

PricingPage.propTypes = {
  pageData: PropTypes.object.isRequired,
}

export default PricingPage
