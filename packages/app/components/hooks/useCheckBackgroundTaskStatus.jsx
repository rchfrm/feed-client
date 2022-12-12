import React from 'react'

import useIsMounted from '@/hooks/useIsMounted'

const useCheckBackgroundTaskStatus = ({ artistId, action, completionKey, hasCompleted, setHasCompleted }) => {
  const [initialLoading, setInitialLoading] = React.useState(true)
  const intervalRef = React.useRef()
  const isMounted = useIsMounted()

  const checkBackgroundTaskStatus = async () => {
    if (! isMounted) return

    const { res, error } = await action(artistId)

    if (error) {
      clearInterval(intervalRef.current)
      return
    }

    if (completionKey && res[completionKey]) {
      clearInterval(intervalRef.current)
      setHasCompleted(true)
      setInitialLoading(false)
      return
    }

    if (initialLoading) setInitialLoading(false)
  }

  React.useEffect(() => {
    if (! initialLoading && ! intervalRef.current && ! hasCompleted) {
      const intervalId = setInterval(checkBackgroundTaskStatus, 2000)
      intervalRef.current = intervalId
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLoading, hasCompleted])

  React.useEffect(() => {
    if (! intervalRef.current) {
      checkBackgroundTaskStatus()
    }

    return () => clearInterval(intervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { initialLoading }
}

export default useCheckBackgroundTaskStatus
