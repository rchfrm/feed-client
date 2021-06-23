import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import copy from '@/app/copy/controlsPageCopy'

import brandColors from '@/constants/brandColors'

const ConversionsWizardOptInStep = ({ setIsWizardActive }) => {
  // Navigate to the posts page
  const goToPostsPage = async () => {
    Router.push({
      pathname: ROUTES.HOME,
      query: { postStatus: 'not-run' },
    })
  }

  React.useEffect(() => {
    return () => setIsWizardActive(false)
  })

  return (
    <>
      <h2>Get going</h2>
      <MarkdownText markdown={copy.postOptInStepDescription} />
      <Button
        version="green icon"
        onClick={goToPostsPage}
        className="w-full"
      >
        Opt in posts
        <ArrowAltIcon
          className="ml-3"
          fill={brandColors.white}
          direction="right"
        />
      </Button>
    </>
  )
}

ConversionsWizardOptInStep.propTypes = {
  setIsWizardActive: PropTypes.func.isRequired,
}

export default ConversionsWizardOptInStep
