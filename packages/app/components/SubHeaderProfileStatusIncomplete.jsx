import React from 'react'
import Router from 'next/router'
import { InterfaceContext } from '@/app/contexts/InterfaceContext'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import Button from '@/elements/Button'
import ArrowIcon from '@/icons/ArrowIcon'
import ExclamationCircleIcon from '@/icons/ExclamationCircleIcon'
import * as ROUTES from '@/app/constants/routes'

const SubHeaderProfileStatusIncomplete = () => {
  const { isNavExpanded } = React.useContext(InterfaceContext)
  const isDesktopLayout = useBreakpointTest('md')

  const goToGetStartedPage = () => {
    Router.push({
      pathname: ROUTES.GET_STARTED,
    })
  }

  return (
    <>
      <div className="flex items-center mr-4">
        <div className="flex justify-center flex-shrink-0 items-center w-4 h-4 rounded-full bg-red-bg-dark mr-1">
          <ExclamationCircleIcon className="w-3 h-3" />
        </div>
        <p className="mb-0 font-bold text-sm">Set up <span className={['inline lg:inline', isNavExpanded ? 'md:hidden' : ''].join(' ')}>incomplete</span></p>
      </div>
      <Button
        onClick={goToGetStartedPage}
        size={isDesktopLayout ? 'small' : 'x-small'}
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
