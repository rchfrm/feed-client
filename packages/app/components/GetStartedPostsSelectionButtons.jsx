import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { WizardContext } from '@/app/contexts/WizardContext'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import GetStartedPostsSelectionButtonsMobile from '@/app/GetStartedPostsSelectionButtonsMobile'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { updatePost } from '@/app/helpers/postsHelpers'
import brandColors from '@/constants/brandColors'

const GetStartedPostsSelectionButtons = ({
  fetchPosts,
  posts,
  setError,
  shouldAdjustLayout,
  className,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoadingMorePosts, setIsLoadingMorePosts] = React.useState(false)
  const { artistId } = React.useContext(ArtistContext)
  const { next, setWizardState } = React.useContext(WizardContext)

  const isDesktopLayout = useBreakpointTest('sm')

  const loadMore = async () => {
    setIsLoadingMorePosts(true)

    await fetchPosts()

    setIsLoadingMorePosts(false)
  }

  const handleNext = async () => {
    setIsLoading(true)

    const enabledPosts = posts.filter((post) => post.promotionEnabled)

    // Show error if there isn't any post opted in
    if (enabledPosts.length < 1) {
      setError({ message: 'Please opt in at least one post to continue' })
      setIsLoading(false)

      return
    }

    const postPromises = posts.map(({ id, promotionEnabled }) => {
      return updatePost({ artistId, postId: id, promotionEnabled, campaignType: 'all' })
    })

    // Patch promotion enabled value in the db
    await Promise.all(postPromises)

    // Update local wizard state
    setWizardState({
      type: 'set-state',
      payload: {
        key: 'enabledPosts',
        value: enabledPosts,
      },
    })

    setIsLoading(false)

    next()
  }

  // Show fixed buttons if on mobile
  if (!isDesktopLayout) {
    return (
      <GetStartedPostsSelectionButtonsMobile
        loadMore={loadMore}
        isLoading={isLoading}
        isLoadingMorePosts={isLoadingMorePosts}
        handleNext={handleNext}
      />
    )
  }

  return (
    <div
      className={[
        'flex flex-column',
        shouldAdjustLayout ? 'sm:flex-column' : 'sm:flex-row justify-center',
        className,
      ].join(' ')}
    >
      <Button
        version="outline-black"
        onClick={loadMore}
        loading={isLoadingMorePosts}
        spinnerFill={brandColors.black}
        className={[shouldAdjustLayout ? 'w-full' : 'w-56 mx-2', 'mb-4'].join(' ')}
        trackComponentName="GetStartedPostsSelectionButtons"
      >
        Load more...
      </Button>
      <Button
        version="green"
        onClick={handleNext}
        loading={isLoading}
        className={[shouldAdjustLayout ? 'w-full' : 'w-56 mx-2'].join(' ')}
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
  setError: PropTypes.func.isRequired,
  shouldAdjustLayout: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

GetStartedPostsSelectionButtons.defaultProps = {
  className: null,
}

export default GetStartedPostsSelectionButtons
