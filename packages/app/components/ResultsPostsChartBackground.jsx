import React from 'react'
import PropTypes from 'prop-types'

import ResultsPostsChartAverageLine from '@/app/ResultsPostsChartAverageLine'
import brandColors from '@/constants/brandColors'

import useBreakpointTest from '@/hooks/useBreakpointTest'

const ResultsPostsChartBackground = ({
  children,
  maxValue,
  yourAverage,
  globalAverage,
  color,
  hasNoProfiles,
}) => {
  const isDesktopLayout = useBreakpointTest('sm')

  return (
    <>
      <div
        className="relative"
        style={{
          paddingTop: '52.2%',
          width: isDesktopLayout ? 'auto' : '800px',
          height: isDesktopLayout ? 'auto' : '418px',
        }}
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
      {! hasNoProfiles && <ResultsPostsChartAverageLine value={yourAverage} maxValue={maxValue} color={color} />}
    </>
  )
}

ResultsPostsChartBackground.propTypes = {
  children: PropTypes.node.isRequired,
  maxValue: PropTypes.number.isRequired,
  yourAverage: PropTypes.number,
  globalAverage: PropTypes.number,
  color: PropTypes.string.isRequired,
  hasNoProfiles: PropTypes.bool.isRequired,
}

ResultsPostsChartBackground.defaultProps = {
  yourAverage: 0,
  globalAverage: 0,
}

export default ResultsPostsChartBackground
