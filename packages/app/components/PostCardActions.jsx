import React from 'react'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import usePostsSidePanel from '@/app/hooks/usePostsSidePanel'
import ThreeDotsIcon from '@/icons/ThreeDots'
import Dropdown from '@/app/Dropdown'
import { postsSections } from '@/app/helpers/postsHelpers'

const PostCardActions = ({ post, index, section, action }) => {
  const { goToPostSettings, goToPostMetrics } = usePostsSidePanel()
  const { artistId } = React.useContext(ArtistContext)

  const handleClick = (type) => {
    if (type === 'settings') {
      goToPostSettings({
        post,
        postIndex: index,
        artistId,
      })

      return
    }

    if (type === 'details') {
      const metrics = {
        organic: post.organicMetrics,
        paid: post.paidMetrics,
      }

      const { postType } = post
      goToPostMetrics({ metrics, postType })
      goToPostMetrics()

      return
    }

    action()
  }

  return (
    <Dropdown
      items={[postsSections[section].action, 'settings', 'details']}
      handleItemClick={handleClick}
      className="absolute right-2 bottom-2 z-10"
      buttonClassName="w-6 h-6 flex justify-center items-center bg-grey-1 rounded-dialogue"
    >
      <ThreeDotsIcon />
    </Dropdown>
  )
}

export default PostCardActions
