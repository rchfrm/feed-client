import React from 'react'
import Router from 'next/router'
// import PropTypes from 'prop-types'

import * as ROUTES from '@/app/constants/routes'

import Button from '@/elements/Button'

const GetStartedReview = () => {
  // Navigate to the posts page
  const goToPostsPage = () => {
    Router.push({
      pathname: ROUTES.HOME,
      query: { postStatus: 'not-run' },
    })
  }

  return (
    <div className="flex flex-1 flex-column">
      <h3 className="mb-0 font-medium text-xl">Feed has submitted your ads for approval!</h3>
      <div className="flex flex-1 justify-center items-center">
        <Button
          version="green"
          onClick={goToPostsPage}
          className="w-48"
          trackComponentName="GetStartedAdPreviewStep"
        >
          Done
        </Button>
      </div>
    </div>
  )
}

GetStartedReview.propTypes = {
}

GetStartedReview.defaultProps = {
}

export default GetStartedReview
