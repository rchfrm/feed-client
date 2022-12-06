import React from 'react'
import ChevronIcon from '@/icons/ChevronIcon'

const PostsPagination = () => {
  const handleClick = () => {
    return true
  }

  return (
    <div className="flex items-center">
      <button
        onClick={handleClick}
      >
        <ChevronIcon direction="left" className="h-3 mr-1" />
      </button>
      <div className="text-xs">Showing <span className="font-bold">5</span> of 10</div>
      <button
        onClick={handleClick}
      >
        <ChevronIcon className="h-3 ml-1" />
      </button>
    </div>
  )
}

export default PostsPagination
