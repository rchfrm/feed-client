import React from 'react'
import PropTypes from 'prop-types'

import { formatCurrency, alphabet } from '@/helpers/utils'

import Button from '@/elements/Button'

const CboCampaignReccs = ({
  reccs,
  selectedReccId,
  setSelectedCampaignRecc,
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
      setSelectedCampaignRecc(null)
    }
  }, [saveCampaignSettings, selectedReccId, reccs, setSelectedCampaignRecc])
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
        {reccs.map((rec, index) => {
          const { id, budget, countries, cities } = rec
          const title = `Option ${alphabet[index]}`
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
                  <p className="mb-0">
                    {budgetFormatted} p/d
                  </p>
                </div>
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
  setSelectedCampaignRecc: PropTypes.func.isRequired,
  selectedReccId: PropTypes.number,
  saveCampaignSettings: PropTypes.func.isRequired,
  currency: PropTypes.string,
}

CboCampaignReccs.defaultProps = {
  selectedReccId: null,
  currency: '',
}


export default CboCampaignReccs
