import React from 'react'

import { NavigationContext } from '../contexts/Navigation'

import PageHeader from '../PageHeader'

function PricesPage() {
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  return (
    <div className={className}>
      <PageHeader heading="pricing" />
      <div className="PricingPage__content  page--content">
        <p>To keep it simple, the daily budget you set in Feed is the total amount you’ll spend each day - including our service fee. Our service fee is 10% of your chosen daily budget, dropping to 5% for spend over £150 in the billing month.</p>
        <p>We understand that marketing plans are flexible - if there’s a month when you don’t promote posts through Feed, we won’t charge you anything. </p>
        <p>In a month where you do spend money promoting posts, to cover our costs we apply a minimum service fee of £1.99. </p>
        <p>At the end of each billing month, we will charge your card for the relevant service fee, and Facebook will bill you separately for the amount spent on promoting your posts.</p>
        <p>If you think you’re going to spend more than £300 per month consistently, get in touch at services@archform.ltd to talk about pricing options.</p>
      </div>
    </div>
  )
}

export default PricesPage
