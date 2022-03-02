import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import { useImmerReducer } from 'use-immer'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { WizardContext } from '@/app/contexts/WizardContext'

import useCheckInitialPostsImportStatus from '@/app/hooks/useCheckInitialPostsImportStatus'
import useBreakpointTest from '@/hooks/useBreakpointTest'

import GetStartedPostsSelectionCard from '@/app/GetStartedPostsSelectionCard'
import GetStartedPostsSelectionAnalysePosts from '@/app/GetStartedPostsSelectionAnalysePosts'
import GetStartedPostsSelectionButtons from '@/app/GetStartedPostsSelectionButtons'

import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import * as server from '@/app/helpers/appServer'
import { formatRecentPosts } from '@/app/helpers/resultsHelpers'
import { getCursor } from '@/app/helpers/postsHelpers'

import copy from '@/app/copy/getStartedCopy'

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
    default:
      return draftState
  }
}

const GetStartedPostsSelection = ({ initialPosts }) => {
  const [canLoadPosts, setCanLoadPosts] = React.useState(false)
  const [posts, setPosts] = useImmerReducer(postsReducer, postsInitialState)
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)
  const { wizardState } = React.useContext(WizardContext)

  const { initialLoading } = useCheckInitialPostsImportStatus(artistId, canLoadPosts, setCanLoadPosts)
  const isDesktopLayout = useBreakpointTest('sm')
  const shouldAdjustLayout = isDesktopLayout && posts.length > 5

  const cursor = React.useRef('')

  const fetchPosts = async () => {
    // Fetch eligible posts sorted by normalized score
    const res = await server.getPosts({
      artistId,
      sortBy: ['normalized_score'],
      filterBy: {
        is_promotable: [true],
      },
      cursor: cursor.current,
      limit: 5,
    })

    const postsFormatted = formatRecentPosts(res)
    const lastPost = res[res.length - 1]

    // Store the cursor of the last post
    if (lastPost?._links.after) {
      const nextCursor = getCursor(lastPost)
      cursor.current = nextCursor
    }

    // Filter out the posts that were already fetched earlier
    const postsFiltered = postsFormatted.filter((formattedPost) => posts.every((post) => post.id !== formattedPost.id))

    // Update local posts state
    setPosts({
      type: 'add-posts',
      payload: { posts: postsFiltered },
    })
  }

  useAsyncEffect(async (isMounted) => {
    if (!canLoadPosts) return

    // If there are already posts no need to do anything
    if (posts.length) {
      return
    }

    // If there are enabled posts in the local wizard state we show these
    if (wizardState?.enabledPosts?.length) {
      setPosts({
        type: 'set-posts',
        payload: { posts: wizardState?.enabledPosts },
      })

      return
    }

    // If there are enabled posts that were initially fetched when we mounted the wizard we show these
    if (!wizardState?.enabledPosts && initialPosts.length) {
      setPosts({
        type: 'set-posts',
        payload: { posts: initialPosts },
      })

      return
    }

    if (!isMounted()) return

    // Otherwise there are no enabled posts yet and we fetch eligible posts sorted by normalized score
    await fetchPosts()
  }, [canLoadPosts])

  if (initialLoading) return null

  return (
    <div className="flex flex-1 flex-column mb-6">
      {!canLoadPosts ? (
        <GetStartedPostsSelectionAnalysePosts canLoadPosts={canLoadPosts} />
      ) : (
        <>
          <h3 className="mb-4 font-medium text-xl">{copy.postsSelectionSubtitle(canLoadPosts)}</h3>
          <MarkdownText className="sm:w-2/3 text-grey-3 italic" markdown={copy.postsSelectionDescription(canLoadPosts)} />
          <Error error={error} />
          <div className={[
            'flex flex-1',
            shouldAdjustLayout ? 'flex-row' : 'flex-column',
          ].join(' ')}
          >
            <div
              className={[
                'flex flex-1 flex-wrap justify-center gap-2 sm:gap-4',
                'mb-12',
                shouldAdjustLayout ? 'overflow-y-scroll' : null,
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
                />
              ))}
            </div>
            <GetStartedPostsSelectionButtons
              fetchPosts={fetchPosts}
              posts={posts}
              shouldAdjustLayout={shouldAdjustLayout}
              setError={setError}
            />
          </div>
        </>
      )}
    </div>
  )
}

GetStartedPostsSelection.propTypes = {
  initialPosts: PropTypes.array.isRequired,
}

GetStartedPostsSelection.defaultProps = {
}

export default GetStartedPostsSelection
