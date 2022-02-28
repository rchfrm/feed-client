import React from 'react'

import useIsMounted from '@/hooks/useIsMounted'

import { getInitialPostsImportStatus } from '@/app/helpers/postsHelpers'

const useCheckInitialPostsImportStatus = (artistId, canLoadPosts, setCanLoadPosts) => {
  const [initialLoading, setInitialLoading] = React.useState(true)
  const intervalRef = React.useRef()
  const isMounted = useIsMounted()

  const checkInitialPostsImportStatus = async () => {
    if (!isMounted) return

    const { res, error } = await getInitialPostsImportStatus(artistId)

    if (error) {
      clearInterval(intervalRef.current)
      return
    }

    if (res.last_update_completed_at) {
      clearInterval(intervalRef.current)
      setCanLoadPosts(true)
      setInitialLoading(false)
      return
    }

    if (initialLoading) setInitialLoading(false)
  }

  React.useEffect(() => {
    if (!initialLoading && !intervalRef.current && !canLoadPosts) {
      const intervalId = setInterval(checkInitialPostsImportStatus, 2000)
      intervalRef.current = intervalId
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLoading, canLoadPosts])

  React.useEffect(() => {
    if (!intervalRef.current) {
      checkInitialPostsImportStatus()
    }

    return () => clearInterval(intervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { initialLoading }
}

export default useCheckInitialPostsImportStatus
