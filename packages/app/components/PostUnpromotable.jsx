import React from 'react'

import styles from '@/app/PostItem.module.css'

const PostUnpromotable = () => {
  return (
    <div className={[styles.postSection, styles.postUnpromotable].join(' ')}>
      <p>Post not promotable</p>
    </div>
  )
}

export default PostUnpromotable
