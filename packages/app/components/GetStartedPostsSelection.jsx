import React from 'react'
import useAsyncEffect from 'use-async-effect'
import { useImmerReducer } from 'use-immer'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useCheckBackgroundTaskStatus from '@/app/hooks/useCheckBackgroundTaskStatus'
import useBreakpointTest from '@/hooks/useBreakpointTest'

import GetStartedPostsSelectionCard from '@/app/GetStartedPostsSelectionCard'
import GetStartedPostsSelectionAnalysePosts from '@/app/GetStartedPostsSelectionAnalysePosts'
import GetStartedPostsSelectionButtons from '@/app/GetStartedPostsSelectionButtons'

import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'

import * as server from '@/app/helpers/appServer'

import { getInitialPostsImportStatus, formatPostsMinimal } from '@/app/helpers/postsHelpers'

import copy from '@/app/copy/getStartedCopy'
import postsCopy from '@/app/copy/PostsPageCopy'

const postsInitialState = []

const postsReducer = (draftState, postsAction) => {
  const { type: actionType, payload = {} } = postsAction

  const {
    posts,
    postIndex,
    promotionEnabled,
  } = payload

  switch (actionType) {
    case 'set-posts':
      return posts
    case 'add-posts':
      draftState.push(...posts)
      break
    case 'toggle-promotion':
      draftState[postIndex].promotionEnabled = promotionEnabled
      break
    case 'batch-toggle-promotion':
      postIndex.forEach((index) => {
        draftState[index].promotionEnabled = promotionEnabled
      })
      break
    default:
      return draftState
  }
}

const GetStartedPostsSelection = () => {
  const [canLoadPosts, setCanLoadPosts] = React.useState(false)
  const [posts, setPosts] = useImmerReducer(postsReducer, postsInitialState)
  const [postType, setPostType] = React.useState('promotion_enabled')
  const [hasEnabledPosts, setHasEnabledPosts] = React.useState(false)
  const [shouldShowLoadMoreButton, setShouldShowLoadMoreButton] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)
  const { noPostsCopy } = postsCopy

  const { initialLoading } = useCheckBackgroundTaskStatus({
    artistId,
    action: getInitialPostsImportStatus,
    completionKey: 'last_update_completed_at',
    hasCompleted: canLoadPosts,
    setHasCompleted: setCanLoadPosts,
  })
  const isDesktopLayout = useBreakpointTest('sm')
  const shouldAdjustLayout = isDesktopLayout && posts.length > 5

  const cursor = React.useRef('')

  const fetchPosts = async (postType, limit) => {
    return server.getPosts({
      artistId,
      sortBy: ['normalizedScore'],
      filterBy: {
        [postType]: [true],
        ...(postType === 'is_promotable' && { promotion_enabled: [false] }),
      },
      limit,
      cursor: cursor.current,
    })
  }

  const handlePosts = async (postType, limit) => {
    let res = []
    setIsLoading(true)
    // Fetch posts sorted by normalized score
    res = await fetchPosts(postType, limit)

    if (res.length > 0 && postType === 'promotion_enabled') {
      setHasEnabledPosts(true)
    }

    // If the response is empty and post type is 'promotion_enabled' try fetching promotable posts
    if (res.length === 0 && postType === 'promotion_enabled') {
      cursor.current = ''
      setPostType('is_promotable')

      res = await fetchPosts('is_promotable', 5)
    }

    // If the response is empty and post type is 'is_promotable' hide load more button
    if (res.length === 0 && postType === 'is_promotable') {
      setShouldShowLoadMoreButton(false)
    }

    const postsFormatted = formatPostsMinimal(res)

    // Store the cursor of the last post
    const lastPost = postsFormatted[postsFormatted.length - 1]
    cursor.current = lastPost?.id

    // Filter out the posts that were already fetched earlier
    const postsFiltered = postsFormatted.filter((formattedPost) => posts.every((post) => post.id !== formattedPost.id))

    // Update local posts state
    setPosts({
      type: 'add-posts',
      payload: { posts: postsFiltered },
    })

    setIsLoading(false)
  }

  useAsyncEffect(async (isMounted) => {
    if (! canLoadPosts) return

    // If there are already posts no need to do anything
    if (posts.length) {
      return
    }

    if (! isMounted()) return

    // Otherwise there are no enabled posts yet and we try to fetch the first 10 enabled posts sorted by normalized score
    await handlePosts(postType, 10)
  }, [canLoadPosts])

  React.useEffect(() => {
    if (posts.length > 0 && ! hasEnabledPosts) {
      setPosts({
        type: 'batch-toggle-promotion',
        payload: {
          postIndex: [0, 1],
          promotionEnabled: true,
        },
      })

      setHasEnabledPosts(true)
    }
  }, [posts, hasEnabledPosts, setPosts])

  if (initialLoading) return null

  if (canLoadPosts && ! posts.length && ! isLoading) {
    return noPostsCopy.all()
  }

  return (
    <div className="flex flex-1 flex-column mb-6">
      {! canLoadPosts ? (
        <GetStartedPostsSelectionAnalysePosts />
      ) : (
        posts.length > 0 ? (
          <>
            <h3 className="mb-4 font-medium text-lg">{copy.postsSelectionSubtitle(hasEnabledPosts, postType)}</h3>
            <Error error={error} />
            <div className={[
              shouldAdjustLayout ? 'grid grid-cols-12' : null,
            ].join(' ')}
            >
              <div
                className={[
                  shouldAdjustLayout ? (
                    `grid col-span-8 md:col-span-9 lg:col-span-10 gap-4
                    grid-cols-12 lg:grid-cols-10
                    mb-12 pr-4
                    overflow-y-scroll`
                  ) : (
                    'flex flex-1 flex-wrap justify-center gap-2 sm:gap-4 mb-12'
                  ),
                ].join(' ')}
                style={{ maxHeight: shouldAdjustLayout ? '300px' : null }}
              >
                {posts.map((post, index) => (
                  <GetStartedPostsSelectionCard
                    key={post.id}
                    post={post}
                    postIndex={index}
                    setPosts={setPosts}
                    setError={setError}
                    shouldAdjustLayout={shouldAdjustLayout}
                    className="col-span-6 md:col-span-4 lg:col-span-2"
                  />
                ))}
              </div>
              <GetStartedPostsSelectionButtons
                handlePosts={handlePosts}
                postType={postType}
                posts={posts}
                setError={setError}
                shouldAdjustLayout={shouldAdjustLayout}
                shouldShowLoadMoreButton={shouldShowLoadMoreButton}
                className={[shouldAdjustLayout ? 'col-span-4 md:col-span-3 lg:col-span-2 ml-4' : null].join(' ')}
              />
            </div>
          </>
        ) : (
          <Spinner />
        )
      )}
    </div>
  )
}

GetStartedPostsSelection.propTypes = {
}

GetStartedPostsSelection.defaultProps = {
}

export default GetStartedPostsSelection
