import React from 'react'
import PropTypes from 'prop-types'

import { formatCurrency } from '@/helpers/utils'

import Button from '@/elements/Button'

const CboCampaignReccs = ({
  reccs,
  selectedReccId,
  setSelectedReccId,
  saveCboState,
  artistCurrency,
}) => {
  const isMounted = React.useRef(true)
  React.useEffect(() => {
    return () => { isMounted.current = false }
  }, [])
  const hasRecc = !!selectedReccId
  const saveSelectedRecc = React.useCallback(async () => {
    const state = reccs.find(({ id }) => id === selectedReccId)
    await saveCboState(state)
    if (isMounted.current) {
      setSelectedReccId(null)
    }
  }, [saveCboState, selectedReccId, reccs, setSelectedReccId])
  return (
    <div>
      {/* HEADER */}
      <h2>Feed reccomended campaigns</h2>
      {/* RECCOMENDATION BUTTONS */}
      <ul>
        {reccs.map((rec) => {
          const { id, budget, countries, cities } = rec
          const budgetFormatted = formatCurrency(budget, artistCurrency)
          const selected = id === selectedReccId
          const locations = [...countries, ...cities].map(({ name }) => name)
          const locationsText = locations.reduce((text, location, index) => {
            if (index === locations.length - 1) return `${text} and ${location}.`
            return `${text}${location}, `
          }, '')
          return (
            <li
              key={id}
              className="mb-5 last:mb-0"
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
  saveCboState: PropTypes.func.isRequired,
  artistCurrency: PropTypes.string,
}

CboCampaignReccs.defaultProps = {
  selectedReccId: null,
  artistCurrency: '',
}


export default CboCampaignReccs
