import React from 'react'
import PropTypes from 'prop-types'
import useControlsStore from '@/app/stores/controlsStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import usePostsSidePanel from '@/app/hooks/usePostsSidePanel'
import PlusIcon from '@/icons/PlusIcon'
import ChevronDoubleIcon from '@/icons/ChevronDoubleIcon'
import PencilIcon from '@/icons/PencilIcon'
import RefreshIcon from '@/icons/RefreshIcon'
import { setPostPriority, togglePromotionEnabled } from '@/app/helpers/postsHelpers'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const PostCardActionsMenu = ({
  post,
  index,
  status,
  setPosts,
  setIsOpen,
  isLastPromotableNotRunPost,
}) => {
  const [action, setAction] = React.useState(null)

  const { id: postId } = post
  const { artistId } = React.useContext(ArtistContext)
  const { goToPostSettings, goToPostDetails } = usePostsSidePanel()

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'

  const enablePromotion = async () => {
    const { res: updatedPost, error } = await togglePromotionEnabled({
      artistId,
      postId,
      promotionEnabled: true,
      ...(hasSalesObjective && { conversionsEnabled: true }),
      campaignType: ['all', 'conversions'],
    })
    if (error) {
      return
    }

    const { promotionEnabled } = updatedPost

    setPosts({
      type: 'toggle-promotion',
      payload: {
        status,
        newStatus: promotionEnabled ? 'pending' : 'inactive',
        postId,
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
    const { res: updatedPost, error } = await setPostPriority({ artistId, assetId: postId, priorityEnabled: true })
    if (error) {
      return
    }

    const { priorityEnabled } = updatedPost

    setPosts({
      type: 'toggle-priority',
      payload: {
        status,
        newStatus: priorityEnabled ? 'pending' : 'inactive',
        postId,
        post: updatedPost,
      },
    })

    await checkAndEnablePromotion(updatedPost)
  }

  const openSettings = () => {
    goToPostSettings({
      post,
      status,
      setPosts,
      isLastPromotableNotRunPost,
    })
  }

  const openDetails = () => {
    goToPostDetails({
      post,
    })
  }

  const getAction = React.useCallback(() => {
    if (status === 'active' || status === 'rejected' || (status === 'pending' && index === 0)) {
      return {
        name: 'Edit ad',
        fn: openSettings,
        icon: <PencilIcon className="w-5 h-auto mr-1" />,
      }
    }

    if (status === 'pending' && index !== 0) {
      return {
        name: 'Push to front',
        fn: prioritize,
        icon: <ChevronDoubleIcon direction="up" className="w-5 h-auto mr-1" />,
      }
    }

    if (status === 'archived') {
      return {
        name: 'Reactivate',
        fn: prioritize,
        icon: <RefreshIcon className="w-5 h-auto mr-1" />,
      }
    }

    if (status === 'inactive') {
      return {
        name: 'Add to queue',
        fn: enablePromotion,
        icon: <PlusIcon className="w-5 h-auto mr-1" />,
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
            'border-b border-solid border-grey',
          ].join(' ')}
        >
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
  isLastPromotableNotRunPost: PropTypes.bool.isRequired,
}

export default PostCardActionsMenu
