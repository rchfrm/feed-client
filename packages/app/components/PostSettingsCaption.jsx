import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import produce from 'immer'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PostCardEditCaptionMessage from '@/app/PostCardEditCaptionMessage'

import CheckboxInput from '@/elements/CheckboxInput'
import Button from '@/elements/Button'
import Error from '@/elements/Error'

import { getPostAdMessages, updatePostCaption, resetPostCaption } from '@/app/helpers/postsHelpers'

const PostSettingsAdMessage = ({
  post,
  campaignType,
  updatePost,
}) => {
  const { id: postId } = post

  const [adMessages, setAdMessages] = React.useState(post.adMessages)
  const [currentAdMessage, setCurrentAdMessage] = React.useState({})
  const [caption, setCaption] = React.useState('')
  const [savedCaption, setSavedCaption] = React.useState('')

  const [isDefaultAdMessage, setIsDefaultAdMessage] = React.useState(true)
  const [shouldShowSaveButton, setShouldShowSaveButton] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)

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

    // On check set caption equal to original post message
    if (!isDefaultAdMessage) {
      setCaption(post?.message)
    } else {
      setCaption(currentAdMessage.message || '')
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
    updatePost('update-ad-messages', { adMessages: updatedCaptions })
  }

  // Save current ad message and hide save button
  const save = async () => {
    const isResetCaption = caption === null
    const action = isResetCaption ? resetPostCaption : updatePostCaption

    const { res: adMessage, error } = await action({
      artistId,
      assetId: postId,
      adMessageId: currentAdMessage.id,
      campaignType,
      caption,
    })

    if (error) {
      setError(error)
      return
    }

    setShouldShowSaveButton(false)
    updatePostState(adMessage)
  }

  // Watch for ad message changes and show save button if there has been a change
  React.useEffect(() => {
    const hasChanged = caption !== savedCaption

    setShouldShowSaveButton(hasChanged)
  }, [caption, savedCaption])

  // On initial mount and on campaign type change set the ad message
  React.useEffect(() => {
    if (!adMessages) return

    const adMessage = adMessages?.find((callToAction) => callToAction.campaignType === campaignType) || {}

    setCurrentAdMessage(adMessage)
    setCaption(adMessage?.message || '')
    setSavedCaption(adMessage?.message || '')

    if (adMessage?.message && adMessage?.message !== post?.message) {
      setIsDefaultAdMessage(false)
    }
  }, [campaignType, adMessages, post?.message])

  return (
    <div className="mb-10">
      <div className="flex justify-between">
        <p className="text-lg font-bold">Caption</p>
        {shouldShowSaveButton && (
          <Button
            version="green small"
            className={[
              'h-8',
              'rounded-full',
            ].join(' ')}
            onClick={save}
            trackComponentName="PostSettings"
          >
            Save
          </Button>
        )}
      </div>
      <CheckboxInput
        buttonLabel="Use original post caption"
        value="caption"
        checked={isDefaultAdMessage}
        onChange={handleChange}
        className="sm:pl-2"
      />
      {!isDefaultAdMessage && (
        <div
          className="bg-grey-1 sm:ml-4 p-4 rounded-dialogue"
        >
          <PostCardEditCaptionMessage
            message={caption || post.message}
            setMessage={setCaption}
            hasAutoFocus={false}
          />
        </div>
      )}
      <Error error={error} />
    </div>
  )
}

PostSettingsAdMessage.propTypes = {
  post: PropTypes.object.isRequired,
  campaignType: PropTypes.string.isRequired,
  updatePost: PropTypes.func.isRequired,
}

PostSettingsAdMessage.defaultProps = {
}

export default PostSettingsAdMessage
