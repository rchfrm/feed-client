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
      size="small"
      version="secondary"
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
