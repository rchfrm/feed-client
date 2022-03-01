import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { updatePost } from '@/app/helpers/postsHelpers'


const GetStartedPostsSelectionButtons = ({ fetchPosts, posts, postsState, postsLimit, setError }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { artistId } = React.useContext(ArtistContext)
  const { next } = React.useContext(WizardContext)

  const loadMore = async () => {
    await fetchPosts()
  }

  const handleNext = async () => {
    const hasSelectedOnOrMorePosts = Object.values(postsState).some((post) => post)

    if (!hasSelectedOnOrMorePosts) {
      setError({ message: 'Please opt in at least one post' })
      return
    }

    setIsLoading(true)

    const postPromises = Object.entries(postsState).map(([key, value]) => {
      return updatePost({ artistId, postId: key, promotionEnabled: value, campaignType: 'all' })
    })

    await Promise.all(postPromises)
    setIsLoading(false)

    next()
  }

  return (
    <div className="flex flex-column sm:flex-row w-full sm:w-auto">
      {(posts.length !== postsLimit) && (
        <Button
          version="outline-black"
          onClick={loadMore}
          className="w-full sm:w-56 mx-0 sm:mx-4 mb-6 sm:mb-0"
          trackComponentName="GetStartedPostsSelection"
        >
          Load more...
        </Button>
      )}
      <Button
        version="green"
        onClick={handleNext}
        loading={isLoading}
        className="w-full sm:w-56 mx-0 sm:mx-4 mb-6 sm:mb-0"
        trackComponentName="GetStartedPostsSelection"
      >
        Save
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill="white"
        />
      </Button>
    </div>
  )
}

GetStartedPostsSelectionButtons.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  postsState: PropTypes.object.isRequired,
  postsLimit: PropTypes.number.isRequired,
  setError: PropTypes.func.isRequired,
}

GetStartedPostsSelectionButtons.defaultProps = {
}

export default GetStartedPostsSelectionButtons
