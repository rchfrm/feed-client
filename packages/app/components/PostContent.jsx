import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import { ArtistContext } from '@/app/contexts/ArtistContext'

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

const PostContent = ({ postId }) => {
  const [post, setPost] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState(postTabs[0].name)

  const breakpoint = 'sm'
  const { artistId } = React.useContext(ArtistContext)
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

  if (isLoading) return <Spinner />

  return (
    isDesktopLayout ? (
      <SplitView
        contentComponents={postComponents}
        options={postOptions}
        breakpoint={breakpoint}
        className="sm:grid grid-cols-12 gap-8"
      />
    ) : (
      <>
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
