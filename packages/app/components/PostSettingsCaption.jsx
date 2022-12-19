import React from 'react'
import PropTypes from 'prop-types'
import produce from 'immer'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import PostSettingsSaveButton from '@/app/PostSettingsSaveButton'
import PostCaptionCheckboxTextArea from '@/app/PostCaptionCheckboxTextArea'
import PostSettingsEditAlert from '@/app/PostSettingsEditAlert'
import Error from '@/elements/Error'
import { updatePostCaption, resetPostCaption } from '@/app/helpers/postsHelpers'

const PostSettingsCaption = ({
  post,
  campaignType,
  updatePost,
  isDisabled,
}) => {
  const { id: postId, promotionStatus } = post
  const isPostActive = promotionStatus === 'active'

  const [adMessages, setAdMessages] = React.useState(post?.adMessages || [])
  const [currentAdMessage, setCurrentAdMessage] = React.useState({})
  const [caption, setCaption] = React.useState('')
  const [savedCaption, setSavedCaption] = React.useState('')

  const [isDefaultAdMessage, setIsDefaultAdMessage] = React.useState(true)
  const [shouldShowSaveButton, setShouldShowSaveButton] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [shouldShowAlert, setShouldShowAlert] = React.useState(false)
  const [onAlertConfirm, setOnAlertConfirm] = React.useState(() => () => {})

  const { artistId } = React.useContext(ArtistContext)

  const updatePostState = (adMessage) => {
    const caption = adMessage?.message || ''
    // Check if caption already exists for the selected campaign type
    const index = adMessages.findIndex(({ campaignType }) => campaignType === adMessage.campaignType)
    const updatedCaptions = produce(adMessages, (draftState) => {
      // If the caption exists, only update it's value
      if (index !== -1) {
        draftState[index].message = caption
        return
      }
      // An empty caption means we did a reset to the original, so remove it from the array
      if (! caption) {
        draftState.splice(index, 1)
        return
      }
      // Otherwise push the new caption object to the array
      draftState.push(adMessage)
    })

    setCurrentAdMessage(adMessage)
    setSavedCaption(adMessage?.message)
    setAdMessages(updatedCaptions)
    updatePost({
      type: 'update-ad-messages',
      payload: {
        postId,
        adMessages: updatedCaptions,
      },
    })
  }

  const save = async (forceRun = false) => {
    if (isPostActive && ! forceRun) {
      setOnAlertConfirm(() => () => save(true))
      setShouldShowAlert(true)

      return
    }

    setIsLoading(true)

    const isResetCaption = caption === null
    const action = isResetCaption ? resetPostCaption : updatePostCaption

    const { res: adMessage, error } = await action({
      artistId,
      assetId: postId,
      adMessageId: currentAdMessage.id,
      campaignType,
      caption: isDefaultAdMessage ? post?.message : caption,
    })

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setShouldShowSaveButton(false)
    updatePostState(adMessage)
    setIsLoading(false)
  }

  React.useEffect(() => {
    if (isDefaultAdMessage) {
      setShouldShowSaveButton(savedCaption !== post?.message)
    }

    if (! isDefaultAdMessage) {
      setShouldShowSaveButton(savedCaption !== caption)
    }
  }, [isDefaultAdMessage, caption, savedCaption, post?.message])

  return (
    <div className="mb-10">
      <div className="flex justify-between">
        <p className={[
          'text-lg font-bold',
          isDisabled ? 'text-grey-2' : null,
        ].join(' ')}
        >
          Caption
        </p>
        <PostSettingsSaveButton
          onClick={() => save()}
          shouldShow={shouldShowSaveButton}
          isLoading={isLoading}
        />
      </div>
      <PostCaptionCheckboxTextArea
        post={post}
        campaignType={campaignType}
        adMessages={adMessages}
        setAdMessages={setAdMessages}
        caption={caption}
        setCaption={setCaption}
        updatePost={updatePost}
        setSavedCaption={setSavedCaption}
        setCurrentAdMessage={setCurrentAdMessage}
        isDefaultAdMessage={isDefaultAdMessage}
        setIsDefaultAdMessage={setIsDefaultAdMessage}
        setError={setError}
        isDisabled={isDisabled}
      />
      <Error error={error} />
      <PostSettingsEditAlert
        type="caption"
        shouldShowAlert={shouldShowAlert}
        onConfirm={() => {
          onAlertConfirm()
          setShouldShowAlert(false)
        }}
        onCancel={() => setShouldShowAlert(false)}
      />
    </div>
  )
}

PostSettingsCaption.propTypes = {
  post: PropTypes.object.isRequired,
  campaignType: PropTypes.string.isRequired,
  updatePost: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
}

export default PostSettingsCaption
