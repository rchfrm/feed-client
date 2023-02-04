import React from 'react'
import Router from 'next/router'
import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'
import ArrowIcon from '@/icons/ArrowIcon'
import * as ROUTES from '@/app/constants/routes'

const PostsContainerSpendingPaused = () => {
  const goToControlsPage = () => {
    Router.push({
      pathname: ROUTES.CONTROLS_OBJECTIVE,
    })
  }

  return (
    <>
      <MarkdownText
        className="text-sm w-1/3"
        markdown="Your campaigns are paused. Set a budget from the controls page to start running ads."
      />
      <Button
        color="yellow"
        size="medium"
        onClick={goToControlsPage}
        trackComponentName="GetStartedDailyBudget"
      >
        Start Campaign
        <ArrowIcon
          className="w-5 h-auto ml-1"
          direction="right"
        />
      </Button>
    </>
  )
}

export default PostsContainerSpendingPaused
