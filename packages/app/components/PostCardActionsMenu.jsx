import React from 'react'
import PropTypes from 'prop-types'
import useControlsStore from '@/app/stores/controlsStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import usePostsSidePanel from '@/app/hooks/usePostsSidePanel'
import PlusIcon from '@/icons/PlusIcon'
import ChevronDoubleUpIcon from '@/icons/ChevronDoubleUpIcon'
import PencilIcon from '@/icons/PencilIcon'
import RefreshIcon from '@/icons/RefreshIcon'
import InsightsIcon from '@/icons/InsightsIcon'
import { setPostPriority, updatePost, formatPostsResponse } from '@/app/helpers/postsHelpers'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const PostCardActionsMenu = ({
  post,
  index,
  status,
  setPosts,
  setIsOpen,
}) => {
  const [action, setAction] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)
  const { goToPostSettings, goToPostResults, goToPostDetails } = usePostsSidePanel()

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'

  const enablePromotion = async () => {
    const { res, error } = await updatePost({
      artistId,
      postId: post.id,
      promotionEnabled: true,
      ...(hasSalesObjective && { conversionsEnabled: true }),
      campaignType: 'all',
    })
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

    setIsOpen(false)
  }

  const checkAndEnablePromotion = async ({
    promotionEnabled,
    conversionsEnabled,
    priorityEnabled,
  }) => {
    if (! priorityEnabled || promotionEnabled || conversionsEnabled) {
      setIsOpen(false)
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

  const openResults = () => {
    goToPostResults(post.paidResults)
  }

  const openDetails = () => {
    goToPostDetails({
      post,
    })
  }

  const getAction = React.useCallback(() => {
    if (status === 'active') {
      return {
        name: 'View results',
        fn: openResults,
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

  React.useEffect(() => {
    setAction(getAction())
  }, [getAction])

  return (
    <ul
      className={[
        'absolute z-10 top-2 left-2 px-4 py-3',
        'border-2 border-solid border-black',
        'bg-white rounded-dialogue',
      ].join(' ')}
    >
      <li>
        <button
          onClick={action?.fn}
          className={[
            'flex items-center',
            'pb-2 mb-2 whitespace-nowrap font-bold',
            'border-b border-solid border-grey-2',
          ].join(' ')}
        >
          {action?.icon}
          {action?.name}
        </button>
      </li>
      {status === 'archived' && (
        <li>
          <button onClick={openResults} className="mb-2 whitespace-nowrap">
            Results
          </button>
        </li>
      )}
      <li>
        <button onClick={openSettings} className="mb-2 whitespace-nowrap">
          Settings
        </button>
      </li>
      <li>
        <button onClick={openDetails} className="whitespace-nowrap">
          Details
        </button>
      </li>
    </ul>
  )
}

PostCardActionsMenu.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  setPosts: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

export default PostCardActionsMenu
