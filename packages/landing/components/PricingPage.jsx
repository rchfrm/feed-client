import React from 'react'
import PropTypes from 'prop-types'

import BannerBase from '@/elements/BannerBase'
import BasicTextPage from '@/BasicTextPage'


import PricingPageTiers from '@/PricingPageTiers'
import PricingPageDescription from '@/PricingPageDescription'
import PrimaryCTA from '@/PrimaryCTA'

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
