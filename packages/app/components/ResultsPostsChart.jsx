import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import useOnResize from '@/landing/hooks/useOnResize'
import useBreakpointTest from '@/hooks/useBreakpointTest'

import ResultsPostsChartPost from '@/app/ResultsPostsChartPost'
import ResultsPostsChartBackground from '@/app/ResultsPostsChartBackground'

import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsPostsChart = ({
  posts,
  yourAverage,
  globalAverage,
  metricType,
  isLoading,
}) => {
  const [maxValue, setMaxValue] = React.useState(0)
  const [hasScrolledLeft, setHasScrolledLeft] = React.useState(false)

  const { width } = useOnResize()
  const isDesktopLayout = useBreakpointTest('sm')

  const lastThirtyDays = [...new Array(30)].map((_, index) => moment().startOf('day').subtract(index, 'days').format('YYYY-MM-DD')).reverse()

  React.useEffect(() => {
    if (!posts.length || !yourAverage || !globalAverage) return

    const highestValue = Math.max(...posts.map((post) => post[metricType]), yourAverage, globalAverage) + 1
    setMaxValue(highestValue)
  }, [yourAverage, globalAverage, metricType, posts])

  const postsChartRef = React.useCallback(node => {
    const isMobile = width < 800

    // On mobile scroll to far right to show most recents posts first
    if (isMobile && !hasScrolledLeft && node !== null) {
      setTimeout(() => {
        node.scrollLeft = 1000
      }, 0)

      setHasScrolledLeft(true)
    }

    if (!isMobile && hasScrolledLeft) {
      setHasScrolledLeft(false)
    }
  }, [width, hasScrolledLeft])

  if (isLoading) return <Spinner />

  return (
    posts.length ? (
      <div
        className="relative overflow-x-scroll overflow-y-hidden sm:overflow-visible pb-2 sm:pb-0"
        style={{
          width: isDesktopLayout ? '100%' : 'calc(100% + 48px)',
          marginLeft: isDesktopLayout ? '0px' : '-24px',
        }}
        ref={postsChartRef}
      >
        <ResultsPostsChartBackground
          maxValue={maxValue}
          yourAverage={yourAverage}
          globalAverage={globalAverage}
          metricType={metricType}
        >
          {posts.map((post) => (
            <ResultsPostsChartPost
              key={post.id}
              post={post}
              value={post[metricType]}
              lastThirtyDays={lastThirtyDays}
              maxValue={maxValue}
            />
          ))}
        </ResultsPostsChartBackground>
      </div>
    ) : (
      <MarkdownText markdown={copy.postsChartNoData} className="mb-9" />
    )
  )
}

ResultsPostsChart.propTypes = {
  posts: PropTypes.array.isRequired,
  yourAverage: PropTypes.string,
  globalAverage: PropTypes.string.isRequired,
  metricType: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

ResultsPostsChart.defaultProps = {
  yourAverage: '',
}

export default ResultsPostsChart
