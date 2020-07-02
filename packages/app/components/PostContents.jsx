import React from 'react'
import PropTypes from 'prop-types'

import PostImage from '@/app/PostImage'

import styles from '@/app/PostItem.module.css'

const PostContents = ({ media, thumbnailSrc, caption, className }) => {
  const [mediaClass] = React.useState(media ? '' : styles._noMedia)
  return (
    <div className={[styles.postContents, styles.postSection, className, mediaClass].join(' ')}>
      {media && (
        <div className={styles.postImageContainer}>
          <PostImage
            mediaSrc={media}
            thumbnailOptions={[thumbnailSrc]}
            title={caption}
          />
        </div>
      )}
      {caption && (
        <figcaption className={['small--p', styles.postCaption].join(' ')}>
          {caption}
        </figcaption>
      )}
    </div>
  )
}

PostContents.propTypes = {
  media: PropTypes.string,
  thumbnailSrc: PropTypes.string,
  caption: PropTypes.string,
  className: PropTypes.string,
}

PostContents.defaultProps = {
  media: '',
  thumbnailSrc: '',
  caption: '',
  className: '',
}


export default PostContents
