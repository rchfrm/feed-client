import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

import Icon from '@/elements/Icon'
// IMPORT ASSETS
// IMPORT CONSTANTS
import brandColors from '@/constants/brandColors'

import styles from '@/app/PostItem.module.css'

import { dateToTimePassed } from '@/helpers/utils'

const PostMetaData = ({ platform, date, permalink, className }) => {
  const { bg: color } = brandColors[platform]
  const timeAgo = React.useMemo(() => {
    return dateToTimePassed(moment(date))
  }, [date])
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
        Posted {timeAgo}
      </a>
    </p>
  )
}

PostMetaData.propTypes = {
  platform: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PostMetaData.defaultProps = {
  className: '',
}


export default PostMetaData
