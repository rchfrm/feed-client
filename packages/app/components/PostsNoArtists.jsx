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
          className="border-green"
          isOpen
        />
        <PostsNoArtistsContainer
          status="pending"
          className="bg-grey-1 border-grey-2"
          isOpen
        />
        <PostsNoArtistsContainer
          status="inactive"
          className="bg-grey-1 border-grey-2"
          isOpen={false}
        />
        <PostsNoArtistsContainer
          status="archived"
          className="bg-grey-1 border-grey-2"
          isOpen={false}
        />
      </div>
    </>
  )
}

export default PostsNoArtists
