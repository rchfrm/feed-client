import React from 'react'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

const ConversionsWizardOptInStep = () => {
  const [isLoading, setIsLoading] = React.useState(false)

  const anAsyncFunction = () => {
    return new Promise((res) => setTimeout(() => {
      console.log('Save Conversions')
      res('resolve')
    }, 1000))
  }

  const handleNext = async () => {
    setIsLoading(true)
    await anAsyncFunction()
    setIsLoading(false)
    Router.push(ROUTES.HOME)
  }

  return (
    <>
      <h2>Get going</h2>
      <p>All set! Only thing left is to select which posts you’d like to use for conversion campaigns from the posts page. Once opted-in Feed will create ads straight away.</p>
      <Button
        version="green icon"
        onClick={handleNext}
        loading={isLoading}
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

export default ConversionsWizardOptInStep
