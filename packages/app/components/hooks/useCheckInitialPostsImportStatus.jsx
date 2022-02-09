import React from 'react'

import useIsMounted from '@/hooks/useIsMounted'

import { getInitialPostsImportStatus } from '@/app/helpers/postsHelpers'

const useCheckInitialPostsImportStatus = (artistId, setCanLoadPosts) => {
  const [initialLoading, setInitialLoading] = React.useState(true)
  const [intervalId, setIntervalId] = React.useState(null)
  const isMounted = useIsMounted()

  const checkInitialPostsImportStatus = async () => {
    if (!isMounted) return

    const { res, error } = await getInitialPostsImportStatus(artistId)

    if (error) {
      clearInterval(intervalId)
      return
    }

    if (res.last_update_completed_at) {
      clearInterval(intervalId)
      setCanLoadPosts(true)
      return
    }

    if (initialLoading) setInitialLoading(false)
  }

  React.useEffect(() => {
    if (!intervalId) {
      checkInitialPostsImportStatus()
    }

    return () => clearInterval(intervalId)
    // eslint-disable-next-line
  }, [intervalId])

  React.useEffect(() => {
    if (!initialLoading && !intervalId) {
      setIntervalId(setInterval(checkInitialPostsImportStatus, 2000))
    }
    // eslint-disable-next-line
  }, [initialLoading])

  return { initialLoading }
}

export default useCheckInitialPostsImportStatus
