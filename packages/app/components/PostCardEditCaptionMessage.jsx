import React from 'react'
import PropTypes from 'prop-types'

import TextareaAutosize from 'react-textarea-autosize'

const PostCardEditCaptionMessage = ({
  message,
  setMessage,
  hasAutoFocus,
}) => {
  return (
    <div>
      <TextareaAutosize
        className="w-full"
        cacheMeasurements
        autoFocus={hasAutoFocus}
        maxRows={8}
        value={message}
        onChange={({ target: { value } }) => {
          setMessage(value)
        }}
      />
    </div>
  )
}

PostCardEditCaptionMessage.propTypes = {
  hasAutoFocus: PropTypes.bool,
}

PostCardEditCaptionMessage.defaultProps = {
  hasAutoFocus: true,
}

export default PostCardEditCaptionMessage
