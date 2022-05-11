import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import ResultsTab from '@/app/ResultsTab'

const ResultsTabs = ({
  metricTypes,
  metricType,
  setMetricType,
  hasNoProfiles,
  shouldHideTab,
  className,
}) => {
  const isDesktopLayout = useBreakpointTest('sm')

  return (
    <ul className={[
      className,
      'col-span-12 grid grid-cols-12 sm:gap-x-12',
      'justify-around mb-0',
    ].join(' ')}
    >
      {metricTypes.map(({ type }, index) => {
        if ((shouldHideTab && index === 2) || (isDesktopLayout && hasNoProfiles)) return

        return (
          <ResultsTab
            key={type}
            type={type}
            index={index}
            setMetricType={setMetricType}
            metricType={metricType}
          />
        )
      })}
    </ul>
  )
}

ResultsTabs.propTypes = {
  metricTypes: PropTypes.array.isRequired,
  metricType: PropTypes.string.isRequired,
  setMetricType: PropTypes.func.isRequired,
  hasNoProfiles: PropTypes.bool.isRequired,
  shouldHideTab: PropTypes.bool,
  className: PropTypes.string,
}

ResultsTabs.defaultProps = {
  shouldHideTab: false,
  className: '',
}

export default ResultsTabs
