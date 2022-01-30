import React from 'react'
import PropTypes from 'prop-types'

import ResultsNoSpendChartsTabLine from '@/app/ResultsNoSpendChartsTabLine'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import { capitalise } from '@/helpers/utils'

const ResultsNoSpendChartsTab = ({
  audience,
  audienceType,
  setAudienceType,
}) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const isActive = audienceType === audience

  const onClick = (audience) => {
    setAudienceType(audience)
  }

  return (
    <li className="relative col-span-4 flex flex-column justify-center items-center">
      {!isDesktopLayout && <p className="mb-2">{capitalise(audience)}</p>}
      <button
        onClick={() => onClick(audience)}
        className={[
          'flex justify-center items-center',
          'w-6 h-6 sm:w-12 sm:h-12',
          'border-2 border-solid border-black',
          'rounded-full',
        ].join(' ')}
      >
        {isActive && <div className="w-3 h-3 sm:w-6 sm:h-6 rounded-full bg-green" />}
      </button>
      {isDesktopLayout && (
        <ResultsNoSpendChartsTabLine
          audienceType={audienceType}
          isActive={isActive}
        />
      )}
    </li>
  )
}

ResultsNoSpendChartsTab.propTypes = {
  audience: PropTypes.string.isRequired,
  audienceType: PropTypes.string.isRequired,
  setAudienceType: PropTypes.func.isRequired,
}

export default ResultsNoSpendChartsTab
