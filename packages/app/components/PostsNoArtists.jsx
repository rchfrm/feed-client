import React from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import PostsNoArtistsContainer from '@/app/PostsNoArtistsContainer'
import Error from '@/elements/Error'

const PostsNoArtists = () => {
  const { authError, setAuthError } = React.useContext(AuthContext)
  const [errors, setErrors] = React.useState([authError])

  React.useEffect(() => {
    setErrors([authError])
  }, [authError])

  React.useEffect(() => {
    return () => {
      setAuthError(null)
    }
  }, [setAuthError])

  return (
    <>
      {errors.map((error, index) => {
        return <Error error={error} key={index} />
      })}
      <div className="relative mb-20">
        <PostsNoArtistsContainer
          status="active"
          filterBy={{ platform: 'facebook', internal_type: 'story' }}
          sortBy="published_time"
          isOpen
          className="border-green border-2"
        />
        <PostsNoArtistsContainer
          status="pending"
          filterBy={{ platform: 'instagram', internal_type: 'post' }}
          sortBy="normalized_score"
          isOpen
        />
        <PostsNoArtistsContainer
          status="inactive"
          isOpen={false}
        />
        <PostsNoArtistsContainer
          status="archived"
          isOpen={false}
        />
      </div>
    </>
  )
}

export default PostsNoArtists
