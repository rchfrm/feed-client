import React from 'react'
import PropTypes from 'prop-types'

import PlatformIcon from '@/icons/PlatformIcon'

import styles from '@/app/PostItem.module.css'

const PostMetaData = ({
  platform,
  datePublished,
  permalink,
  className,
}) => {
  return (
    <p className={[styles.postMeta, className].join(' ')}>
      <a
        href={permalink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <PlatformIcon platform={platform} />
        {datePublished}
      </a>
    </p>
  )
}

PostMetaData.propTypes = {
  platform: PropTypes.string.isRequired,
  datePublished: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PostMetaData.defaultProps = {
  className: '',
}


export default PostMetaData
