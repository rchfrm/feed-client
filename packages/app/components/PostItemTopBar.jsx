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
}) => {
  const toggleDisabled = !postPromotable || promotionStatus === 'archived'
  return (
    <div className={[styles.topBar, styles.postSection, styles.postText].join(' ')}>
      <PostMetaData
        platform={post.platform}
        datePublished={post.publishedTime}
        permalink={post.permalinkUrl}
      />
      {/* TOGGLE BUTTON (if poss) */}
      <div className="flex items-center">
        {/* TOOLTIP */}
        {!toggleDisabled && (
          <PostToggleTooltip promotionStatus={promotionStatus} />
        )}
        <PostToggle
          post={post}
          togglePromotion={togglePromotion}
          promotionEnabled={promotionEnabled}
          promotableStatus={promotableStatus}
          disabled={toggleDisabled}
        />
      </div>
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
}

PostItemTopBar.defaultProps = {
  postPromotable: true,
  promotionStatus: '',
}


export default PostItemTopBar
