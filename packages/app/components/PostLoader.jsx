import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import { useImmerReducer } from 'use-immer'
import Router from 'next/router'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PostContent from '@/app/PostContent'
import Spinner from '@/elements/Spinner'

import { getPostById } from '@/app/helpers/postsHelpers'
import * as ROUTES from '@/app/constants/routes'

const postInitialState = null

const postReducer = (draftState, postsAction) => {
  const {
    type: actionType,
    payload = {},
  } = postsAction

  const {
    post,
    promotionEnabled,
    promotableStatus,
    priorityEnabled,
    linkSpecs,
    adMessages,
    callToActions,
  } = payload

  switch (actionType) {
    case 'add-post':
      return post
    case 'toggle-promotion':
      draftState.promotionEnabled = promotionEnabled
      draftState.promotableStatus = promotableStatus
      break
    case 'toggle-conversion':
      draftState.conversionsEnabled = promotionEnabled
      draftState.promotableStatus = promotableStatus
      break
    case 'toggle-priority':
      draftState.priorityEnabled = priorityEnabled
      break
    case 'update-link-specs':
      draftState.linkSpecs = linkSpecs
      break
    case 'update-call-to-actions':
      draftState.callToActions = callToActions
      break
    case 'update-ad-messages':
      draftState.adMessages = adMessages
      break
    default:
      return draftState
  }
}

const PostLoader = ({ postId }) => {
  const [post, setPost] = useImmerReducer(postReducer, postInitialState)
  const [isLoading, setIsLoading] = React.useState(true)

  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    if (! artistId) return

    const { res, error } = await getPostById(artistId, postId)
    if (! isMounted()) return

    if (error) {
      if (error.message === 'Not Found' || error.error === 'Not Found') {
        Router.push(ROUTES.HOME)
        return
      }

      setIsLoading(false)
      return
    }

    setPost({
      type: 'add-post',
      payload: {
        post: res,
      },
    })
    setIsLoading(false)
  }, [artistId])

  // Define function to update post
  const updatePost = React.useCallback((action, payload) => {
    setPost({ type: action, payload })
  }, [setPost])

  if (isLoading) return <Spinner />

  return (
    <PostContent
      post={post}
      updatePost={updatePost}
    />
  )
}

PostLoader.propTypes = {
  postId: PropTypes.string,
}

PostLoader.defaultProps = {
  postId: '',
}

export default PostLoader
