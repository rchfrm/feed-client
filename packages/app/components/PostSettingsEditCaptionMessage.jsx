import React from 'react'
import PropTypes from 'prop-types'
import TextareaAutosize from 'react-textarea-autosize'

const PostSettingsEditCaptionMessage = ({
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

PostSettingsEditCaptionMessage.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  hasAutoFocus: PropTypes.bool,
  className: PropTypes.string,
}

PostSettingsEditCaptionMessage.defaultProps = {
  hasAutoFocus: true,
  className: null,
}

export default PostSettingsEditCaptionMessage
