// IMPORT PACKAGES
import React from 'react'
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
  numberOfPosts,
  posts,
  updateLink,
  visiblePost,
  setVisiblePost,
  togglePromotion,
}) {
  // DEFINE POST DETAILS
  const initialPostTrackerState = {
    number: numberOfPosts,
    scroll: 0,
    width: 1 / numberOfPosts,
  }

  const postTrackerReducer = (postTrackerState, postTrackerAction) => {
    switch (postTrackerAction.type) {
      case 'set-scroll-position':
        return {
          ...postTrackerState,
          scroll: postTrackerAction.payload.scroll,
        }
      case 'posts-added':
        return {
          ...postTrackerState,
          number: postTrackerAction.payload.number,
          scroll: visiblePost * (1 / postTrackerAction.payload.number),
          width: 1 / postTrackerAction.payload.number,
        }
      default:
        throw new Error(`Unable to find ${postTrackerAction.type} in postTrackerReducer`)
    }
  }

  const [postTracker, setPostTracker] = React.useReducer(postTrackerReducer, initialPostTrackerState)

  // TRACK SCROLL POSITION AND UPDATE TILE DETAILS STATE ACCORDINGLY
  React.useEffect(() => {
    const currentTile = Math.floor((postTracker.scroll + postTracker.width / 2) / postTracker.width) + 1
    if (currentTile !== visiblePost) {
      setVisiblePost(currentTile)
    }
  }, [postTracker, visiblePost, setVisiblePost])


  // KEEP POST TRACKER IN SYNC WITH NUMBER OF POSTS SAVED TO STATE
  React.useEffect(() => {
    setPostTracker({
      type: 'posts-added',
      payload: {
        number: numberOfPosts,
      },
    })
  }, [numberOfPosts])

  // HANDLE SCROLL
  const handleScroll = () => {
    const scroller = document.getElementById('PostsAll__scroller')
    const scrollerWidth = scroller.scrollWidth
    const scrollPosition = scroller.scrollLeft
    const scrollPercentage = scrollPosition / scrollerWidth
    setPostTracker({
      type: 'set-scroll-position',
      payload: {
        scroll: scrollPercentage,
      },
    })
  }

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
        onScroll={handleScroll}
      >
        {postList}
      </ul>

    </div>
  )
}

export default PostsAll
