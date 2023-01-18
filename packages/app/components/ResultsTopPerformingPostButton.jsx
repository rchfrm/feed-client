import React from 'react'
import PropTypes from 'prop-types'
import usePostsSidePanel from '@/app/hooks/usePostsSidePanel'
import ButtonNew from '@/elements/ButtonNew'

const ResultsTopPerformingPostButton = ({
  postData,
}) => {
  const { goToPostResults } = usePostsSidePanel()

  const openPostResultsSidePanel = () => {
    goToPostResults(postData.paidResults)
  }

  return (
    <ButtonNew
      size="small"
      version="secondary"
      onClick={openPostResultsSidePanel}
      trackComponentName="ResultsPostStats"
    >
      View more
    </ButtonNew>
  )
}

ResultsTopPerformingPostButton.propTypes = {
  postData: PropTypes.object,
}

ResultsTopPerformingPostButton.defaultProps = {
  postData: null,
}

export default ResultsTopPerformingPostButton
