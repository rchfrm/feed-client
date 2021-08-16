import React from 'react'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/controlsPageCopy'

const ControlsWizardReviewStep = () => {
  // Navigate to the posts page
  const goToPostsPage = async () => {
    Router.push({
      pathname: ROUTES.HOME,
      query: { postStatus: 'running' },
    })
  }

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardReviewStepIntro} />
      <Button
        version="green icon"
        onClick={goToPostsPage}
        spinnerFill={brandColors.white}
        className="w-full mb-10"
      >
        Review Posts
        <ArrowAltIcon
          className="ml-3"
          fill={brandColors.white}
          direction="right"
        />
      </Button>
    </>
  )
}

ControlsWizardReviewStep.propTypes = {
}

export default ControlsWizardReviewStep
