import React from 'react'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import useNotificationStore from '@/app/stores/notificationsStore'
import Button from '@/elements/Button'
import ArrowIcon from '@/icons/ArrowIcon'
import ExclamationCircleIcon from '@/icons/ExclamationCircleIcon'
import { capitalise } from '@/helpers/utils'

const getNotificationsStoreState = (state) => ({
  integrationError: state.integrationError,
  setShouldShowIntegrationError: state.setShouldShowIntegrationError,
})

const SubHeaderProfileStatusIntegrationError = () => {
  const { integrationError, setShouldShowIntegrationError } = useNotificationStore(getNotificationsStoreState)
  const topic = capitalise(integrationError.topic.replace(/-/g, ' '))
  const isDesktopLayout = useBreakpointTest('md')

  return (
    <>
      <div className="flex items-center mr-4">
        <div className="flex justify-center flex-shrink-0 items-center w-4 h-4 rounded-full bg-red-bg-dark mr-2">
          <ExclamationCircleIcon className="w-3 h-3" />
        </div>
        <p className="mb-0 font-bold text-xs xxs:text-sm !leading-[1.1] line-clamp-2">{topic}</p>
      </div>
      <Button
        onClick={() => setShouldShowIntegrationError(true)}
        size={isDesktopLayout ? 'small' : 'x-small'}
        color="red"
        className="-mr-1"
        trackComponentName="SubHeaderProfileStatusIntegrationError"
      >
        Fix
        <ArrowIcon direction="right" className="w-4 h-4 ml-1" />
      </Button>
    </>
  )
}

export default SubHeaderProfileStatusIntegrationError
