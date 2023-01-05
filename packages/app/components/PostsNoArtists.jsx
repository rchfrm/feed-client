import React from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from '@/contexts/AuthContext'
import NoArtistsConnectAccountsBlock from '@/app/NoArtistsConnectAccountsBlock'
import PostsNoArtistsContainer from '@/app/PostsNoArtistsContainer'
import ConnectFacebookButton from '@/app/ConnectFacebookButton'
import Error from '@/elements/Error'

const PostsNoArtists = ({ dummyPostsImages }) => {
  const [postOne, postTwo, ...otherPosts] = dummyPostsImages
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
      <div className="grid grid-cols-12 gap-x-6 mb-12">
        <NoArtistsConnectAccountsBlock
          page="posts"
          errors={errors}
          setErrors={setErrors}
          className="col-span-12 sm:col-span-6 lg:col-span-4 p-6 bg-grey-1"
        />
      </div>
      <div className="relative mb-20">
        <PostsNoArtistsContainer
          status="active"
          dummyPostsImages={[postOne, postTwo]}
          filterBy={{ platform: 'facebook', internal_type: 'story' }}
          sortBy="published_time"
          isOpen
          className="border-green border-2"
        />
        <PostsNoArtistsContainer
          status="pending"
          isOpen={false}
        />
        <PostsNoArtistsContainer
          status="inactive"
          dummyPostsImages={otherPosts}
          filterBy={{ platform: 'instagram', internal_type: 'post' }}
          sortBy="normalized_score"
          isOpen
        />
        <PostsNoArtistsContainer
          status="archived"
          isOpen={false}
        />
        <div
          className="absolute bg-black z-10 opacity-50"
          style={{ top: '-25px', left: '-25px', right: '-25px', bottom: '-25px' }}
        />
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        <ConnectFacebookButton
          errors={errors}
          setErrors={setErrors}
          buttonText="Continue with Facebook"
          trackComponentName="PostsNoArtists"
          className={[
            'col-span-12 sm:col-span-6 sm:col-start-4',
            'lg:col-span-4 lg:col-start-5',
            'sm:max-w-none mx-auto max-w-sm',
            'text-sm',
          ].join(' ')}
        />
      </div>
    </>
  )
}

PostsNoArtists.propTypes = {
  dummyPostsImages: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
}

export default PostsNoArtists
