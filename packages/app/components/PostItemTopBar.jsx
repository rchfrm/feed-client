import React from 'react'
import PropTypes from 'prop-types'

import PostMetaData from '@/app/PostMetaData'
import PostToggle from '@/app/PostToggle'
import PostToggleTooltip from '@/app/PostToggleTooltip'
import PostItemStatusBadge from '@/app/PostItemStatusBadge'

import styles from '@/app/PostItem.module.css'


const PostItemTopBar = ({ post, togglePromotion, postPromotable, promotionStatus }) => {
  return (
    <div className={[styles.topBar, styles.postSection, styles.postText].join(' ')}>
      <PostMetaData
        platform={post.platform}
        date={post.published_time}
        permalink={post.permalink_url}
      />
      {/* TOGGLE BUTTON (if poss) */}
      {postPromotable && (
        <div className="flex">
          <PostToggle
            post={post}
            togglePromotion={togglePromotion}
            promotionEnabled={post.promotion_enabled}
          />
          {/* TOOLTIP */}
          <PostToggleTooltip />
        </div>
      )}
      {/* STATUS */}
      <PostItemStatusBadge
        status={promotionStatus}
        className={styles.statusBadge}
      />
    </div>
  )
}

PostItemTopBar.propTypes = {
  post: PropTypes.object.isRequired,
  togglePromotion: PropTypes.func.isRequired,
  postPromotable: PropTypes.bool,
  promotionStatus: PropTypes.string,
}

PostItemTopBar.defaultProps = {
  postPromotable: true,
  promotionStatus: '',
}


export default PostItemTopBar
