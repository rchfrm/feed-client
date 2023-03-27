import React from 'react'
import PropTypes from 'prop-types'
import PostCardActionsButton from '@/app/PostCardActionsButton'
import PostCardActionsMenu from '@/app/PostCardActionsMenu'

const PostCardActions = ({
  post,
  index,
  status,
  setPosts,
  setIsPostActionsOpen,
  isLastPromotableNotRunPost,
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
          setIsOpen={setIsOpen}
          isLastPromotableNotRunPost={isLastPromotableNotRunPost}
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
  isLastPromotableNotRunPost: PropTypes.bool.isRequired,
}

export default PostCardActions
