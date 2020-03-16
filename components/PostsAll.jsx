// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import PageHeader from './PageHeader'
import Feed from './elements/Feed'
import LastItem from './elements/LastItem'
// IMPORT PAGES
import PostsSingle from './PostsSingle'
import PostsNone from './PostsNone'
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES
import styles from './PostsPage.module.css'

// Render list of posts and track the one that's currently visible
function Posts({
  numberOfPosts,
  posts,
  setPosts,
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
  // END DEFINE TILE DETAILS

  // TRACK SCROLL POSITION AND UPDATE TILE DETAILS STATE ACCORDINGLY
  React.useEffect(() => {
    const currentTile = Math.floor((postTracker.scroll + postTracker.width / 2) / postTracker.width) + 1
    if (currentTile !== visiblePost) {
      setVisiblePost(currentTile)
    }
  }, [postTracker, visiblePost, setVisiblePost])
  // END TRACK SCROLL POSITION AND UPDATE TILE DETAILS STATE ACCORDINGLY


  // KEEP POST TRACKER IN SYNC WITH NUMBER OF POSTS SAVED TO STATE
  React.useEffect(() => {
    setPostTracker({
      type: 'posts-added',
      payload: {
        number: numberOfPosts,
      },
    })
  }, [numberOfPosts])
  // END KEEP POST TRACKER IN SYNC WITH NUMBER OF POSTS SAVED TO STATE

  // HANDLE SCROLL
  const handleScroll = () => {
    const frame = document.getElementsByClassName('frame')[0]
    const frameWidth = frame.scrollWidth
    const scrollPosition = frame.scrollLeft
    const scrollPercentage = scrollPosition / frameWidth
    setPostTracker({
      type: 'set-scroll-position',
      payload: {
        scroll: scrollPercentage,
      },
    })
  }
  // END HANDLE SCROLL

  if (posts.length === 0) {
    return <PostsNone />
  }

  return (
    <div className={styles['posts-section']}>

      <PageHeader heading="review your posts" punctuation="," />

      <h4 className={styles.h4}>
        Below are your most recent posts.
        {' '}
        <Feed />
        {' '}
        works best if they're all selected, but if there are any you'd rather not promote just untick them.
      </h4>

      <PostList
        posts={posts}
        setPosts={setPosts}
        togglePromotion={togglePromotion}
        handleScroll={handleScroll}
      />

    </div>
  )
}

export default Posts

function PostList({ posts, setPosts, togglePromotion, handleScroll }) {
  // CREATE ARRAY OF POSTS
  const postList = posts.map((post, index) => {
    return (
      <PostsSingle
        key={post.id}
        index={index}
        post={post}
        setPosts={setPosts}
        singular={posts.length === 1}
        togglePromotion={togglePromotion}
      />
    )
  })
  // Push the LastItem component to add blank space to the end of the list
  postList.push(LastItem())
  // END CREATE ARRAY OF POSTS

  return (
    <ul className={`frame posts ${styles.posts}`} onScroll={handleScroll}>
      {postList}
    </ul>
  )
}
