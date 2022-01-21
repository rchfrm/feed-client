import React from 'react'
import PropTypes from 'prop-types'

import ResultsPostsChartAverageLine from '@/app/ResultsPostsChartAverageLine'
import brandColors from '../../shared/constants/brandColors'

const ResultsPostsChartBackground = ({ children }) => {
  return (
    <div className={['w-full relative'].join(' ')}>
      <div
        className="relative"
        style={{ paddingTop: '52.2%' }}
      >
        <img
          src="/images/posts_chart_bg.png"
          className={[
            'absolute',
            'top-0 right-0 bottom-0 left-0',
          ].join(' ')}
          alt="days"
        />
        {children}
      </div>
      <ResultsPostsChartAverageLine bottom="35%" color={brandColors.black} />
      <ResultsPostsChartAverageLine bottom="20%" color={brandColors.grey} />
    </div>
  )
}

ResultsPostsChartBackground.propTypes = {
  children: PropTypes.node.isRequired,
}

ResultsPostsChartBackground.defaultProps = {
}

export default ResultsPostsChartBackground
