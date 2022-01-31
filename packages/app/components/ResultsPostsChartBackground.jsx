import React from 'react'
import PropTypes from 'prop-types'

import ResultsPostsChartAverageLine from '@/app/ResultsPostsChartAverageLine'
import brandColors from '../../shared/constants/brandColors'

const ResultsPostsChartBackground = ({
  children,
  maxValue,
  yourAverage,
  globalAverage,
}) => {
  return (
    <>
      <div
        className="relative"
        style={{ paddingTop: '52.2%' }}
      >
        <img
          src="/images/posts_chart_bg.png"
          className={[
            'absolute w-full',
            'top-0 right-0 bottom-0 left-0',
          ].join(' ')}
          alt="days"
        />
        {children}
      </div>
      <ResultsPostsChartAverageLine value={globalAverage} maxValue={maxValue} color={brandColors.black} />
      <ResultsPostsChartAverageLine value={yourAverage} maxValue={maxValue} color={brandColors.grey} />
    </>
  )
}

ResultsPostsChartBackground.propTypes = {
  children: PropTypes.node.isRequired,
  maxValue: PropTypes.number.isRequired,
  yourAverage: PropTypes.number.isRequired,
  globalAverage: PropTypes.number.isRequired,
}

ResultsPostsChartBackground.defaultProps = {
}

export default ResultsPostsChartBackground
