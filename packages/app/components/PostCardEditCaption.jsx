import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import PostCardEditCaptionMessage from '@/app/PostCardEditCaptionMessage'
import PostCardEditCaptionAlert from '@/app/PostCardEditCaptionAlert'

import { updatePostCaption } from '@/app/helpers/postsHelpers'
import { track } from '@/app/helpers/trackingHelpers'

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
}) => {
  const {
    message,
    messageEdited = '',
  } = post

  // Internal state
  const captionTypes = ['ad', 'post']
  const [originalCaption] = React.useState(message)
  const [newCaption, setNewCaption] = React.useState(messageEdited)
  const [savedNewCaption, setSavedNewCaption] = React.useState(messageEdited)
  const [visibleCaption, setVisibleCaption] = React.useState('ad')
  const [useEditMode, setUseEditMode] = React.useState(false)

  // Turn off edit mode when moving to post view
  React.useEffect(() => {
    if (visibleCaption) setUseEditMode(false)
  }, [visibleCaption])

  // UPDATE LOCAL and POST PAGE STATE
  const updateState = React.useCallback((newCaption) => {
    const payload = { postIndex, newCaption }
    setSavedNewCaption(newCaption)
    setVisibleCaption('ad')
    updatePost('update-caption', payload)
  }, [postIndex, updatePost])

  // SAVE NEW CAPTION on DB
  const { artistId } = React.useContext(ArtistContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [showAlert, setShowAlert] = React.useState(false)
  const updatePostDb = React.useCallback(async (newCaption, forceRun = false) => {
    if (isLoading && !forceRun) return
    setIsLoading(true)
    // Stop here if a warning needs to be shown
    const shouldShowAlert = post.promotionStatus === 'active'
    if (shouldShowAlert && !forceRun) {
      setShowAlert(true)
      return
    }
    const { error } = await updatePostCaption(artistId, post.id, newCaption)
    setError(error)
    setShowAlert(false)
    if (!error) {
      updateState(newCaption)
    }
    setUseEditMode(false)
    setIsLoading(false)
    // TRACK
    track('edit_caption_complete', {
      postId: post.id,
      originalCaption,
      newCaption,
    })
  }, [isLoading, artistId, originalCaption, post.id, post.promotionStatus, updateState, setError])

  return (
    <div>
      <Error error={error} />
      {isEditable && (
        // TOGGLE CAPTION TYPE BUTTON
        <div className="flex items-center mb-3">
          {captionTypes.map((type) => {
            const isActive = type === visibleCaption
            return (
              <a
                key={type}
                role="button"
                className={[
                  'capitalize no-underline mr-4 last:mr-0',
                  isActive ? 'font-bold' : 'opacity-50 hover:opacity-100',
                  isLoading ? 'pointer-events-none' : null,
                ].join(' ')}
                onClick={() => {
                  if (isLoading) return
                  setVisibleCaption(type)
                }}
              >
                {type}
              </a>
            )
          })}
          {/* EDIT/SAVE BUTTON */}
          <Button
            label={useEditMode ? 'Save new caption' : 'Edit caption'}
            version="green x-small"
            className="ml-auto"
            loading={isLoading}
            disabled={visibleCaption === 'post'}
            onClick={() => {
              if (isLoading) return
              if (useEditMode) {
                updatePostDb(newCaption)
              } else {
                setUseEditMode(true)
                // TRACK
                track('edit_caption_start', {
                  postId: post.id,
                  originalCaption,
                })
              }
            }}
          >
            {useEditMode ? 'save' : 'edit'}
          </Button>
        </div>
      )}
      {/* CAPTION AND EDIT CAPTION */}
      <div
        className="bg-grey-1 p-4 rounded-dialogue"
        style={isLoading ? { opacity: 0.6 } : null}
      >
        {useEditMode ? (
          <PostCardEditCaptionMessage
            message={newCaption ?? originalCaption}
            setMessage={setNewCaption}
          />
        ) : (
          <MarkdownText
            markdown={visibleCaption === 'ad' ? savedNewCaption || originalCaption : originalCaption}
            className="mb-0"
          />
        )}
      </div>
      {/* ALERT */}
      <PostCardEditCaptionAlert
        postId={post.id}
        show={showAlert}
        newCaption={newCaption}
        originalCaption={originalCaption}
        updatePostDb={updatePostDb}
        onCancel={() => {
          setIsLoading(false)
          setUseEditMode(false)
          setShowAlert(false)
        }}
      />
    </div>
  )
}

PostCardEditCaption.propTypes = {
  post: PropTypes.object.isRequired,
  postIndex: PropTypes.number.isRequired,
  updatePost: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired,
}

PostCardEditCaption.defaultProps = {

}

export default PostCardEditCaption
