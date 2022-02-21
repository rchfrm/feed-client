import React from 'react'
import useAsyncEffect from 'use-async-effect'
// import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { WizardContext } from '@/app/contexts/WizardContext'

import useCheckInitialPostsImportStatus from '@/app/hooks/useCheckInitialPostsImportStatus'

import GetStartedPostsSelectionCard from '@/app/GetStartedPostsSelectionCard'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Spinner from '@/elements/Spinner'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import Error from '@/elements/Error'

import * as server from '@/app/helpers/appServer'
import { formatRecentPosts } from '@/app/helpers/resultsHelpers'
import { updatePost, getCursor } from '@/app/helpers/postsHelpers'

import copy from '@/app/copy/getStartedCopy'

const GetStartedPostsSelection = ({ activePosts }) => {
  const [canLoadPosts, setCanLoadPosts] = React.useState(false)
  const [posts, setPosts] = React.useState([])
  const [postsState, setPostsState] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)
  const { next } = React.useContext(WizardContext)

  const { initialLoading } = useCheckInitialPostsImportStatus(artistId, canLoadPosts, setCanLoadPosts)

  const postsLimit = 3
  const cursor = React.useRef('')

  const fetchPosts = async () => {
    console.log(activePosts)

    if (posts.length === postsLimit) {
      return
    }

    const res = await server.getPosts({
      limit: 2,
      artistId,
      sortBy: ['normalized_score'],
      cursor: cursor.current,
    })

    const postsFormatted = formatRecentPosts(res)
    const lastPost = res[res.length - 1]

    if (lastPost._links.after) {
      const nextCursor = getCursor(lastPost)
      cursor.current = nextCursor
    }

    postsFormatted.forEach(({ id, promotionEnabled }) => {
      setPostsState((prevState) => ({ ...prevState, [id]: promotionEnabled }))
    })

    setPosts([...posts, ...postsFormatted])
  }

  const loadMore = async () => {
    await fetchPosts()
  }

  useAsyncEffect(async (isMounted) => {
    if (!isMounted() || !canLoadPosts) return

    await fetchPosts()
  }, [canLoadPosts])

  const handleNext = async () => {
    const hasSelectedOnOrMorePosts = Object.values(postsState).some((post) => post)

    if (!hasSelectedOnOrMorePosts) {
      setError({ message: 'Please opt in at least one post' })
      return
    }

    setIsLoading(true)

    const postPromises = Object.entries(postsState).map(([key, value]) => {
      return updatePost({ artistId, postId: key, promotionEnabled: value, campaignType: 'all' })
    })

    await Promise.all(postPromises)
    setIsLoading(false)

    next()
  }

  if (initialLoading) return null

  return (
    <div className="flex flex-1 flex-column">
      {!canLoadPosts ? (
        <>
          <div className="flex mb-4">
            <Spinner width={24} className="flex-none w-auto mr-2" />
            <h3 className="mb-0 font-medium text-xl">{copy.postsSelectionSubtitle(canLoadPosts)}</h3>
          </div>
          <MarkdownText className="sm:w-2/3 text-grey-3 italic" markdown={copy.postsSelectionDescription(canLoadPosts)} />
        </>
      ) : (
        <>
          <h3 className="mb-4 font-medium text-xl">{copy.postsSelectionSubtitle(canLoadPosts)}</h3>
          <MarkdownText className="sm:w-2/3 text-grey-3 italic" markdown={copy.postsSelectionDescription(canLoadPosts)} />
        </>
      )}
      <div className="flex flex-1 flex-column justify-center items-center">
        {canLoadPosts && (
          <>
            <Error error={error} />
            <div className="flex mb-8 relative">
              {posts.map((post) => (
                <GetStartedPostsSelectionCard
                  key={post.id}
                  post={post}
                  postsState={postsState}
                  setPostsState={setPostsState}
                />
              ))}
            </div>
            <div className="flex flex-column sm:flex-row w-full sm:w-auto">
              {(posts.length !== postsLimit) && (
                <Button
                  version="outline-black"
                  onClick={loadMore}
                  className="w-full sm:w-56 mx-0 sm:mx-4 mb-6 sm:mb-0"
                  trackComponentName="GetStartedPostsStep"
                >
                  Load more...
                </Button>
              )}
              <Button
                version="green"
                onClick={handleNext}
                loading={isLoading}
                className="w-full sm:w-56 mx-0 sm:mx-4 mb-6 sm:mb-0"
                trackComponentName="GetStartedPostsStep"
              >
                Save
                <ArrowAltIcon
                  className="ml-3"
                  direction="right"
                  fill="white"
                />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

GetStartedPostsSelection.propTypes = {
}

GetStartedPostsSelection.defaultProps = {
}

export default GetStartedPostsSelection
