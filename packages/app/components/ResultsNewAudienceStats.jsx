import React from 'react'
import PropTypes from 'prop-types'

import ResultsNewAudienceOnPlatformChart from '@/app/ResultsNewAudienceOnPlatformChart'
import ResultsNewAudienceUnawareChart from '@/app/ResultsNewAudienceUnawareChart'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

import { abbreviateNumber } from '@/helpers/utils'
import { getNewAudienceData } from '@/app/helpers/resultsHelpers'

import brandColors from '@/constants/brandColors'

const ResultsNewAudienceStats = ({ data, className }) => {
  const [newAudienceData, setNewAudienceData] = React.useState(null)
  const mainValue = newAudienceData?.isOnPlatform
    ? newAudienceData?.chartData[1].value - newAudienceData?.chartData[0].value
    : newAudienceData?.chartData.find((o) => o.type === 'curr').value

  React.useEffect(() => {
    setNewAudienceData(getNewAudienceData(data))
  }, [data])

  return (
    <div
      className={[
        className,
        'sm:mb-10',
      ].join(' ')}
    >
      <p className="font-bold text-xl text-left mr-auto sm:mr-0">New people</p>
      {newAudienceData ? (
        <>
          <div className="flex items-center" style={{ minHeight: '88px' }}>
            <MarkdownText
              markdown={newAudienceData.copy || ''}
              className="sm:px-1 mr-auto sm:mr-0 mb-0 sm:text-center"
            />
          </div>
          <p
            className="text-6xl font-bold hidden sm:block"
            style={{ color: brandColors.blue }}
          >
            <span style={{ color: brandColors.facebook.bg }}>+</span>
            {abbreviateNumber(mainValue)}
          </p>
          {newAudienceData.isOnPlatform ? (
            <ResultsNewAudienceOnPlatformChart onPlatformData={newAudienceData.chartData} />
          ) : (
            <ResultsNewAudienceUnawareChart unawareData={newAudienceData.chartData} />
          )}
        </>
      ) : <MarkdownText markdown={copy.statsNoData} className="mt-10 px-16 text-center text-xl text-blue" />}
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
