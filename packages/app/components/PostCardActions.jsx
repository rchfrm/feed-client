import React from 'react'
import ThreeDotsIcon from '@/icons/ThreeDots'

const PostCardActions = () => {
  const handleClick = () => {
    // Open post actions menu
  }

  return (
    <button
      className={[
        'absolute right-2 bottom-2',
        'w-6 h-6 z-10',
        'flex justify-center items-center',
        'bg-grey-1 rounded-dialogue',
      ].join(' ')}
      onClick={handleClick}
    >
      <ThreeDotsIcon />
    </button>
  )
}

export default PostCardActions
