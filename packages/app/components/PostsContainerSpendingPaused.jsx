import React from 'react'
import Router from 'next/router'
import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'
import ArrowIcon from '@/icons/ArrowIcon'
import * as ROUTES from '@/app/constants/routes'
import copy from '@/app/copy/PostsPageCopy'

const PostsContainerSpendingPaused = () => {
  const goToControlsPage = () => {
    Router.push({
      pathname: ROUTES.CONTROLS_OBJECTIVE,
    })
  }

  return (
    <>
      <MarkdownText
        className="text-sm w-full md:w-1/2"
        markdown={copy.spendingPaused}
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
