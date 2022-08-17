import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import produce from 'immer'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PostSettingsSaveButton from '@/app/PostSettingsSaveButton'
import PostCardEditCaptionMessage from '@/app/PostCardEditCaptionMessage'

import CheckboxInput from '@/elements/CheckboxInput'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import { getPostAdMessages, updatePostCaption, resetPostCaption } from '@/app/helpers/postsHelpers'

const getCaptionNotEditableReason = (post) => {
  const base = 'The caption is not editable because'

  if (post.postType === 'story') {
    return `${base} this is a story.`
  }

  if (post.postType === 'reels') {
    return `${base} this is a reel.`
  }

  return ''
}

const PostSettingsCaption = ({
  post,
  campaignType,
  updatePost,
  isDisabled,
}) => {
  const { id: postId } = post

  const [adMessages, setAdMessages] = React.useState(post.adMessages)
  const [currentAdMessage, setCurrentAdMessage] = React.useState({})
  const [caption, setCaption] = React.useState('')
  const [savedCaption, setSavedCaption] = React.useState('')

  const [isDefaultAdMessage, setIsDefaultAdMessage] = React.useState(true)
  const [shouldShowSaveButton, setShouldShowSaveButton] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)
  const noCaptionEditReason = getCaptionNotEditableReason(post)

  // Get post ad messages
  useAsyncEffect(async (isMounted) => {
    if (post.adMessages) return

    const { res: adMessages, error } = await getPostAdMessages(artistId, postId)
    if (!isMounted) return

    if (error) {
      setError(error)
      return
    }

    setAdMessages(adMessages)
    updatePost('update-ad-messages', { adMessages })
  }, [])

  const handleChange = () => {
    setIsDefaultAdMessage(!isDefaultAdMessage)

    if (!isDefaultAdMessage) {
      setShouldShowSaveButton(savedCaption !== post?.message)
    }

    if (isDefaultAdMessage) {
      setShouldShowSaveButton(savedCaption !== caption)
    }
  }

  const updatePostState = (adMessage) => {
    const caption = adMessage?.message || ''
    // Check if caption already exists for the selected campaign type
    const index = adMessages.findIndex(({ campaignType }) => campaignType === adMessage.campaignType)
    const updatedCaptions = produce(adMessages, draftState => {
      // If the caption exists, only update it's value
      if (index !== -1) {
        draftState[index].message = caption
        return
      }
      // An empty caption means we did a reset to the original, so remove it from the array
      if (!caption) {
        draftState.splice(index, 1)
        return
      }
      // Otherwise push the new caption object to the array
      draftState.push(adMessage)
    })

    setCurrentAdMessage(adMessage)
    setSavedCaption(adMessage?.message)
    setAdMessages(updatedCaptions)
    updatePost('update-ad-messages', { adMessages: updatedCaptions })
  }

  // Save current ad message and hide save button
  const save = async () => {
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

  // Watch for ad message changes and show save button if there has been a change
  React.useEffect(() => {
    const hasChanged = caption !== savedCaption

    setShouldShowSaveButton(hasChanged)
  }, [caption, savedCaption])

  // On initial mount and on campaign type change set the ad message
  React.useEffect(() => {
    if (!adMessages) return

    const postAdMessage = adMessages?.find((adMessage) => adMessage.campaignType === campaignType) || {}
    const adMessage = postAdMessage?.message || post?.message

    setCurrentAdMessage(postAdMessage)
    setCaption(adMessage)
    setSavedCaption(adMessage)

    if (adMessage !== post?.message) {
      setIsDefaultAdMessage(false)
    }
  }, [campaignType, adMessages, post?.message])

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
          onClick={save}
          shouldShow={shouldShowSaveButton}
          isLoading={isLoading}
        />
      </div>
      {!noCaptionEditReason ? (
        <CheckboxInput
          buttonLabel="Use original post caption"
          value="caption"
          checked={isDefaultAdMessage}
          onChange={handleChange}
          className="sm:pl-2"
          disabled={isDisabled}
        />
      ) : (
        <MarkdownText markdown={noCaptionEditReason} className={['sm:pl-4', isDisabled ? 'text-grey-2' : 'text-red'].join(' ')} />
      )}
      {(!isDefaultAdMessage || noCaptionEditReason) && (
        <div
          className="bg-grey-1 sm:ml-4 p-4 rounded-dialogue"
        >
          <PostCardEditCaptionMessage
            message={caption}
            setMessage={setCaption}
            hasAutoFocus={false}
            className={isDisabled || noCaptionEditReason ? 'text-grey-2 pointer-events-none' : null}
          />
        </div>
      )}
      <Error error={error} />
    </div>
  )
}

PostSettingsCaption.propTypes = {
  post: PropTypes.object.isRequired,
  campaignType: PropTypes.string.isRequired,
  updatePost: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
}

PostSettingsCaption.defaultProps = {
}

export default PostSettingsCaption
