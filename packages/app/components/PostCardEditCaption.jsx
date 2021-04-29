import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PencilIcon from '@/icons/PencilIcon'
import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import PostCardEditCaptionMessage from '@/app/PostCardEditCaptionMessage'
import PostCardEditCaptionAlert from '@/app/PostCardEditCaptionAlert'

import { updatePostCaption, resetPostCaption } from '@/app/helpers/postsHelpers'
import { track } from '@/app/helpers/trackingHelpers'

import brandColors from '@/constants/brandColors'

const PostCardEditCaption = ({
  post,
  postIndex,
  updatePost,
  isEditable,
}) => {
  const {
    message,
    adMessageProps,
  } = post

  console.log('adMessageProps', adMessageProps)

  const hasAdMessage = !!adMessageProps
  const messageEdited = adMessageProps?.message || ''

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
  const updateState = React.useCallback((adMessageProps) => {
    const payload = { postIndex, adMessageProps }
    const newCaption = adMessageProps?.message || ''
    setSavedNewCaption(newCaption)
    setVisibleCaption('ad')
    updatePost('update-caption', payload)
  }, [postIndex, updatePost])

  // SAVE NEW CAPTION on DB
  const { artistId } = React.useContext(ArtistContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [showAlert, setShowAlert] = React.useState(false)
  const [onAlertConfirm, setOnAlertConfirm] = React.useState(() => () => {})
  const updatePostDb = React.useCallback(async (newCaption, forceRun = false) => {
    if (isLoading && !forceRun) return
    setIsLoading(true)
    // Stop here if a warning needs to be shown
    const shouldShowAlert = post.promotionStatus === 'active'
    if (shouldShowAlert && !forceRun) {
      // Set function to run when confirming alert
      setOnAlertConfirm(() => () => updatePostDb(newCaption, true))
      // Show alert
      setShowAlert(true)
      return
    }
    // Update the caption with the API
    const isResetCaption = newCaption === null
    const adMessageId = adMessageProps?.id
    const apiCallMethod = isResetCaption ? resetPostCaption : updatePostCaption
    const { res: updatedAdMessageProps, error } = await apiCallMethod({ artistId, assetId: post.id, adMessageId, caption: newCaption })
    console.log('res', updatedAdMessageProps)
    setError(error)
    setShowAlert(false)
    // Success!
    if (!error) {
      updateState(updatedAdMessageProps)
      // Track
      track('edit_caption_complete', {
        postId: post.id,
        originalCaption,
        newCaption,
      })
    }
    // Reset component state
    setUseEditMode(false)
    setIsLoading(false)
  }, [isLoading, artistId, originalCaption, post.id, post.promotionStatus, adMessageProps, updateState, setError])

  // RESET CAPTION TO ORIGINAL
  const resetToOriginal = React.useCallback(async () => {
    await updatePostDb(null)
  }, [updatePostDb])

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
          {/* ACTION BUTTONS */}
          <div className="flex ml-auto">
            {/* CANCEL BUTTON */}
            {useEditMode && (
              <Button
                label="Cancel edit caption"
                version="black x-small"
                className="w-20 mr-4"
                onClick={() => {
                  setUseEditMode(false)
                  track('edit_caption_cancel', {
                    postId: post.id,
                    originalCaption,
                  })
                }}
              >
                Cancel
              </Button>
            )}
            {/* EDIT/SAVE BUTTON */}
            <Button
              label={useEditMode ? 'Save new caption' : 'Edit caption'}
              version="green x-small"
              className="ml-auto w-20"
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
              {!useEditMode && (
                <PencilIcon fill={brandColors.bgColor} className="mr-1" style={{ height: '1rem' }} />
              )}
              {useEditMode ? 'Save' : 'Edit'}
            </Button>
          </div>
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
      {/* RESET BUTTON */}
      <p
        className="mb-0 text-sm text-right h-8"
      >
        {visibleCaption === 'ad' && hasAdMessage && (
          <a
            role="button"
            className="inline-block p-2 pl-0 no-underline text-grey-3 hover:text-black"
            onClick={(e) => {
              e.preventDefault()
              resetToOriginal()
            }}
          >
            Reset to original
          </a>
        )}
      </p>
      {/* ALERT */}
      <PostCardEditCaptionAlert
        postId={post.id}
        show={showAlert}
        newCaption={newCaption}
        originalCaption={originalCaption}
        onAlertConfirm={onAlertConfirm}
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
