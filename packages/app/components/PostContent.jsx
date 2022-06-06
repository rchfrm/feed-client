import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import Spinner from '@/elements/Spinner'

import { getPostById } from '@/app/helpers/postsHelpers'

const PostContent = ({ postId }) => {
  const [post, setPost] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    if (!artistId) return

    const { res, error } = await getPostById(artistId, postId)
    if (!isMounted()) return

    if (error) {
      setIsLoading(false)
      return
    }

    setPost(res)
    setIsLoading(false)
  }, [artistId])

  React.useEffect(() => {
    console.log(post)
  }, [post])

  if (isLoading) return <Spinner />

  return (
    <ul>
      <li><strong>Post id:</strong> {post.id}</li>
      <li><strong>Message:</strong> {post.message}</li>
      <li><strong>Promotion status:</strong> {post.promotionStatus}</li>
    </ul>
  )
}

PostContent.propTypes = {
  postId: PropTypes.string.isRequired,
}

PostContent.defaultProps = {
}

export default PostContent
