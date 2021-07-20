import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PencilIcon from '@/icons/PencilIcon'
import Button from '@/elements/Button'
import CaptionText from '@/elements/CaptionText'
import Error from '@/elements/Error'

import PostCardEditCaptionMessage from '@/app/PostCardEditCaptionMessage'
import PostCardEditAlert from '@/app/PostCardEditAlert'

import { updatePostCaption, resetPostCaption } from '@/app/helpers/postsHelpers'
import { track } from '@/app/helpers/trackingHelpers'

import brandColors from '@/constants/brandColors'

const PostCardEditCaption = ({
  post, // NB: This does not update when the `posts` array in <PostsLoader /> updates
  postIndex,
  updatePost,
  isEditable,
}) => {
  // Internal state
  const [adMessageProps, setAdMessageProps] = React.useState(post.adMessageProps)
  const hasAdMessage = !!adMessageProps
  const adMessage = adMessageProps?.message || ''
  const captionTypes = ['ad', 'post']
  const [originalCaption] = React.useState(post.message)
  const [newCaption, setNewCaption] = React.useState(adMessage)
  const [savedNewCaption, setSavedNewCaption] = React.useState(adMessage)
  const [visibleCaption, setVisibleCaption] = React.useState('ad')
  const [useEditMode, setUseEditMode] = React.useState(false)

  // Turn off edit mode when moving to post view
  React.useEffect(() => {
    if (visibleCaption) setUseEditMode(false)
  }, [visibleCaption])

  // UPDATE LOCAL and PARENT POST PAGE STATE
  const updateState = React.useCallback((newAdMessageProps) => {
    const payload = { postIndex, adMessageProps: newAdMessageProps }
    const newCaption = newAdMessageProps?.message || ''
    // Local
    setAdMessageProps(newAdMessageProps)
    setNewCaption(newCaption)
    setSavedNewCaption(newCaption)
    setVisibleCaption('ad')
    // Parent
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
    const { res: updatedAdMessageProps = null, error } = await apiCallMethod({
      artistId,
      assetId: post.id,
      adMessageId,
      caption: newCaption,
    })
    // Handle response...
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
                  isActive ? 'font-bold border-solid border-black border-b-2' : 'opacity-50 hover:opacity-100',
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
          <div className="flex items-center ml-auto">
            {/* CANCEL BUTTON */}
            {useEditMode && (
              <a
                role="button"
                label="Cancel edit caption"
                className="no-underline mr-4"
                onClick={() => {
                  setUseEditMode(false)
                  track('edit_caption_cancel', {
                    postId: post.id,
                    originalCaption,
                  })
                }}
              >
                cancel
              </a>
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
            message={newCaption || originalCaption}
            setMessage={setNewCaption}
          />
        ) : (
          <CaptionText
            caption={visibleCaption === 'ad' ? savedNewCaption || originalCaption : originalCaption}
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
      <PostCardEditAlert
        type="caption"
        postId={post.id}
        show={showAlert}
        newValue={newCaption}
        originalValue={originalCaption}
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
