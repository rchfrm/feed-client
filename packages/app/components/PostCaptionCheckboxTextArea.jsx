import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import CheckboxInput from '@/elements/CheckboxInput'
import TextareaAutosize from 'react-textarea-autosize'
import MarkdownText from '@/elements/MarkdownText'
import { getPostAdMessages } from '@/app/helpers/postsHelpers'
import copy from '@/app/copy/PostsPageCopy'

const PostCaptionCheckboxTextArea = ({
  post,
  campaignType,
  adMessages,
  setAdMessages,
  caption,
  setCaption,
  updatePost,
  setSavedCaption,
  setCurrentAdMessage,
  isDefaultAdMessage,
  setIsDefaultAdMessage,
  setError,
  isDisabled,
}) => {
  const { id: postId } = post
  const { artistId } = React.useContext(ArtistContext)
  const noCaptionEditReason = copy.captionNotEditableReason(post)

  useAsyncEffect(async (isMounted) => {
    if (post.adMessages) {
      return
    }

    const { res: adMessages, error } = await getPostAdMessages(artistId, postId)
    if (! isMounted) {
      return
    }

    if (error) {
      setError(error)
      return
    }

    if (! adMessages.length) {
      return
    }

    setAdMessages(adMessages)
    updatePost({
      type: 'update-ad-messages',
      payload: {
        postId,
        adMessages,
      },
    })
  }, [])

  const handleChange = () => {
    setIsDefaultAdMessage(! isDefaultAdMessage)
  }

  React.useEffect(() => {
    if (! adMessages) {
      return
    }

    const postAdMessage = adMessages?.find((adMessage) => adMessage.campaignType === campaignType) || {}
    const adMessage = postAdMessage?.message || post?.message

    setCurrentAdMessage(postAdMessage)
    setCaption(adMessage)
    setSavedCaption(adMessage)

    if (adMessage !== post?.message) {
      setIsDefaultAdMessage(false)
    }
  }, [campaignType, adMessages, post?.message, setSavedCaption, setCurrentAdMessage, setIsDefaultAdMessage, setCaption])

  return (
    <>
      {! noCaptionEditReason ? (
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
      {(! isDefaultAdMessage || noCaptionEditReason) && (
        <div className="bg-grey-1 sm:ml-4 p-4 rounded-dialogue">
          <TextareaAutosize
            cacheMeasurements
            maxRows={8}
            value={caption}
            onChange={({ target: { value } }) => {
              setCaption(value)
            }}
            className={[
              'w-full',
              isDisabled || noCaptionEditReason ? 'text-grey-2 pointer-events-none' : null,
            ].join(' ')}
          />
        </div>
      )}
    </>
  )
}

PostCaptionCheckboxTextArea.propTypes = {
  post: PropTypes.object.isRequired,
  campaignType: PropTypes.string.isRequired,
  adMessages: PropTypes.array,
  setAdMessages: PropTypes.func.isRequired,
  caption: PropTypes.string.isRequired,
  setCaption: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  setSavedCaption: PropTypes.func.isRequired,
  setCurrentAdMessage: PropTypes.func.isRequired,
  isDefaultAdMessage: PropTypes.bool.isRequired,
  setIsDefaultAdMessage: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
}

PostCaptionCheckboxTextArea.defaultProps = {
  adMessages: [],
}

export default PostCaptionCheckboxTextArea
