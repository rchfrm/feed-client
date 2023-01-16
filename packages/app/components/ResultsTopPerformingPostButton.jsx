import React from 'react'
import PropTypes from 'prop-types'

import usePostsSidePanel from '@/app/hooks/usePostsSidePanel'

import Button from '@/elements/Button'

const ResultsTopPerformingPostButton = ({
  postData,
}) => {
  const { goToPostResults } = usePostsSidePanel()

  const openPostResultsSidePanel = () => {
    goToPostResults(postData.paidResults)
  }

  return (
    <Button
      version="small outline"
      className={[
        'z-10 h-6 sm:h-8 w-5/6 sm:w-3/4 -mt-5 sm:-mt-6',
        'rounded-full',
        'bg-offwhite border-solid border-black border-2',
        'text-xs sm:text-base text-black',
      ].join(' ')}
      onClick={openPostResultsSidePanel}
      trackComponentName="ResultsPostStats"
    >
      View more
    </Button>
  )
}

ResultsTopPerformingPostButton.propTypes = {
  postData: PropTypes.object,
}

ResultsTopPerformingPostButton.defaultProps = {
  postData: null,
}

export default ResultsTopPerformingPostButton
