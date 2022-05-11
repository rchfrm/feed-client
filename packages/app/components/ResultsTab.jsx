import React from 'react'
import PropTypes from 'prop-types'

import ResultsTabLine from '@/app/ResultsTabLine'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import { capitalise } from '@/helpers/utils'

const ResultsTab = ({
  type,
  index,
  metricType,
  setMetricType,
}) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const isActive = metricType === type

  const onClick = (audience) => {
    setMetricType(audience)
  }

  return (
    <li className="relative col-span-4 flex justify-center">
      <button
        onClick={() => onClick(type)}
        className="flex flex-column justify-center items-center"
      >
        {!isDesktopLayout && <p className="mb-2">{capitalise(type)}</p>}
        <div
          className={[
            'flex justify-center items-center',
            'w-6 h-6 sm:w-12 sm:h-12',
            'border-2 border-solid border-black',
            'rounded-full',
          ].join(' ')}
        >
          {isActive && <div className="w-3 h-3 sm:w-6 sm:h-6 rounded-full bg-green" />}
        </div>
      </button>
      {isDesktopLayout && (
        <ResultsTabLine
          index={index}
          isActive={isActive}
        />
      )}
    </li>
  )
}

ResultsTab.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  metricType: PropTypes.string.isRequired,
  setMetricType: PropTypes.func.isRequired,
}

export default ResultsTab
