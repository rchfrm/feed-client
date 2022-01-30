import React from 'react'
import PropTypes from 'prop-types'
import ResultsNoSpendChartsTabLine from '@/app/ResultsNoSpendChartsTabLine'

const ResultsNoSpendChartsTab = ({
  audience,
  audienceType,
  setAudienceType,
}) => {
  const isActive = audienceType === audience

  const onClick = (audience) => {
    setAudienceType(audience)
  }

  return (
    <li className="relative col-span-4 flex justify-center items-center">
      <button
        onClick={() => onClick(audience)}
        className={[
          'flex justify-center items-center',
          'w-12 h-12',
          'border-2 border-solid border-black',
          'rounded-full',
        ].join(' ')}
      >
        {isActive && <div className="w-6 h-6 rounded-full bg-green" />}
      </button>
      <ResultsNoSpendChartsTabLine
        audienceType={audienceType}
        isActive={isActive}
      />
    </li>
  )
}

ResultsNoSpendChartsTab.propTypes = {
  audience: PropTypes.string.isRequired,
  audienceType: PropTypes.string.isRequired,
  setAudienceType: PropTypes.func.isRequired,
}

export default ResultsNoSpendChartsTab
