import React from 'react'
import PropTypes from 'prop-types'

import PostImage from '@/PostImage'

import styles from '@/app/PostItem.module.css'

const PostItemContents = ({
  media,
  thumbnailSrc,
  caption,
  captionFull,
  className,
}) => {
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
        'pt-6 xxs:pt-0',
      ].join(' ')}
    >
      {hasMedia && (
        <div className={styles.postImageContainer}>
          <PostImage
            mediaSrc={media}
            thumbnailOptions={[thumbnailSrc]}
            title={captionFull || caption}
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

PostItemContents.propTypes = {
  media: PropTypes.string,
  thumbnailSrc: PropTypes.string,
  caption: PropTypes.string,
  captionFull: PropTypes.string,
  className: PropTypes.string,
}

PostItemContents.defaultProps = {
  media: '',
  thumbnailSrc: '',
  caption: '',
  captionFull: '',
  className: '',
}


export default PostItemContents
