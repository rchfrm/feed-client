import React from 'react'
import PropTypes from 'prop-types'

import ResultsAbsoluteChart from '@/app/ResultsAbsoluteChart.jsx'
import ResultsFallbackChart from '@/app/ResultsFallbackChart'

import MarkdownText from '@/elements/MarkdownText'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import PlusIcon from '@/icons/PlusIcon'

import { abbreviateNumber } from '@/helpers/utils'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import brandColors from '@/constants/brandColors'

const ResultsNewAudienceStats = ({ data, className }) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const { chartData, isMainChart } = data
  const currValue = chartData.find((o) => o.type === 'curr').value
  const prevValue = chartData.find((o) => o.type === 'prev').value
  const mainValue = isMainChart
    ? chartData[1].value - chartData[0].value
    : currValue

  return (
    <div className={[className].join(' ')}>
      <p className="font-bold text-xl text-left mr-auto sm:mr-0">New people</p>
      <div className="flex items-top" style={{ minHeight: isDesktopLayout ? '88px' : null }}>
        <MarkdownText
          markdown={data.copy || ''}
          className="sm:px-1 mr-auto sm:mr-0 mb-6 sm:mb-0 sm:text-center"
        />
      </div>
      <div className="flex flex-row items-center justify-center">
        {isMainChart ? (
          <PlusIcon className="h-8 w-8 mr-1 mb-4 hidden sm:block" fill={brandColors.facebook.bg} />
        ) : (
          currValue > prevValue && <ArrowAltIcon className="h-8 w-8 mb-4 hidden sm:block" fill={brandColors.facebook.bg} direction="up" />
        )}
        <p
          className="text-6xl font-bold hidden sm:block"
          style={{ color: brandColors.blue }}
        >
          {abbreviateNumber(mainValue)}
        </p>
      </div>
      {isMainChart ? (
        <ResultsAbsoluteChart data={chartData} color={brandColors.blue} icon="plus" />
      ) : (
        <ResultsFallbackChart data={chartData} color={brandColors.blue} />
      )}
    </div>
  )
}

ResultsNewAudienceStats.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
}

ResultsNewAudienceStats.defaultProps = {
  className: '',
}

export default ResultsNewAudienceStats
