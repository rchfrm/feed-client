import React from 'react'
import PropTypes from 'prop-types'
import ExpandIcon from '@/icons/ExpandIcon'
import CollapseIcon from '@/icons/CollapseIcon'
import { postsConfig } from '@/app/helpers/postsHelpers'
import brandColors from '@/constants/brandColors'

const PostsContainerButton = ({
  status,
  posts,
  isOpen,
  setIsOpen,
  isSpendingPaused,
}) => {
  const shouldShowPostsAmount = status === 'active' || status === 'rejected'
  const Icon = isOpen ? CollapseIcon : ExpandIcon

  const toggle = () => {
    setIsOpen((isOpen) => ! isOpen)
  }

  return (
    <button
      onClick={toggle}
      className={[
        'w-full flex justify-between items-center p-5',
        isOpen ? 'rounded-b-none' : null,
      ].join(' ')}
    >
      <h2 className="mb-0 mr-5">{shouldShowPostsAmount ? posts.length : null} {postsConfig[status].name}</h2>
      <Icon
        fillColor={isSpendingPaused ? brandColors.yellowBgDark : brandColors.white}
        borderColor={isSpendingPaused ? brandColors.yellowBorder : brandColors.black}
      />
    </button>
  )
}

PostsContainerButton.propTypes = {
  status: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  isSpendingPaused: PropTypes.bool,
}

PostsContainerButton.defaultProps = {
  isSpendingPaused: false,
}

export default PostsContainerButton
