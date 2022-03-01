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

  const { artistId } = React.useContext(ArtistContext)
  const { wizardState } = React.useContext(WizardContext)

  const { initialLoading } = useCheckInitialPostsImportStatus(artistId, canLoadPosts, setCanLoadPosts)
  const isDesktopLayout = useBreakpointTest('sm')
  const shouldAdjustLayout = isDesktopLayout && posts.length > 5

  const cursor = React.useRef('')

  const fetchPosts = async () => {
    const res = await server.getPosts({
      artistId,
      sortBy: ['normalized_score'],
      cursor: cursor.current,
      limit: 5,
    })

    const postsFormatted = formatRecentPosts(res)
    const lastPost = res[res.length - 1]

    if (lastPost?._links.after) {
      const nextCursor = getCursor(lastPost)
      cursor.current = nextCursor
    }

    const postsFiltered = postsFormatted.filter((formattedPost) => posts.every((post) => post.id !== formattedPost.id))

    setPosts({
      type: 'add-posts',
      payload: { posts: postsFiltered },
    })
  }

  useAsyncEffect(async (isMounted) => {
    if (!isMounted() || !canLoadPosts) return

    if (posts.length) {
      return
    }

    if (wizardState?.enabledPosts?.length) {
      setPosts({
        type: 'set-posts',
        payload: { posts: wizardState?.enabledPosts },
      })

      return
    }

    if (!wizardState?.enabledPosts && initialPosts.length) {
      setPosts({
        type: 'set-posts',
        payload: { posts: initialPosts },
      })

      return
    }

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
                />
              ))}
            </div>
            <GetStartedPostsSelectionButtons
              fetchPosts={fetchPosts}
              posts={posts}
              shouldAdjustLayout={shouldAdjustLayout}
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
