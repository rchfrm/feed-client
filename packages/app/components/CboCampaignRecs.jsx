import React from 'react'
import PropTypes from 'prop-types'

import { formatCurrency } from '@/helpers/utils'
import { demoRecs } from '@/app/helpers/cboHelpers'

const CboCampaignRecs = () => {
  const [selectedCampaignId, setSelectedCampaignId] = React.useState(null)
  return (
    <div>
      <h2>Feed reccomended campaigns</h2>
      {demoRecs.map((rec) => {
        const { id, budget, countries, cities } = rec
        const selected = id === selectedCampaignId
        const locations = [...countries, ...cities].map(({ name }) => name)
        const locationsText = locations.reduce((text, location, index) => {
          if (index === locations.length - 1) return `${text} and ${location}`
          return `${text}${location}, `
        }, '')
        return (
          <a
            key={id}
            role="button"
            aria-label="Select reccommended campaign"
            className={[
              'block no-underline',
              'mb-5 last:mb-0',
              'p-4 xs:p-5',
              'border-solid border-green border-2',
              'rounded-dialogue',
              selected ? 'bg-green' : null,
            ].join(' ')}
            onClick={() => {
              setSelectedCampaignId(selected ? null : id)
            }}
          >
            <p className="text-right mb-2">
              {formatCurrency(budget)} p/d
            </p>
            <p className="mb-0 leading-relaxed">
              Targeting:<br />
              <strong>{locationsText}</strong>
            </p>
          </a>
        )
      })}
    </div>
  )
}

CboCampaignRecs.propTypes = {
  
}

export default CboCampaignRecs
