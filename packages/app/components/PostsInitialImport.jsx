import React from 'react'
import PropTypes from 'prop-types'

import useIsMounted from '@/hooks/useIsMounted'

import MarkdownText from '@/elements/MarkdownText'
import Spinner from '@/elements/Spinner'

import { getInitialPostsImportStatus } from '@/app/helpers/postsHelpers'

import copy from '@/app/copy/PostsPageCopy'

const PostsInitialImport = ({
  artistId,
  setCanLoadPosts,
}) => {
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

    if (res.initial_assets_scoring_completed_at) {
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

  if (initialLoading) return null

  return (
    <div className="flex flex-1 flex-column justify-center items-center">
      <Spinner className="flex-none mb-10" />
      <MarkdownText
        className="max-w-xs text-center"
        markdown={copy.importingPosts}
      />
    </div>
  )
}

PostsInitialImport.propTypes = {
  artistId: PropTypes.string.isRequired,
  setCanLoadPosts: PropTypes.func.isRequired,
}

PostsInitialImport.defaultProps = {
}

export default PostsInitialImport
