import React from 'react'
import PropTypes from 'prop-types'
import useControlsStore from '@/app/stores/controlsStore'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import useOnResize from '@/landing/hooks/useOnResize'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import SplitView from '@/app/SplitView'
import RadioButtonTabs from '@/app/RadioButtonTabs'
import PostMedia from '@/app/PostMedia'
import PostMediaMobile from '@/app/PostMediaMobile'
import PostDetails from '@/app/PostDetails'
import PostResults from '@/app/PostResults'
import PostSettings from '@/app/PostSettings'
import PostCardToggles from '@/app/PostCardToggles'
import PostCardUnpromotable from '@/app/PostCardUnpromotable'
import { postOptions } from '@/app/helpers/postsHelpers'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const PostContent = ({ post, updatePost }) => {
  const [activeTab, setActiveTab] = React.useState(postOptions[0].name)

  const breakpoint = 'sm'
  const { width } = useOnResize()

  const { setHeader } = React.useContext(InterfaceContext)
  const { artistId } = React.useContext(ArtistContext)
  const isDesktopLayout = useBreakpointTest(breakpoint)

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'
  const { promotionStatus } = post
  const hidePaidResults = promotionStatus === 'inactive'

  // Define function for toggling promotion campaign or conversions campaign
  const toggleCampaign = React.useCallback(async (promotionEnabled, promotableStatus, campaignType = 'all') => {
    updatePost(campaignType === 'all' ? 'toggle-promotion' : 'toggle-conversion',
      {
        promotionEnabled,
        promotableStatus,
      })
  }, [updatePost])

  const postComponents = {
    details: <PostDetails post={post} className="md:pl-16" />,
    results: <PostResults results={hidePaidResults ? null : post.paidResults} shouldShowTitle={isDesktopLayout} className="md:pl-16" />,
    settings: <PostSettings post={post} updatePost={updatePost} toggleCampaign={toggleCampaign} />,
  }

  React.useEffect(() => {
    if (! post) return

    const isMobile = width < 992

    if (! isMobile) {
      setHeader({ text: post?.message || 'post' })
      return
    }

    setHeader({ text: 'post' })
  }, [width, post, isDesktopLayout, setHeader])

  return (
    isDesktopLayout ? (
      <SplitView
        contentComponents={postComponents}
        options={postOptions}
        optionsHeader={<PostMedia post={post} />}
        shouldUseSidePanelOnMobile={false}
        breakpoint={breakpoint}
        className="sm:grid grid-cols-12 gap-8"
      />
    ) : (
      <>
        <PostMediaMobile
          post={post}
        />
        {post.postPromotable ? (
          <PostCardToggles
            artistId={artistId}
            post={post}
            toggleCampaign={toggleCampaign}
            updatePost={updatePost}
            priorityEnabled={post.priorityEnabled}
            togglesClassName="py-2 px-4 mb-2 last:mb-10 border-2 border-solid border-grey-3"
            className="mb-2"
            hasSalesObjective={hasSalesObjective}
          />
        ) : (
          <PostCardUnpromotable
            hasSalesObjective={hasSalesObjective}
            className="py-3 px-4 mb-10"
          />
        )}
        <RadioButtonTabs
          tabs={postOptions}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          className="mb-12"
        />
        {postComponents[activeTab]}
      </>
    )
  )
}

PostContent.propTypes = {
  post: PropTypes.object.isRequired,
  updatePost: PropTypes.func.isRequired,
}

PostContent.defaultProps = {
}

export default PostContent
