import React from 'react'
import PropTypes from 'prop-types'

import { formatCurrency } from '@/helpers/utils'

const getLocationText = (countries = [], cities = []) => {
  const locations = [...countries, ...cities].map(({ name }) => name)
  return locations.reduce((text, location, index) => {
    if (index === locations.length - 1) return `${text} and ${location}.`
    return `${text}${location}, `
  }, '')
}

const TargetingCampaignReccsOption = ({
  rec,
  currency,
  selectedReccId,
  setSelectedCampaignRecc,
}) => {
  const { id, title, budget, countries, cities, type } = rec
  const selected = id === selectedReccId
  const budgetFormatted = budget ? formatCurrency(budget, currency) : null
  const locationsText = type !== 'custom' ? getLocationText(countries, cities) : null
  return (
    <li
      key={id}
      className={[
        'mb-5 last:mb-0',
        'sm:col-span-3',
      ].join(' ')}
    >
      <a
        role="button"
        aria-label="Select recommended campaign"
        className={[
          'block no-underline',
          'p-4 xs:p-5',
          'border-solid border-green border-2',
          'rounded-dialogue',
          selected ? 'bg-green' : null,
        ].join(' ')}
        onClick={() => {
          setSelectedCampaignRecc(selected ? null : rec)
        }}
      >
        <div className="flex justify-between items-center mb-4">
          {/* title and radio */}
          <div className="flex items-center">
            <div className={[
              'radio--button_label',
              'pl-0 h-5 w-5 mr-3',
              selected ? '-active -white' : null,
            ].join(' ')}
            />
            <p className="capitalize text-sm mb-0"><strong>{title}</strong></p>
          </div>
          {/* Budget */}
          {budget && (
            <p className="mb-0">
              {budgetFormatted} p/d
            </p>
          )}
        </div>
        {/* Locations text */}
        {locationsText && (
          <p className="mb-0 leading-relaxed">
            Targeting:<br />
            <strong>{locationsText}</strong>
          </p>
        )}
        {/* Custom text */}
        {type === 'custom' && (
          <p className="mb-0 leading-relaxed text-center">
            &nbsp;<br />
            <strong>Choose your own settings</strong>
          </p>
        )}
      </a>
    </li>
  )
}

TargetingCampaignReccsOption.propTypes = {
  rec: PropTypes.object.isRequired,
  currency: PropTypes.string,
  selectedReccId: PropTypes.string,
  setSelectedCampaignRecc: PropTypes.func.isRequired,
}

TargetingCampaignReccsOption.defaultProps = {
  currency: null,
  selectedReccId: '',
}


export default TargetingCampaignReccsOption
