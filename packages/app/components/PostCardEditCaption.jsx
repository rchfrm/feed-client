import React from 'react'
import PropTypes from 'prop-types'

const PostCardEditCaption = ({
  post,
  postIndex,
  updatePost,
  isEditable,
  setError,
}) => {
  console.log('post', post)
  const {
    message,
    messageEdited,
    postPromotable,
    promotionStatus,
  } = post
  const shouldShowAlert = promotionStatus === 'active'

  const updateMessageState = React.useCallback(({ postIndex, newMessage }) => {
    const payload = { postIndex, newMessage }
    updatePost('update-caption', payload)
  }, [updatePost])

  return (
    <div>
      {isEditable && (
        <p>Edittable</p>
      )}
      <div className="bg-grey-1 p-4">
        {post.message}
      </div>
    </div>
  )
}

PostCardEditCaption.propTypes = {
  post: PropTypes.object.isRequired,
  postIndex: PropTypes.number.isRequired,
  updatePost: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
}

PostCardEditCaption.defaultProps = {

}

export default PostCardEditCaption
