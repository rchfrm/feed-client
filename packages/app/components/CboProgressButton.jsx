import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import { ArtistContext } from '@/contexts/ArtistContext'

import { formatCurrency } from '@/helpers/utils'

const CboProgressButton = ({
  currentView,
  selectedCampaign,
  minBudget,
  setCurrentView,
}) => {
  const { artistCurrency } = React.useContext(ArtistContext)
  const title = React.useMemo(() => {
    if (currentView === 'customise') return 'Set Budget'
    if (selectedCampaign === 'custom') return 'Customise'
    if (selectedCampaign === 'feedRecc') return 'Save'
  }, [currentView, selectedCampaign])
  const subtitle = React.useMemo(() => {
    if (currentView !== 'customise') return null
    const minBudgetString = formatCurrency(minBudget, artistCurrency)
    return `min. budget ${minBudgetString}`
  }, [minBudget, currentView, artistCurrency])
  return (
    <Button
      className={[
        'fixed z-30',
        'right-0 bottom-0',
        'mr-6 mb-6',
        'sm:mr-8 sm:mb-20',
        'md:mr-10 md:mb-10',
        'p-5 bg-green rounded-pill',
        'text-black',
        'shadow-md',
      ].join(' ')}
    >
      {title}
    </Button>
  )
}

CboProgressButton.propTypes = {
  currentView: PropTypes.string.isRequired,
  selectedCampaign: PropTypes.string,
  minBudget: PropTypes.number,
  setCurrentView: PropTypes.func.isRequired,
}

CboProgressButton.defaultProps = {
  selectedCampaign: 'feedRecc',
  minBudget: 0,
}


export default CboProgressButton
