import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PostImage from '@/PostImage'

import { formatRecentPosts } from '@/app/helpers/resultsHelpers'
import * as server from '@/app/helpers/appServer'

const GetStartedSummarySentencePosts = () => {
  const [posts, setPosts] = React.useState([])

  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return

    const res = await server.getPosts({
      artistId,
      filterBy: {
        promotion_status: ['in_review', 'active'],
      },
    })

    const formattedRecentPosts = formatRecentPosts(res)

    setPosts(formattedRecentPosts)
  }, [])

  return (
    <>
      <span className="whitespace-pre mb-2">using these posts:</span>
      <div className="flex items-center mb-2">
        {posts.map(({ id, media, thumbnails }) => (
          <div key={id} className="relative w-10 h-10 mx-2 rounded-full overflow-hidden">
            <PostImage
              mediaSrc={media}
              mediaType="image"
              thumbnailOptions={thumbnails}
              className="absolute pointer-events-none"
            />
          </div>
        ))}
      </div>
    </>
  )
}

GetStartedSummarySentencePosts.propTypes = {
}

GetStartedSummarySentencePosts.defaultProps = {
}

export default GetStartedSummarySentencePosts
