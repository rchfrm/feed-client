import React from 'react'
import PropTypes from 'prop-types'

import Icon from '@/elements/Icon'
// IMPORT ASSETS
// IMPORT CONSTANTS
import brandColors from '@/constants/brandColors'

import styles from '@/app/PostItem.module.css'

const PostMetaData = ({
  platform,
  datePublished,
  permalink,
  className,
}) => {
  const { bg: color } = brandColors[platform]
  return (
    <p className={[styles.postMeta, className].join(' ')}>
      <a
        href={permalink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon
          version={platform}
          color={color}
          width="20"
        />
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
