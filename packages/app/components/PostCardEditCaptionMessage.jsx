import React from 'react'
// import PropTypes from 'prop-types'

import TextareaAutosize from 'react-textarea-autosize'

const PostCardEditCaptionMessage = ({
  message,
  setMessage,
}) => {
  return (
    <div>
      <TextareaAutosize
        className="w-full"
        cacheMeasurements
        autoFocus
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
}

PostCardEditCaptionMessage.defaultProps = {

}

export default PostCardEditCaptionMessage
