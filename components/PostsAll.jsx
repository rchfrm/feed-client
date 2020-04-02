// IMPORT PACKAGES
import React from 'react'

import debounce from 'lodash/debounce'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import PageHeader from './PageHeader'
import LastItem from './elements/LastItem'
// IMPORT PAGES
import PostsSingle from './PostsSingle'
import PostsNone from './PostsNone'
// IMPORT ASSETS
import MarkdownText from './elements/MarkdownText'
import copy from '../copy/PostsPageCopy'
// IMPORT STYLES
import styles from './PostsPage.module.css'

// Reset posts scroll position
const resetScroll = () => {
  if (typeof document === 'undefined') return
  const scroller = document.getElementById('PostsAll__scroller')
  if (!scroller) return
  scroller.scrollLeft = 0
}

// Render list of posts and track the one that's currently visible
function PostsAll({
  posts,
  updateLink,
  togglePromotion,
  loadMorePosts,
}) {
  // HANDLE SCROLL
  const handleScroll = debounce(() => {
    const scroller = document.getElementById('PostsAll__scroller')
    const scrollerWidth = scroller.scrollWidth
    const scrollPosition = scroller.scrollLeft
    const scrollPercentage = scrollPosition / scrollerWidth
  }, 100)

  if (posts.length === 0) {
    return <PostsNone />
  }

  const postList = posts.map((post, index) => {
    return (
      <PostsSingle
        key={post.id}
        index={index}
        post={post}
        updateLink={updateLink}
        singular={posts.length === 1}
        togglePromotion={togglePromotion}
      />
    )
  })

  // Push the LastItem component to add blank space to the end of the list
  postList.push(LastItem())

  // Reset the scroll position when this component first mounts
  React.useEffect(resetScroll, [])

  return (
    <div className={styles['posts-section']}>

      <PageHeader heading="review your posts" punctuation="," />

      <MarkdownText className="ninety-wide  h4--text" markdown={copy.intro} />

      <ul
        id="PostsAll__scroller"
        className={`frame posts ${styles.posts}`}
      >
        {postList}
      </ul>

    </div>
  )
}

export default PostsAll
