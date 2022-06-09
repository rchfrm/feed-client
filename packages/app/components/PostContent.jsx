import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import useOnResize from '@/landing/hooks/useOnResize'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import PostDetails from '@/app/PostDetails'
import PostInsights from '@/app/PostInsights'
import PostSettings from '@/app/PostSettings'
import SplitView from '@/app/SplitView'
import RadioButtonTabs from '@/app/RadioButtonTabs'

import Spinner from '@/elements/Spinner'

import { postOptions, getPostById } from '@/app/helpers/postsHelpers'

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

const Image = () => (
  <div
    className="col-span-8 col-start-3 relative mb-6"
    style={{ paddingBottom: '100%' }}
  >
    <div
      className={[
        'absolute',
        'top-0 left-0',
        'w-full h-full',
        'border-2 border-solid border-grey-2',
        'rounded-dialogue',
      ].join(' ')}
    />
  </div>
)

const PostContent = ({ postId }) => {
  const [post, setPost] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState(postTabs[0].name)

  const breakpoint = 'sm'
  const { width } = useOnResize()

  const { artistId } = React.useContext(ArtistContext)
  const { setHeader } = React.useContext(InterfaceContext)
  const isDesktopLayout = useBreakpointTest(breakpoint)

  const postComponents = {
    details: <PostDetails post={post} />,
    insights: <PostInsights post={post} />,
    settings: <PostSettings post={post} />,
  }

  useAsyncEffect(async (isMounted) => {
    if (!artistId) return

    const { res, error } = await getPostById(artistId, postId)
    if (!isMounted()) return

    if (error) {
      setIsLoading(false)
      return
    }

    setPost(res)
    setIsLoading(false)
  }, [artistId])

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

  if (isLoading) return <Spinner />

  return (
    isDesktopLayout ? (
      <SplitView
        contentComponents={postComponents}
        options={postOptions}
        optionsHeader={<Image />}
        breakpoint={breakpoint}
        className="sm:grid grid-cols-12 gap-8"
      />
    ) : (
      <>
        <div className="grid grid-cols-12">
          <Image />
        </div>
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
  postId: PropTypes.string.isRequired,
}

PostContent.defaultProps = {
}

export default PostContent
