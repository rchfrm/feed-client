import React from 'react'

const ResultsPostsChart = ({ className }) => {
  return (
    <div className={[className, 'w-full'].join(' ')}>
      <div
        className="relative"
        style={{ paddingTop: '52.2%' }}
      >
        <img
          src="/images/posts_chart_bg.png"
          className={[
            'absolute',
            'top-0 right-0 bottom-0 left-0',
            'mx-auto',
          ].join(' ')}
          alt="days"
        />
        <div className="absolute w-20 h-20 bg-black top-0 rounded-dialogue" />
      </div>
    </div>
  )
}

ResultsPostsChart.propTypes = {
}

ResultsPostsChart.defaultProps = {
}

export default ResultsPostsChart
