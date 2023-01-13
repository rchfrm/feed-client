import React from 'react'
import PropTypes from 'prop-types'
import ThreeDotsIcon from '@/icons/ThreeDots'

const PostCardActionsButton = ({ isOpen, setIsOpen }) => {
  const handleClick = () => {
    setIsOpen(! isOpen)
  }

  return (
    <button
      onClick={handleClick}
      className={[
        'w-6 h-6',
        'flex justify-center items-center',
        'bg-grey-1 rounded-dialogue',
      ].join(' ')}
    >
      <ThreeDotsIcon />
    </button>
  )
}

PostCardActionsButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

export default PostCardActionsButton
