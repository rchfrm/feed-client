import React from 'react'
import PropTypes from 'prop-types'

import TargetingCampaignReccsOption from '@/app/TargetingCampaignReccsOption'

const TargetingCampaignReccs = ({
  reccs,
  selectedReccId,
  setSelectedCampaignRecc,
  currency,
}) => {
  return (
    <div>
      {/* HEADER */}
      <h2>Feed recommended campaigns</h2>
      {/* RECCOMENDATION BUTTONS */}
      <ul
        className={[
          'sm:grid',
          'grid-cols-6 gap-x-5',
        ].join(' ')}
      >
        {/* PREDEFINED RECCS */}
        {reccs.map((rec) => {
          return (
            <TargetingCampaignReccsOption
              key={rec.id}
              rec={rec}
              currency={currency}
              selectedReccId={selectedReccId}
              setSelectedCampaignRecc={setSelectedCampaignRecc}
            />
          )
        })}
        {/* CUSTOM OPTION */}
        {/* <TargetingCampaignReccsOption
          rec={{
            id: 'custom',
            type: 'custom',
            title: 'Custom',
          }}
          selectedReccId={selectedReccId}
          setSelectedCampaignRecc={setSelectedCampaignRecc}
        /> */}
      </ul>
    </div>
  )
}

TargetingCampaignReccs.propTypes = {
  reccs: PropTypes.array.isRequired,
  setSelectedCampaignRecc: PropTypes.func.isRequired,
  selectedReccId: PropTypes.string,
  currency: PropTypes.string,
}

TargetingCampaignReccs.defaultProps = {
  selectedReccId: null,
  currency: '',
}


export default TargetingCampaignReccs
