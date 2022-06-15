import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import useOnResize from '@/landing/hooks/useOnResize'

import { InterfaceContext } from '@/contexts/InterfaceContext'

import SplitView from '@/app/SplitView'
import RadioButtonTabs from '@/app/RadioButtonTabs'
import PostMedia from '@/app/PostMedia'
import PostMediaMobile from '@/app/PostMediaMobile'
import PostDetails from '@/app/PostDetails'
import PostInsights from '@/app/PostInsights'
import PostSettings from '@/app/PostSettings'

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

const PostContent = ({ post, updatePost }) => {
  const [activeTab, setActiveTab] = React.useState(postTabs[0].name)

  const breakpoint = 'sm'
  const { width } = useOnResize()

  const { setHeader } = React.useContext(InterfaceContext)
  const isDesktopLayout = useBreakpointTest(breakpoint)

  const postComponents = {
    details: <PostDetails post={post} />,
    insights: <PostInsights post={post} />,
    settings: <PostSettings post={post} updatePost={updatePost} />,
  }

  React.useEffect(() => {
    if (!post) return

    const isMobile = width < 992
    const isDesktop = width > 1220
    const textLength = isDesktop ? 32 : 20

    if (!isMobile) {
      const text = `${post?.message.substring(0, textLength)}...`

      setHeader({ text })
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
