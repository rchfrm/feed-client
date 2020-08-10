import React from 'react'
import PropTypes from 'prop-types'

import PostMetaData from '@/app/PostMetaData'
import PostToggle from '@/app/PostToggle'
import PostToggleTooltip from '@/app/PostToggleTooltip'
import PostItemStatusBadge from '@/app/PostItemStatusBadge'

import styles from '@/app/PostItem.module.css'


const PostItemTopBar = ({ post, togglePromotion, postPromotable }) => {
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
        className={styles.statusBadge}
        status={post.promotion_status}
      />
    </div>
  )
}

PostItemTopBar.propTypes = {
  post: PropTypes.object.isRequired,
  togglePromotion: PropTypes.func.isRequired,
  postPromotable: PropTypes.bool,
}

PostItemTopBar.defaultProps = {
  postPromotable: true,
}


export default PostItemTopBar
