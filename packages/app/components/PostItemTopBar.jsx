import React from 'react'
import PropTypes from 'prop-types'

import PostMetaData from '@/app/PostMetaData'
import PostToggle from '@/app/PostToggle'
import PostToggleTooltip from '@/app/PostToggleTooltip'

import styles from '@/app/PostItem.module.css'


const PostItemTopBar = ({
  post,
  promotionEnabled,
  promotableStatus,
  togglePromotion,
  postPromotable,
  promotionStatus,
  debug,
}) => {
  return (
    <div className={[styles.topBar, styles.postSection, styles.postText].join(' ')}>
      <PostMetaData
        platform={post.platform}
        datePublished={post.publishedTime}
        permalink={post.permalinkUrl}
      />
      {/* TOGGLE BUTTON (if poss) */}
      {postPromotable && promotionStatus !== 'archived' && (
        <div className="flex items-center">
          <PostToggle
            post={post}
            togglePromotion={togglePromotion}
            promotionEnabled={promotionEnabled}
            promotableStatus={promotableStatus}
            debug={debug}
          />
          {/* TOOLTIP */}
          <PostToggleTooltip />
        </div>
      )}
    </div>
  )
}

PostItemTopBar.propTypes = {
  post: PropTypes.object.isRequired,
  promotionEnabled: PropTypes.bool.isRequired,
  promotableStatus: PropTypes.number.isRequired,
  togglePromotion: PropTypes.func.isRequired,
  postPromotable: PropTypes.bool,
  promotionStatus: PropTypes.string,
  debug: PropTypes.bool,
}

PostItemTopBar.defaultProps = {
  postPromotable: true,
  promotionStatus: '',
  debug: false,
}


export default PostItemTopBar
