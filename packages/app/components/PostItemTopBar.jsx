import React from 'react'
import PropTypes from 'prop-types'

import PostMetaData from '@/app/PostMetaData'
import PostToggle from '@/app/PostToggle'
import PostToggleTooltip from '@/app/PostToggleTooltip'

import styles from '@/app/PostItem.module.css'


const PostItemTopBar = ({ post, togglePromotion, postPromotable }) => {
  return (
    <div className={[styles.topBar, styles.postSection].join(' ')}>
      <PostMetaData
        platform={post.platform}
        date={post.published_time}
        permalink={post.permalink_url}
      />
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
