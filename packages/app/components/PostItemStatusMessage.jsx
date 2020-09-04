import React from 'react'
import PropTypes from 'prop-types'

import styles from '@/app/PostItem.module.css'

const PostItemStatusMessage = ({
  text,
  className,
}) => {
  return (
    <div
      className={[
        styles.postSection,
        styles.postUnpromotable,
        styles.postText,
        className,
      ].join(' ')}
      style={{ marginTop: -2 }}
    >
      <p style={{ transform: 'translateY(0.1em)' }}>
        <strong>{text}</strong>
      </p>
    </div>
  )
}

PostItemStatusMessage.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PostItemStatusMessage.defaultProps = {
  className: null,
}


export default PostItemStatusMessage
