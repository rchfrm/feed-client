import React from 'react'
import PropTypes from 'prop-types'

import Input from '@/landing/elements/Input'

const TextArea = (props) => {
  return (
    <Input El="textarea" version="textarea" {...props} />
  )
}

TextArea.propTypes = {
  className: PropTypes.string,
}

TextArea.defaultProps = {
  className: null,
}

export default TextArea
