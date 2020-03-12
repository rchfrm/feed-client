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
  togglePromotion,
}) {
  // DEFINE POST DETAILS
  const initialPostTrackerState = {
    number: numberOfPosts,
    timerRunning: false,
    timeNow: moment().format('x'),
    updateTime: moment().format('x'),
    scroll: 0,
    width: 1 / numberOfPosts,
  }
  const postTrackerReducer = (postTrackerState, postTrackerAction) => {
    switch (postTrackerAction.type) {
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
  const [, setPostTracker] = React.useReducer(postTrackerReducer, initialPostTrackerState)
  // END DEFINE TILE DETAILS


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

  if (posts.length === 0) {
    return <PostsNone />
  }

  return (
    <div className={styles['posts-section']}>

      <PageHeader heading="review your posts" punctuation="," />

      <h4 className={styles.h4}>
        Below are your most recent posts.&nbsp;
        <Feed />
        {' '}
        works best if they're all selected, but if there are any you'd rather not promote just untick them.
      </h4>

      <PostList
        posts={posts}
        setPosts={setPosts}
        togglePromotion={togglePromotion}
      />

    </div>
  )
}

export default Posts

function PostList({ posts, setPosts, togglePromotion }) {

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
    <ul className={`frame posts ${styles.posts}`}>
      {postList}
    </ul>
  )
}
