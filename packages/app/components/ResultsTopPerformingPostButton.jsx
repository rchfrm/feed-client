import React from 'react'
import usePostsSidePanel from '@/app/hooks/usePostsSidePanel'
import Button from '@/elements/Button'

const ResultsTopPerformingPostButton = () => {
  const { goToPostResults } = usePostsSidePanel()

  const openPostResultsSidePanel = () => {
    goToPostResults()
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

export default ResultsTopPerformingPostButton
