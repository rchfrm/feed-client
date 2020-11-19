import React from 'react'
import PropTypes from 'prop-types'

import PostImage from '@/PostImage'
import PostItemStatusBadge from '@/app/PostItemStatusBadge'

import styles from '@/app/PostItem.module.css'

const PostItemContents = ({
  media,
  thumbnails,
  caption,
  captionFull,
  promotionStatus,
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
      ].join(' ')}
    >
      {/* STATUS */}
      <PostItemStatusBadge
        status={promotionStatus}
        className={styles.statusBadge}
      />
      {hasMedia && (
        <div className={styles.postImageContainer}>
          <PostImage
            mediaSrc={media}
            thumbnailOptions={thumbnails}
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
      {/* PLACEHOLDER for no media or caption */}
      {!hasMedia && !caption && (
        <div className={styles.postImageContainer}>
          <div className="w-full" style={{ paddingBottom: '100%' }} />
        </div>
      )}
    </div>
  )
}

PostItemContents.propTypes = {
  media: PropTypes.string,
  thumbnails: PropTypes.array,
  caption: PropTypes.string,
  captionFull: PropTypes.string,
  promotionStatus: PropTypes.string,
  className: PropTypes.string,
}

PostItemContents.defaultProps = {
  media: '',
  thumbnails: [],
  caption: '',
  captionFull: '',
  promotionStatus: '',
  className: null,
}


export default PostItemContents
