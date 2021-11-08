import React from 'react'

import PostCardDummy from '@/app/PostCardDummy'
import PostCardConnectAccounts from '@/app/PostCardConnectAccounts'
import ConnectFacebookButton from '@/app/ConnectFacebookButton'
import Error from '@/elements/Error'

import { dummyPosts } from '@/app/helpers/postsHelpers'

const PostsNoArtists = () => {
  const [errors, setErrors] = React.useState([])

  return (
    <>
      {errors.map((error, index) => {
        return <Error error={error} key={index} />
      })}
      <ul
        className={[
          'sm:grid',
          'grid-cols-12',
          'row-gap-10',
          'col-gap-6',
          'grid-flow-row-dense',
          'pt-6 mb-30',
        ].join(' ')}
      >
        {dummyPosts.map((post, index) => (
          <React.Fragment key={index}>
            {index === 1 && <PostCardConnectAccounts />}
            <PostCardDummy post={post} />
          </React.Fragment>
        ))}
      </ul>
      <div className="grid grid-cols-12">
        <ConnectFacebookButton
          errors={errors}
          setErrors={setErrors}
          buttonText="Connect your Facebook &amp; Instagram"
          trackComponentName="PostsNoArtists"
          className={[
            'col-span-12 sm:col-span-6 sm:col-start-4',
            'lg:col-span-4 lg:col-start-5',
            'sm:max-w-none mx-auto max-w-sm',
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
