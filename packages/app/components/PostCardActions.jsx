import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import usePostsSidePanel from '@/app/hooks/usePostsSidePanel'
import ThreeDotsIcon from '@/icons/ThreeDots'
import PlusIcon from '@/icons/PlusIcon'
import ChevronDoubleUpIcon from '@/icons/ChevronDoubleUpIcon'
import PencilIcon from '@/icons/PencilIcon'
import RefreshIcon from '@/icons/RefreshIcon'
import InsightsIcon from '@/icons/InsightsIcon'
import { setPostPriority, updatePost, formatPostsResponse } from '@/app/helpers/postsHelpers'

const PostCardActions = ({
  post,
  index,
  status,
  setPosts,
}) => {
  const [action, setAction] = React.useState(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef(null)

  const { artistId } = React.useContext(ArtistContext)
  const { goToPostSettings, goToPostMetrics } = usePostsSidePanel()

  const enablePromotion = async () => {
    const { res, error } = await updatePost({ artistId, postId: post.id, promotionEnabled: true, campaignType: 'all' })
    if (error) {
      return
    }

    const [updatedPost] = formatPostsResponse([res])

    setPosts({
      type: 'add-to-queue',
      payload: {
        index,
        status,
        post: updatedPost,
      },
    })

    return updatedPost
  }

  const checkAndEnablePromotion = async ({
    promotion_enabled,
    conversions_enabled,
    priority_enabled,
  }) => {
    if (!priority_enabled || promotion_enabled || conversions_enabled) {
      return
    }

    await enablePromotion()
  }

  const prioritize = async () => {
    const { res, error } = await setPostPriority({ artistId, assetId: post.id, priorityEnabled: post.priorityEnabled })
    if (error) {
      return
    }

    const [updatedPost] = formatPostsResponse([res])

    setPosts({
      type: 'prioritize',
      payload: {
        index,
        status,
        post: updatedPost,
      },
    })

    await checkAndEnablePromotion(updatedPost)
  }

  const openSettings = () => {
    goToPostSettings({
      post,
      postIndex: index,
      artistId,
    })
  }

  const openMetrics = () => {
    const metrics = {
      organic: post.organicMetrics,
      paid: post.paidMetrics,
    }

    const { postType } = post
    goToPostMetrics({ metrics, postType })
  }

  const getAction = React.useCallback(() => {
    if (status === 'active') {
      return {
        name: 'View results',
        fn: () => {},
        icon: <InsightsIcon className="h-3 w-3 mr-1" />,
      }
    }

    if (status === 'rejected' || (status === 'pending' && index === 0)) {
      return {
        name: 'Edit ad',
        fn: openSettings,
        icon: <PencilIcon className="h-4 w-4 mr-1" />,
      }
    }

    if (status === 'pending' && index !== 0) {
      return {
        name: 'Push to front',
        fn: prioritize,
        icon: <ChevronDoubleUpIcon className="h-4 w-4 mr-1" />,
      }
    }

    if (status === 'archived') {
      return {
        name: 'Reactivate',
        fn: prioritize,
        icon: <RefreshIcon className="h-3 w-3 mr-1" />,
      }
    }

    if (status === 'inactive') {
      return {
        name: 'Add to queue',
        fn: enablePromotion,
        icon: <PlusIcon className="h-3 w-3 mr-1" />,
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const close = ({ target }) => {
    if (!dropdownRef.current) {
      return
    }

    if (dropdownRef.current.contains(target)) {
      return
    }

    setIsOpen(false)
  }

  React.useEffect(() => {
    setAction(getAction())
  }, [getAction])

  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', close)
      return
    }
    window.removeEventListener('click', close)

    return () => {
      window.removeEventListener('click', close)
    }
  }, [isOpen])

  return (
    <div className="absolute right-2 bottom-2 z-10" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={[
          'w-6 h-6 flex justify-center items-center bg-grey-1 rounded-dialogue',
        ].join(' ')}
      >
        <ThreeDotsIcon />
      </button>
      {isOpen && (
        <ul
          className={[
            'absolute z-10 top-2 left-2 px-4 py-3',
            'border-2 border-solid border-black',
            'bg-white rounded-dialogue',
          ].join(' ')}
        >
          <li>
            <button onClick={action?.fn} className="flex items-center mb-3 whitespace-nowrap font-bold border-b border-solid border-grey-2">
              {action?.icon}
              {action?.name}
            </button>
          </li>
          <li>
            <button onClick={openSettings} className="mb-2 whitespace-nowrap">
              Settings
            </button>
          </li>
          <li>
            <button onClick={openMetrics} className="whitespace-nowrap">
              Details
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

PostCardActions.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  setPosts: PropTypes.func.isRequired,
}

export default PostCardActions
