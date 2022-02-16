import React from 'react'
import PropTypes from 'prop-types'

import ResultsAbsoluteChart from '@/app/ResultsAbsoluteChart'
import ResultsFallbackChart from '@/app/ResultsFallbackChart'

import MarkdownText from '@/elements/MarkdownText'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import PlusIcon from '@/icons/PlusIcon'

import { abbreviateNumber } from '@/helpers/utils'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import brandColors from '@/constants/brandColors'

const ResultsNewAudienceStats = ({ data }) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const { chartData, chartType } = data
  const currValue = chartData.find((o) => o.type === 'curr').value
  const prevValue = chartData.find((o) => o.type === 'prev').value
  const isMainChart = chartType === 'main'
  const mainValue = isMainChart
    ? chartData[1].value - chartData[0].value
    : currValue

  return (
    <>
      <div className="flex sm:flex-col items-center justify-between">
        <div>
          <p className="font-bold text-xl sm:text-center">New people</p>
          <div className="flex items-top" style={{ minHeight: isDesktopLayout ? '88px' : null }}>
            <MarkdownText
              markdown={data.copy || ''}
              className="mb-6 sm:mb-0 sm:text-center"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          {isMainChart ? (
            <PlusIcon className="h-4 w-4 sm:h-8 sm:w-8 mr-1 sm:mb-4" fill={brandColors.facebook.bg} />
          ) : (
            currValue > prevValue && <ArrowAltIcon className="h-8 w-8 mb-4" fill={brandColors.facebook.bg} direction="up" />
          )}
          <p
            className="text-3xl mb-0 sm:text-6xl sm:mb-5 text-center font-bold"
            style={{ color: brandColors.blue }}
          >
            {abbreviateNumber(mainValue)}
          </p>
        </div>
      </div>
      {isMainChart ? (
        <ResultsAbsoluteChart data={chartData} color={brandColors.blue} icon="plus" />
      ) : (
        <ResultsFallbackChart data={chartData} color={brandColors.blue} />
      )}
    </>
  )
}

ResultsNewAudienceStats.propTypes = {
  data: PropTypes.object.isRequired,
}

ResultsNewAudienceStats.defaultProps = {
}

export default ResultsNewAudienceStats
