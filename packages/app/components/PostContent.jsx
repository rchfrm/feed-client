import React from 'react'
import PropTypes from 'prop-types'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import useOnResize from '@/landing/hooks/useOnResize'
import { InterfaceContext } from '@/app/contexts/InterfaceContext'
import SplitView from '@/app/SplitView'
import PostMedia from '@/app/PostMedia'
import PostDetails from '@/app/PostDetails'
import PostSettings from '@/app/PostSettings'
import PostContentMediaMobile from '@/app/PostContentMediaMobile'
import RadioButtonTabs from '@/app/RadioButtonTabs'
import { postOptions } from '@/app/helpers/postsHelpers'

const PostContent = ({ post, setPost }) => {
  const [activeTab, setActiveTab] = React.useState(postOptions[0].name)

  const breakpoint = 'sm'
  const { width } = useOnResize()

  const { setHeader } = React.useContext(InterfaceContext)
  const isDesktopLayout = useBreakpointTest(breakpoint)

  const postComponents = {
    details: <PostDetails post={post} className="md:pl-16" />,
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
