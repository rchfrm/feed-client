import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { WizardContext } from '@/app/contexts/WizardContext'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import GetStartedPostsSelectionButtonsMobile from '@/app/GetStartedPostsSelectionButtonsMobile'
import ButtonNew from '@/elements/ButtonNew'
import ArrowIcon from '@/icons/ArrowIcon'
import { togglePromotionEnabled } from '@/app/helpers/postsHelpers'
import brandColors from '@/constants/brandColors'

const GetStartedPostsSelectionButtons = ({
  handlePosts,
  postType,
  posts,
  setError,
  shouldAdjustLayout,
  shouldShowLoadMoreButton,
  className,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoadingMorePosts, setIsLoadingMorePosts] = React.useState(false)
  const { artistId, setEnabledPosts } = React.useContext(ArtistContext)
  const { next } = React.useContext(WizardContext)

  const isDesktopLayout = useBreakpointTest('sm')

  const loadMore = async () => {
    setIsLoadingMorePosts(true)

    await handlePosts(postType, 5)

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
      return togglePromotionEnabled({ artistId, postId: id, promotionEnabled, campaignType: 'all' })
    })

    // Patch promotion enabled value in the db
    await Promise.all(postPromises)

    setEnabledPosts(enabledPosts)
    setIsLoading(false)
    next()
  }

  // Show fixed buttons if on mobile
  if (! isDesktopLayout) {
    return (
      <GetStartedPostsSelectionButtonsMobile
        loadMore={loadMore}
        isLoading={isLoading}
        isLoadingMorePosts={isLoadingMorePosts}
        shouldShowLoadMoreButton={shouldShowLoadMoreButton}
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
      {shouldShowLoadMoreButton && (
        <ButtonNew
          version="secondary"
          onClick={loadMore}
          isLoading={isLoadingMorePosts}
          spinnerFill={brandColors.black}
          className={[shouldAdjustLayout ? 'w-full' : 'w-56 mx-2', 'mb-4'].join(' ')}
          trackComponentName="GetStartedPostsSelectionButtons"
        >
          Load more...
        </ButtonNew>
      )}
      <ButtonNew
        onClick={handleNext}
        isLoading={isLoading}
        className={[shouldAdjustLayout ? 'w-full' : 'w-56 mx-2'].join(' ')}
        trackComponentName="GetStartedPostsSelectionButtons"
      >
        Save
        <ArrowIcon
          className="w-7 h-auto ml-1"
          direction="right"
          fill={brandColors.black}
        />
      </ButtonNew>
    </div>
  )
}

GetStartedPostsSelectionButtons.propTypes = {
  handlePosts: PropTypes.func.isRequired,
  postType: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  setError: PropTypes.func.isRequired,
  shouldAdjustLayout: PropTypes.bool.isRequired,
  shouldShowLoadMoreButton: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

GetStartedPostsSelectionButtons.defaultProps = {
  className: null,
}

export default GetStartedPostsSelectionButtons
