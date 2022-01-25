import React from 'react'

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
    <li>
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
    </li>
  )
}

ResultsNoSpendChartsTab.propTypes = {
}

export default ResultsNoSpendChartsTab
