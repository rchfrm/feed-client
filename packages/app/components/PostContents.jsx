import React from 'react'
import PropTypes from 'prop-types'

import PostImage from '@/app/PostImage'

import styles from '@/app/PostItem.module.css'

const PostContents = ({ media, thumbnailSrc, caption, className }) => {
  const [hasMedia, setHasMedia] = React.useState(true)
  React.useEffect(() => {
    setHasMedia(!!media)
  }, [media])

  return (
    <div
      className={[
        styles.postContents,
        styles.postSection,
        !hasMedia ? styles._noMedia : '',
        !caption ? styles._noCaption : '',
        className,
      ].join(' ')}
    >
      {hasMedia && (
        <div className={styles.postImageContainer}>
          <PostImage
            mediaSrc={media}
            thumbnailOptions={[thumbnailSrc]}
            title={caption}
            setHasMedia={setHasMedia}
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
