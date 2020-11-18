import React from 'react'
import PropTypes from 'prop-types'

import styles from '@/app/PostItem.module.css'

const PostItemStatusMessage = ({
  text,
  onClick,
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
        {onClick ? (
          <a
            role="button"
            onClick={onClick}
            style={{ color: 'inherit' }}
          >
            <strong>{text}</strong>
          </a>
        ) : (
          <strong>{text}</strong>
        )}
      </p>
    </div>
  )
}

PostItemStatusMessage.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

PostItemStatusMessage.defaultProps = {
  onClick: null,
  className: null,
}


export default PostItemStatusMessage
