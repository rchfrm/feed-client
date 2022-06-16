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
import PostInsights from '@/app/PostInsights'
import PostSettings from '@/app/PostSettings'
import PostCardToggles from '@/app/PostCardToggles'
import PostCardUnpromotable from '@/app/PostCardUnpromotable'

import { postOptions } from '@/app/helpers/postsHelpers'

export const postTabs = [
  {
    name: 'details',
  },
  {
    name: 'insights',
  },
  {
    name: 'settings',
  },
]

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const PostContent = ({ post, updatePost }) => {
  const [activeTab, setActiveTab] = React.useState(postTabs[0].name)

  const breakpoint = 'sm'
  const { width } = useOnResize()

  const { setHeader } = React.useContext(InterfaceContext)
  const { artistId } = React.useContext(ArtistContext)
  const isDesktopLayout = useBreakpointTest(breakpoint)

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'

  // Define function for toggling promotion campaign or conversions campaign
  const toggleCampaign = React.useCallback(async (promotionEnabled, promotableStatus, campaignType = 'all') => {
    updatePost(campaignType === 'all' ? 'toggle-promotion' : 'toggle-conversion',
      {
        promotionEnabled,
        promotableStatus,
      })
  }, [updatePost])

  const postComponents = {
    details: <PostDetails post={post} />,
    insights: <PostInsights post={post} />,
    settings: <PostSettings post={post} updatePost={updatePost} toggleCampaign={toggleCampaign} />,
  }

  React.useEffect(() => {
    if (!post) return

    const isMobile = width < 992
    const isDesktop = width > 1220
    const textLength = isDesktop ? 32 : 20

    if (!isMobile) {
      const truncatedText = post?.message?.substring(0, textLength)

      setHeader({ text: truncatedText ? `${truncatedText}...` : 'post' })
      return
    }

    setHeader({ text: 'post' })
  }, [width, post, isDesktopLayout, setHeader])

  return (
    isDesktopLayout ? (
      <>
        <SplitView
          contentComponents={postComponents}
          options={postOptions}
          optionsHeader={<PostMedia post={post} />}
          breakpoint={breakpoint}
          className="sm:grid grid-cols-12 gap-8"
        />
      </>
    ) : (
      <>
        <PostMediaMobile
          post={post}
        />
        {post.postPromotable ? (
          <PostCardToggles
            artistId={artistId}
            post={post}
            postToggleSetterType="single"
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
            className="py-3 px-4 mb-2"
          />
        )}
        <RadioButtonTabs
          tabs={postTabs}
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
