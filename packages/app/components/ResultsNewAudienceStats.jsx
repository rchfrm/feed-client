import React from 'react'
import PropTypes from 'prop-types'

import ResultsNewAudienceOnPlatformChart from '@/app/ResultsNewAudienceOnPlatformChart'
import ResultsNewAudienceUnawareChart from '@/app/ResultsNewAudienceUnawareChart'

import MarkdownText from '@/elements/MarkdownText'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import PlusIcon from '@/icons/PlusIcon'

import { abbreviateNumber } from '@/helpers/utils'

import brandColors from '@/constants/brandColors'

const ResultsNewAudienceStats = ({ data, className }) => {
  const { chartData, isOnPlatform } = data
  const currValue = chartData.find((o) => o.type === 'curr').value
  const prevValue = chartData.find((o) => o.type === 'prev').value
  const mainValue = isOnPlatform
    ? chartData[1].value - chartData[0].value
    : currValue

  return (
    <div className={[className].join(' ')}>
      <p className="font-bold text-xl text-left mr-auto sm:mr-0">New people</p>
      <div className="flex items-center" style={{ minHeight: '88px' }}>
        <MarkdownText
          markdown={data.copy || ''}
          className="sm:px-1 mr-auto sm:mr-0 mb-0 sm:text-center"
        />
      </div>
      <div className="flex flex-row items-center justify-center">
        {isOnPlatform ? (
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
      {isOnPlatform ? (
        <ResultsNewAudienceOnPlatformChart onPlatformData={chartData} />
      ) : (
        <ResultsNewAudienceUnawareChart unawareData={chartData} />
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
