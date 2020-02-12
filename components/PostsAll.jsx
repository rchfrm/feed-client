// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import PageHeader from './elements/PageHeader'
import Feed from './elements/Feed'
import LastItem from './elements/LastItem'
// IMPORT PAGES
import Post from './PostsSingle'
import PostsNone from './PostsNone'
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES
import styles from './PostsPage.module.css'

// Render list of posts and track the one that's currently visible
function Posts(props) {
// SET PROPS AS VARIABLES
  const { numberOfPosts } = props
  const { posts } = props
  const { setVisiblePost } = props
  const { setPosts } = props
  const { visiblePost } = props
  const { togglePromotion } = props
  // END SET PROPS AS VARIABLES

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
      case 'set-scroll-position':
        return {
          ...postTrackerState,
          timerRunning: true,
          updateTime: moment().format('x'),
          scroll: postTrackerAction.payload.scroll,
        }
      case 'toggle-timer':
        return {
          ...postTrackerState,
          timerRunning: postTrackerAction.payload,
        }
      case 'time-now':
        return {
          ...postTrackerState,
          timeNow: moment().format('x'),
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

    const postsList = document.getElementsByClassName('posts')[0]
    if (postTracker.timeNow - postTracker.updateTime > 500 && postTracker.timerRunning) {
      postsList.scrollLeft = postsList.scrollWidth * (visiblePost - 1) * postTracker.width
      setPostTracker({
        type: 'toggle-timer',
        payload: false,
      })
    }
  }, [postTracker, visiblePost, setVisiblePost])
  // END TRACK SCROLL POSITION AND UPDATE TILE DETAILS STATE ACCORDINGLY

  // CLOCK TO REFERENCE WHEN USER STOPS SCROLLING
  React.useEffect(() => {
    if (postTracker.timerRunning) {
      setPostTracker({
        type: 'time-now',
      })
    }
  })
  // END CLOCK TO REFERENCE WHEN USER STOPS SCROLLING

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
        timerRunning: true,
        scroll: scrollPercentage,
      },
    })
  }
  // END HANDLE SCROLL

  if (posts.length === 0) {
    return <PostsNone />
  }

  return (
    <div className="posts-section">

      <PageHeader heading="review your posts" punctuation="," />

      <h4>
        Below are your most recent posts.
        <Feed />
        {' '}
        works best if they're all selected, but if there are any you'd rather not promote just untick them.
      </h4>

      <PostList
        handleScroll={handleScroll}
        posts={posts}
        setPosts={setPosts}
        togglePromotion={togglePromotion}
      />

    </div>
  )
}

export default Posts

function PostList(props) {
// REDEFINE PROPS AS VARIABLES
  const { handleScroll } = props
  const { posts } = props
  const { setPosts } = props
  const { togglePromotion } = props
  // END REDEFINE PROPS AS VARIABLES

  // CREATE ARRAY OF POSTS
  const postList = posts.map((post, index) => {
    return (
      <Post
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
    <ul className="posts frame" onScroll={handleScroll}>
      {postList}
    </ul>
  )
}
