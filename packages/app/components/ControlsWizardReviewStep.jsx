import React from 'react'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/controlsPageCopy'

const ControlsWizardReviewStep = ({ setIsWizardActive }) => {
  const { next } = React.useContext(WizardContext)

  // Navigate to the posts page
  const goToPostsPage = async () => {
    Router.push({
      pathname: ROUTES.HOME,
      query: { postStatus: 'running' },
    })
  }

  React.useEffect(() => {
    return () => setIsWizardActive(false)
  }, [setIsWizardActive])

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardReviewStepIntro} />
      <Button
        version="green icon"
        onClick={goToPostsPage}
        spinnerFill={brandColors.white}
        className="w-full"
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
