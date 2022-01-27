import React from 'react'
import PropTypes from 'prop-types'

import ResultsPercentileChart from '@/app/ResultsPercentileChart'

import MarkdownText from '@/elements/MarkdownText'
import PlusIcon from '@/icons/PlusIcon'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import brandColors from '@/constants/brandColors'

const ResultsGrowthStats = ({ data }) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const { value, percentile, quartile, copy } = data

  return (
    <>
      <div className="flex sm:flex-col items-center justify-between">
        <div>
          <p className="font-bold text-xl sm:text-center">{quartile.copy} growth</p>
          <div className="flex items-top" style={{ minHeight: isDesktopLayout ? '88px' : null }}>
            <MarkdownText
              markdown={copy}
              className="mb-6 sm:mb-0 sm:text-center"
            />
          </div>
        </div>
        <div className="flex items-center">
          <PlusIcon className="h-8 w-8 mr-1 mb-4 hidden sm:block" fill={brandColors.instagram.bg} style={{ filter: 'brightness(75%)' }} />
          <p
            className="text-3xl ml-2 mb-0 sm:text-6xl sm:ml-0 sm:mb-5 text-center font-bold"
            style={{ color: brandColors.instagram.bg }}
          >
            {value}
          </p>
        </div>
      </div>
      <ResultsPercentileChart
        percentile={percentile}
        quartile={quartile}
        color={brandColors.instagram.bg}
      />
    </>
  )
}

ResultsGrowthStats.propTypes = {
  data: PropTypes.object.isRequired,
}

ResultsGrowthStats.defaultProps = {
}

export default ResultsGrowthStats
