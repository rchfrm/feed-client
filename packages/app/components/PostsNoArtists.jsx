import React from 'react'

import { AuthContext } from '@/contexts/AuthContext'

import PostsNoArtistsConnectAccountsBlock from '@/app/PostsNoArtistsConnectAccountsBlock'
import PostsSorter from '@/app/PostsSorter'
import PostsFilters from '@/app/PostsFilters'
import PostsNoArtistsDummyAll from '@/app/PostsNoArtistsDummyAll'
import ConnectFacebookButton from '@/app/ConnectFacebookButton'
import Error from '@/elements/Error'

import { postTypes, sortTypes } from '@/app/helpers/postsHelpers'

const PostsNoArtists = () => {
  const { authError, setAuthError } = React.useContext(AuthContext)
  const [errors, setErrors] = React.useState([authError])

  // Set initial error (if any)
  React.useEffect(() => {
    setErrors([authError])
  }, [authError])

  // Clear auth error when leaving page
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
      <div className="grid grid-cols-12 col-gap-6 mb-12">
        <PostsNoArtistsConnectAccountsBlock
          errors={errors}
          setErrors={setErrors}
          className="col-span-12 sm:col-span-6 lg:col-span-4 p-6 bg-grey-1"
        />
      </div>
      <div className="relative mb-20">
        <div className="grid grid-cols-12 col-gap-6">
          {/* SORT */}
          <PostsSorter
            sortTypes={sortTypes}
            sortBy="published_time"
            setSortBy={() => {}}
            defaultSortState=""
            disabled
            className="col-start-1 col-span-12 sm:col-span-4"
          />
          {/* FILTERS */}
          <PostsFilters
            postTypes={postTypes}
            currentPostType="all"
            setCurrentPostType={() => {}}
            defaultPostState=""
            disabled
            className="row-span-1 col-span-12 sm:col-span-8"
          />
        </div>
        <PostsNoArtistsDummyAll
          errors={errors}
          setErrors={setErrors}
        />
        <div
          className="absolute bg-black z-10 opacity-50"
          style={{ top: '-25px', left: '-25px', right: '-25px', bottom: '-25px' }}
        />
      </div>
      <div className="grid grid-cols-12 col-gap-6">
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
}

PostsNoArtists.defaultProps = {
}

export default PostsNoArtists
