import React from 'react'
import ThreeDotsIcon from '@/icons/ThreeDots'
import Dropdown from '@/app/Dropdown'

const PostCardActions = () => {
  const handleClick = () => {
    // Open post actions menu
  }

  return (
    <Dropdown
      items={['View results', 'Settings', 'Details']}
      handleItemClick={handleClick}
      className="absolute right-2 bottom-2 z-10"
      buttonClassName="w-6 h-6 flex justify-center items-center bg-grey-1 rounded-dialogue"
    >
      <ThreeDotsIcon />
    </Dropdown>
  )
}

export default PostCardActions
