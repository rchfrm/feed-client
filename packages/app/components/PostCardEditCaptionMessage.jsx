import React from 'react'
import PropTypes from 'prop-types'

import TextareaAutosize from 'react-textarea-autosize'

const PostCardEditCaptionMessage = ({
  message,
  setMessage,
  hasAutoFocus,
  className,
}) => {
  return (
    <div>
      <TextareaAutosize
        className={['w-full', className].join(' ')}
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
  className: PropTypes.string,
}

PostCardEditCaptionMessage.defaultProps = {
  hasAutoFocus: true,
  className: null,
}

export default PostCardEditCaptionMessage
