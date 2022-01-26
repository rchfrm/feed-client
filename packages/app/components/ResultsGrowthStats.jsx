import React from 'react'
import PropTypes from 'prop-types'

import ResultsPercentileChart from '@/app/ResultsPercentileChart'

import MarkdownText from '@/elements/MarkdownText'
import PlusIcon from '@/icons/PlusIcon'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import brandColors from '@/constants/brandColors'

const ResultsGrowthStats = ({ data, className }) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const { value, percentile, quartile, copy } = data

  return (
    <div className={[className].join(' ')}>
      <div className="flex items-top" style={{ minHeight: isDesktopLayout ? '88px' : null }}>
        <MarkdownText
          markdown={copy}
          className="sm:px-1 mr-auto sm:mr-0 mb-6 sm:mb-0 sm:text-center"
        />
      </div>
      <div className="flex flex-row items-center justify-center">
        <PlusIcon className="h-8 w-8 mr-1 mb-4 hidden sm:block" fill={brandColors.instagram.bg} style={{ filter: 'brightness(75%)' }} />
        <p
          className="text-6xl font-bold hidden sm:block"
          style={{ color: brandColors.instagram.bg }}
        >
          {value}
        </p>
      </div>
      <ResultsPercentileChart
        percentile={percentile}
        quartile={quartile}
        color={brandColors.instagram.bg}
      />
    </div>
  )
}

ResultsGrowthStats.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
}

ResultsGrowthStats.defaultProps = {
  className: '',
}

export default ResultsGrowthStats
