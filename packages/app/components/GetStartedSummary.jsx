import React from 'react'
import Router from 'next/router'

import GetStartedSummarySentence from '@/app/GetStartedSummarySentence'

import ButtonNew from '@/elements/ButtonNew'

import * as ROUTES from '@/app/constants/routes'
import copy from '@/app/copy/getStartedCopy'

const GetStartedSummary = () => {
  const goToPostsPage = () => {
    Router.push({
      pathname: ROUTES.HOME,
      query: {
        promotion_enabled: true,
        sort_by: 'normalized_score',
      },
    })
  }

  return (
    <div className="flex flex-1 flex-column justify-center items-center mb-6 sm:mb-0">
      <h2><span role="img" aria-label="party face">🥳</span> Congrats!</h2>
      <h3 className="mb-10 font-medium text-center text-xl">{copy.reviewDescription}</h3>
      <GetStartedSummarySentence
        className="justify-center pointer-events-none"
      />
      <ButtonNew
        version="secondary"
        onClick={goToPostsPage}
        className="w-full sm:w-48"
        trackComponentName="GetStartedSummary"
      >
        <span className="text-2xl" role="img" aria-label="raising hands">🙌</span>
      </ButtonNew>
    </div>
  )
}

GetStartedSummary.propTypes = {
}

GetStartedSummary.defaultProps = {
}

export default GetStartedSummary
