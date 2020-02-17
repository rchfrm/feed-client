import React from 'react'

import { NavigationContext } from '../contexts/Navigation'

import PageHeader from '../elements/PageHeader'

function PricesPage() {
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  return (
    <div className={className}>
      <PageHeader heading="pricing" />
    </div>
  )
}

export default PricesPage
