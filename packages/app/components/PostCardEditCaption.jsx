import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import PostCardEditCaptionMessage from '@/app/PostCardEditCaptionMessage'

import { updatePostCaption } from '@/app/helpers/postsHelpers'

const showEditSaveButtonTest = (visibleCaption, savedNewCaption) => {
  if (visibleCaption === 'ad') return true
  if (visibleCaption === 'post' && !savedNewCaption) return true
  return false
}

const PostCardEditCaption = ({
  post,
  postIndex,
  updatePost,
  isEditable,
  setError,
}) => {
  const {
    message,
    messageEdited = '',
    promotionStatus,
  } = post

  const shouldShowAlert = promotionStatus === 'active'

  // Internal state
  const captionTypes = ['ad', 'post']
  const [originalCaption] = React.useState(message)
  const [newCaption, setNewCaption] = React.useState(messageEdited)
  const [savedNewCaption, setSavedNewCaption] = React.useState(messageEdited)
  const [visibleCaption, setVisibleCaption] = React.useState(newCaption ? 'ad' : 'post')
  const [showEditSaveButton, setShowEditSaveButton] = React.useState(showEditSaveButtonTest(visibleCaption, savedNewCaption))
  const [useEditMode, setUseEditMode] = React.useState(false)
  React.useEffect(() => {
    const showEditSaveButton = showEditSaveButtonTest(visibleCaption, savedNewCaption)
    setShowEditSaveButton(showEditSaveButton)
  }, [visibleCaption, savedNewCaption])

  // Update post page state
  const updateMessageState = React.useCallback((newCaption) => {
    const payload = { postIndex, newCaption }
    setSavedNewCaption(newCaption)
    setVisibleCaption('ad')
    updatePost('update-caption', payload)
  }, [postIndex, updatePost])

  // SAVE NEW CAPTION on DB
  const { artistId } = React.useContext(ArtistContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const updatePostDb = React.useCallback(async (newCaption) => {
    setIsLoading(true)
    const { res, error } = await updatePostCaption(artistId, post.id, newCaption)
    console.log('res', res)
    setError(error)
    if (!error) {
      updateMessageState(newCaption)
    }
    setUseEditMode(false)
    setIsLoading(false)
  }, [artistId, post.id, updateMessageState, setError])

  return (
    <div>
      {isEditable && (
        <div className="flex items-center mb-3 h-8">
          {captionTypes.map((type) => {
            if (type === 'ad' && !savedNewCaption) return null
            const isActive = type === visibleCaption
            return (
              <a
                key={type}
                role="button"
                className={[
                  'capitalize no-underline mr-4 last:mr-0',
                  isActive ? 'font-bold' : 'opacity-50 hover:opacity-100',
                ].join(' ')}
                onClick={() => {
                  setVisibleCaption(type)
                }}
              >
                {type}
              </a>
            )
          })}
          {showEditSaveButton && (
            <Button
              label={useEditMode ? 'Save new caption' : 'Edit caption'}
              version="green x-small"
              className="ml-auto"
              loading={isLoading}
              onClick={() => {
                if (useEditMode) {
                  updatePostDb(newCaption)
                } else {
                  setUseEditMode(true)
                }
              }}
            >
              {useEditMode ? 'save' : 'edit'}
            </Button>
          )}
        </div>
      )}
      <div className="bg-grey-1 p-4 rounded-dialogue">
        {useEditMode ? (
          <PostCardEditCaptionMessage
            message={newCaption || originalCaption}
            setMessage={setNewCaption}
          />
        ) : (
          <MarkdownText
            markdown={visibleCaption === 'ad' ? savedNewCaption : originalCaption}
            className="mb-0"
          />
        )}
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
