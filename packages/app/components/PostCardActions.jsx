import React from 'react'
import PropTypes from 'prop-types'
import PostCardActionsButton from '@/app/PostCardActionsButton'
import PostCardActionsMenu from '@/app/PostCardActionsMenu'

const PostCardActions = ({
  post,
  index,
  status,
  setPosts,
  sortBy,
  setIsPostActionsOpen,
  isLastPromotableNotRunPost,
  setStatusToRefresh,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef(null)

  const close = React.useCallback(({ target }) => {
    if (! dropdownRef.current) {
      return
    }

    if (dropdownRef.current.contains(target)) {
      setIsPostActionsOpen(true)
      return
    }

    setIsOpen(false)
    setIsPostActionsOpen(false)
  }, [setIsPostActionsOpen])

  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', close)
      return
    }
    window.removeEventListener('click', close)

    return () => {
      window.removeEventListener('click', close)
    }
  }, [isOpen, close])

  return (
    <div className="absolute right-2 bottom-2 z-10" ref={dropdownRef}>
      <PostCardActionsButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {isOpen && (
        <PostCardActionsMenu
          post={post}
          index={index}
          status={status}
          setPosts={setPosts}
          sortBy={sortBy}
          setIsOpen={setIsOpen}
          isLastPromotableNotRunPost={isLastPromotableNotRunPost}
          setStatusToRefresh={setStatusToRefresh}
        />
      )}
    </div>
  )
}

PostCardActions.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  setPosts: PropTypes.func.isRequired,
  sortBy: PropTypes.array.isRequired,
  setIsPostActionsOpen: PropTypes.func.isRequired,
  isLastPromotableNotRunPost: PropTypes.bool.isRequired,
  setStatusToRefresh: PropTypes.func.isRequired,
}

export default PostCardActions
