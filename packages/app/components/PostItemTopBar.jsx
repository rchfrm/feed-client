import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
import ButtonTooltip from '@/elements/ButtonTooltip'
import PostMetaData from '@/app/PostMetaData'
import PostToggle from '@/app/PostToggle'

import styles from '@/app/PostItem.module.css'

import copy from '@/app/copy/PostsPageCopy'


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
        <ButtonTooltip
          buttonClasses="ml-1 -mr-4"
          containerStyle={{
            zIndex: 3,
          }}
        >
          <MarkdownText markdown={copy.toggleTooltip} />
        </ButtonTooltip>
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
