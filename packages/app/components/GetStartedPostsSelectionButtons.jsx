import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { WizardContext } from '@/app/contexts/WizardContext'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import GetStartedPostsSelectionButtonsMobile from '@/app/GetStartedPostsSelectionButtonsMobile'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { updatePost } from '@/app/helpers/postsHelpers'


const GetStartedPostsSelectionButtons = ({ fetchPosts, posts, shouldAdjustLayout, setError }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { artistId } = React.useContext(ArtistContext)
  const { next, setWizardState } = React.useContext(WizardContext)

  const isDesktopLayout = useBreakpointTest('sm')

  const loadMore = async () => {
    await fetchPosts()
  }

  const handleNext = async () => {
    setIsLoading(true)

    const enabledPosts = posts.filter((post) => post.promotionEnabled)

    if (enabledPosts.length < 1) {
      setError({ message: 'Please opt in at least one post to continue' })
      setIsLoading(false)

      return
    }

    const postPromises = posts.map(({ id, promotionEnabled }) => {
      return updatePost({ artistId, postId: id, promotionEnabled, campaignType: 'all' })
    })

    await Promise.all(postPromises)

    setWizardState({
      type: 'set-state',
      payload: {
        enabledPosts,
      },
    })

    setIsLoading(false)

    next()
  }

  if (!isDesktopLayout) {
    return (
      <GetStartedPostsSelectionButtonsMobile
        loadMore={loadMore}
        handleNext={handleNext}
      />
    )
  }

  return (
    <div
      className={[
        'flex flex-column w-full',
        shouldAdjustLayout ? 'sm:flex-column' : 'sm:flex-row justify-center',
        'sm:w-auto',
      ].join(' ')}
    >
      <Button
        version="outline-black"
        onClick={loadMore}
        className={[
          'w-full sm:w-56 mx-0 sm:mx-4 mb-6',
          shouldAdjustLayout ? 'sm:mb-4' : 'sm:mb-0',
        ].join(' ')}
        trackComponentName="GetStartedPostsSelectionButtons"
      >
        Load more...
      </Button>
      <Button
        version="green"
        onClick={handleNext}
        loading={isLoading}
        className="w-full sm:w-56 mx-0 sm:mx-4"
        trackComponentName="GetStartedPostsSelectionButtons"
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
  shouldAdjustLayout: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
}

GetStartedPostsSelectionButtons.defaultProps = {
}

export default GetStartedPostsSelectionButtons
