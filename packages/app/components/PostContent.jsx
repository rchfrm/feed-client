import React from 'react'
import PropTypes from 'prop-types'
import useControlsStore from '@/app/stores/controlsStore'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import useOnResize from '@/landing/hooks/useOnResize'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import SplitView from '@/app/SplitView'
import PostMedia from '@/app/PostMedia'
import PostDetails from '@/app/PostDetails'
import PostMetrics from '@/app/PostMetrics'
import PostSettings from '@/app/PostSettings'
import PostContentMediaMobile from '@/app/PostContentMediaMobile'
import PostContentToggles from '@/app/PostContentToggles'
import PostContentUnpromotable from '@/app/PostContentUnpromotable'
import RadioButtonTabs from '@/app/RadioButtonTabs'
import { postOptions } from '@/app/helpers/postsHelpers'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const PostContent = ({ post, setPost }) => {
  const [activeTab, setActiveTab] = React.useState(postOptions[0].name)

  const breakpoint = 'sm'
  const { width } = useOnResize()

  const { setHeader } = React.useContext(InterfaceContext)
  const isDesktopLayout = useBreakpointTest(breakpoint)

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'
  const { postType, promotionStatus } = post
  const hidePaidMetrics = promotionStatus === 'inactive'

  const metrics = {
    organic: post.organicMetrics,
    paid: hidePaidMetrics ? null : post.paidMetrics,
  }

  const postComponents = {
    details: <PostDetails post={post} className="md:pl-16" />,
    metrics: <PostMetrics metrics={metrics} postType={postType} shouldShowTitle={isDesktopLayout} className="md:pl-16" />,
    settings: <PostSettings post={post} setPost={setPost} className="md:pl-16" />,
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
        <PostContentMediaMobile post={post} />
        {post.postPromotable ? (
          <PostContentToggles
            post={post}
            setPost={setPost}
            priorityEnabled={post.priorityEnabled}
            className="mb-2"
            hasSalesObjective={hasSalesObjective}
          />
        ) : (
          <PostContentUnpromotable
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
  setPost: PropTypes.func.isRequired,
}

export default PostContent
