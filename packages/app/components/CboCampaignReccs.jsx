import React from 'react'
import PropTypes from 'prop-types'

import { formatCurrency } from '@/helpers/utils'

import Button from '@/elements/Button'

const CboCampaignReccs = ({
  reccs,
  selectedReccId,
  setSelectedReccId,
  setSelectedCampaignType,
  saveCampaignSettings,
  currency,
}) => {
  const isMounted = React.useRef(true)
  React.useEffect(() => {
    return () => { isMounted.current = false }
  }, [])
  const hasRecc = !!selectedReccId
  const saveSelectedRecc = React.useCallback(async () => {
    const state = reccs.find(({ id }) => id === selectedReccId)
    await saveCampaignSettings(state)
    if (isMounted.current) {
      setSelectedReccId(null)
    }
  }, [saveCampaignSettings, selectedReccId, reccs, setSelectedReccId])
  return (
    <div>
      {/* HEADER */}
      <h2>Feed recommended campaigns</h2>
      {/* RECCOMENDATION BUTTONS */}
      <ul
        className={[
          'sm:grid',
          'grid-cols-6 col-gap-5',
        ].join(' ')}
      >
        {reccs.map((rec) => {
          const { id, type, budget, countries, cities } = rec
          const budgetFormatted = formatCurrency(budget, currency)
          const selected = id === selectedReccId
          const locations = [...countries, ...cities].map(({ name }) => name)
          const locationsText = locations.reduce((text, location, index) => {
            if (index === locations.length - 1) return `${text} and ${location}.`
            return `${text}${location}, `
          }, '')
          return (
            <li
              key={id}
              className={[
                'mb-5 last:mb-0 sm:mb-0',
                'sm:col-span-3',
              ].join(' ')}
            >
              <a
                role="button"
                aria-label="Select reccommended campaign"
                className={[
                  'block no-underline',
                  'p-4 xs:p-5',
                  'border-solid border-green border-2',
                  'rounded-dialogue',
                  selected ? 'bg-green' : null,
                ].join(' ')}
                onClick={() => {
                  setSelectedReccId(selected ? null : id)
                  setSelectedCampaignType(selected ? '' : type)
                }}
              >
                <p className="text-right mb-2">
                  {budgetFormatted} p/d
                </p>
                <p className="mb-0 leading-relaxed">
                  Targeting:<br />
                  <strong>{locationsText}</strong>
                </p>
              </a>
            </li>
          )
        })}
      </ul>
      {/* SET SELECTED RECC AS CAMPAIGN */}
      <div>
        <Button
          className="w-full"
          onClick={saveSelectedRecc}
          disabled={!hasRecc}
        >
          Save selected campaign
        </Button>
      </div>
    </div>
  )
}

CboCampaignReccs.propTypes = {
  reccs: PropTypes.array.isRequired,
  selectedReccId: PropTypes.number,
  setSelectedReccId: PropTypes.func.isRequired,
  setSelectedCampaignType: PropTypes.func.isRequired,
  saveCampaignSettings: PropTypes.func.isRequired,
  currency: PropTypes.string,
}

CboCampaignReccs.defaultProps = {
  selectedReccId: null,
  currency: '',
}


export default CboCampaignReccs
