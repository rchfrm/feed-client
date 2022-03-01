import React from 'react'
import Router from 'next/router'

import GetStartedSummarySentence from '@/app/GetStartedSummarySentence'

import Button from '@/elements/Button'

import * as ROUTES from '@/app/constants/routes'
import copy from '@/app/copy/getStartedCopy'

const GetStartedSummary = () => {
  const goToPostsPage = () => {
    Router.push({
      pathname: ROUTES.HOME,
      query: { postStatus: 'not-run' },
    })
  }

  return (
    <div className="flex flex-1 flex-column justify-center items-center">
      <h3 className="mr-auto sm:mr-0 mb-10 font-medium text-xl">{copy.reviewDescription}</h3>
      <GetStartedSummarySentence />
      <Button
        version="outline-green"
        onClick={goToPostsPage}
        className="w-full sm:w-48 mb-5 sm:mb-0"
        trackComponentName="GetStartedAdPreview"
      >
        <span className="text-2xl" role="img" aria-label="raising hands">🙌</span>
      </Button>
    </div>
  )
}

GetStartedSummary.propTypes = {
}

GetStartedSummary.defaultProps = {
}

export default GetStartedSummary
