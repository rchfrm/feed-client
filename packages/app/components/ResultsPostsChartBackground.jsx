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
  const [globalAveragePosition, setGlobalAveragePosition] = React.useState(0)
  const [yourAveragePosition, setYourAveragePosition] = React.useState(0)

  React.useEffect(() => {
    setGlobalAveragePosition((globalAverage / maxValue) * 100)
    setYourAveragePosition((yourAverage / maxValue) * 100)
  }, [globalAverage, yourAverage, maxValue])

  return (
    <div className={['w-full relative'].join(' ')}>
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
      <ResultsPostsChartAverageLine bottom={globalAveragePosition} color={brandColors.black} />
      <ResultsPostsChartAverageLine bottom={yourAveragePosition} color={brandColors.grey} />
    </div>
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
