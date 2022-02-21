import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useCheckInitialPostsImportStatus from '@/app/hooks/useCheckInitialPostsImportStatus'

import GetStartedPostsSelectionCard from '@/app/GetStartedPostsSelectionCard'
import GetStartedPostsSelectionAnalysePosts from '@/app/GetStartedPostsSelectionAnalysePosts'
import GetStartedPostsSelectionButtons from '@/app/GetStartedPostsSelectionButtons'

import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import * as server from '@/app/helpers/appServer'
import { formatRecentPosts } from '@/app/helpers/resultsHelpers'
import { getCursor } from '@/app/helpers/postsHelpers'

import copy from '@/app/copy/getStartedCopy'

const GetStartedPostsSelection = () => {
  const [canLoadPosts, setCanLoadPosts] = React.useState(false)
  const [posts, setPosts] = React.useState([])
  const [postsState, setPostsState] = React.useState({})
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)

  const { initialLoading } = useCheckInitialPostsImportStatus(artistId, canLoadPosts, setCanLoadPosts)

  const postsLimit = 4
  const cursor = React.useRef('')

  const fetchPosts = async () => {
    if (posts.length === postsLimit) {
      return
    }

    const res = await server.getPosts({
      limit: 3,
      artistId,
      sortBy: ['normalized_score'],
      cursor: cursor.current,
    })

    const postsFormatted = formatRecentPosts(res)
    const lastPost = res[res.length - 1]

    if (lastPost?._links.after) {
      const nextCursor = getCursor(lastPost)
      cursor.current = nextCursor
    }

    postsFormatted.forEach(({ id, promotionEnabled }) => {
      setPostsState((prevState) => ({ ...prevState, [id]: promotionEnabled }))
    })

    setPosts([...posts, ...postsFormatted])
  }

  useAsyncEffect(async (isMounted) => {
    if (!isMounted() || !canLoadPosts) return

    await fetchPosts()
  }, [canLoadPosts])


  if (initialLoading) return null

  return (
    <div className="flex flex-1 flex-column">
      {!canLoadPosts ? (
        <GetStartedPostsSelectionAnalysePosts canLoadPosts={canLoadPosts} />
      ) : (
        <>
          <h3 className="mb-4 font-medium text-xl">{copy.postsSelectionSubtitle(canLoadPosts)}</h3>
          <MarkdownText className="sm:w-2/3 text-grey-3 italic" markdown={copy.postsSelectionDescription(canLoadPosts)} />
          <div className="flex flex-1 flex-column justify-center items-center">
            <Error error={error} />
            <div className="flex mb-12 relative">
              {posts.map((post) => (
                <GetStartedPostsSelectionCard
                  key={post.id}
                  post={post}
                  postsState={postsState}
                  setPostsState={setPostsState}
                />
              ))}
            </div>
            <GetStartedPostsSelectionButtons
              fetchPosts={fetchPosts}
              posts={posts}
              postsState={postsState}
              postsLimit={postsLimit}
              setError={setError}
            />
          </div>
        </>
      )}
    </div>
  )
}

GetStartedPostsSelection.propTypes = {
}

GetStartedPostsSelection.defaultProps = {
}

export default GetStartedPostsSelection
