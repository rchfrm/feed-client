import React from 'react'
import PropTypes from 'prop-types'

import PostImage from '@/PostImage'

import styles from '@/PostItem.module.css'

const PostContents = ({ media, thumbnailSrc, caption, className }) => {
  return (
    <div className={[styles.postContents, styles.postSection, className].join(' ')}>
      <div className={styles.postImageContainer}>
        <PostImage
          mediaSrc={media}
          thumbnailSrc={thumbnailSrc}
          title={caption}
        />
      </div>
      {caption && (
        <figcaption className={styles.postCaption}>
          {caption}
        </figcaption>
      )}
    </div>
  )
}

PostContents.propTypes = {
  media: PropTypes.object.isRequired,
  thumbnailSrc: PropTypes.string,
  caption: PropTypes.string,
  className: PropTypes.string,
}

PostContents.defaultProps = {
  thumbnailSrc: '',
  caption: '',
  className: '',
}


export default PostContents
