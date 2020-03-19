import React from 'react'

import { NavigationContext } from '../contexts/Navigation'

import PageHeader from '../PageHeader'

import MarkdownText from '../elements/MarkdownText'
import copy from '../../copy/PricingPageCopy'

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
        <MarkdownText className="h4--text" markdown={copy.copy} />
      </div>
    </div>
  )
}

export default PricesPage
