import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PostImage from '@/PostImage'
import BrokenImageIcon from '@/icons/BrokenImageIcon'

import { formatRecentPosts } from '@/app/helpers/resultsHelpers'
import * as server from '@/app/helpers/appServer'
import brandColors from '@/constants/brandColors'

const GetStartedSummarySentencePosts = () => {
  const [posts, setPosts] = React.useState([])

  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    if (!isMounted() || !artistId) return

    const res = await server.getPosts({
      artistId,
      filterBy: {
        promotion_enabled: [true],
      },
      limit: 2,
    })

    const formattedRecentPosts = formatRecentPosts(res)

    setPosts(formattedRecentPosts)
  }, [])

  return (
    <>
      <span className="whitespace-pre mb-2">using these posts:</span>
      <div className="flex items-center mb-2">
        {posts.length ? (
          posts.map(({ id, media, thumbnails }) => (
            <div key={id} className="relative w-10 h-10 mx-2 rounded-full overflow-hidden">
              <PostImage
                mediaSrc={media}
                mediaType="image"
                thumbnailOptions={thumbnails}
                className="absolute pointer-events-none"
              />
            </div>
          ))
        ) : (
          Array.from([1, 2]).map((index) => (
            <BrokenImageIcon
              key={index}
              className="relative w-10 h-10 mx-2 rounded-full"
              circleFill={brandColors.black}
            />
          ))
        )}
      </div>
    </>
  )
}

GetStartedSummarySentencePosts.propTypes = {
}

GetStartedSummarySentencePosts.defaultProps = {
}

export default GetStartedSummarySentencePosts
