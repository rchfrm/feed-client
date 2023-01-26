import React from 'react'
import Router from 'next/router'
import Button from '@/elements/Button'
import ArrowIcon from '@/icons/ArrowIcon'
import ExclamationCircleIcon from '@/icons/ExclamationCircleIcon'
import * as ROUTES from '@/app/constants/routes'

const SubHeaderProfileStatusIncomplete = () => {
  const goToGetStartedPage = () => {
    Router.push({
      pathname: ROUTES.GET_STARTED,
    })
  }

  return (
    <>
      <div className="flex items-center mr-4">
        <div className="flex justify-center flex-shrink-0 items-center w-6 h-6 rounded-full bg-red-bg-dark mr-2">
          <ExclamationCircleIcon className="w-4 h-4" />
        </div>
        <p className="mb-0 font-bold text-sm xxs:text-base">Set up <span className="hidden lg:inline">incomplete</span></p>
      </div>
      <Button
        onClick={goToGetStartedPage}
        size="small"
        color="red"
        className="-mr-1"
        trackComponentName="SubHeaderProfileStatus"
      >
        Continue
        <ArrowIcon direction="right" className="w-4 h-4 ml-2" />
      </Button>
    </>
  )
}

export default SubHeaderProfileStatusIncomplete
