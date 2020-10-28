import React from 'react'
// import PropTypes from 'prop-types'
import PostsFilters from '@/app/PostsFilters'
import PostsLoader from '@/app/PostsLoader'

import usePostsSidePanel from '@/app/hooks/usePostsSidePanel'

import PostSettingsButton from '@/app/PostSettingsButton'
import PostLinksButton from '@/app/PostLinksButton'
import PostsRefreshButton from '@/app/PostsRefreshButton'


import { postTypes } from '@/app/helpers/postsHelpers'
import styles from '@/app/PostsPage.module.css'

const PostsContent = () => {
  const { goToPostSettings, goToPostLinks } = usePostsSidePanel()

  const allFilter = postTypes.find(({ id }) => id === 'all')
  const [currentPostType, setCurrentPostType] = React.useState('')
  // GET REFRESH POSTS FUNCTION
  const [refreshPosts, setRefreshPosts] = React.useState(() => {})
  return (
    <div className="relative">
      {/* BUTTONS */}
      <div className="iphone8:flex justify-start mb-10">
        {/* POST SETTINGS BUTTON */}
        <PostSettingsButton
          className={styles.postsTopButton}
          goToPostSettings={goToPostSettings}
        />
        {/* LINKS BUTTON */}
        <PostLinksButton
          className={styles.postsTopButton}
          goToPostLinks={goToPostLinks}
        />
        {/* REFRESH BUTTON (desktop) */}
        {refreshPosts && (
          <PostsRefreshButton
            refreshPosts={refreshPosts}
            className="ml-auto"
            style={{ transform: 'translateY(5rem)' }}
          />
        )}
      </div>
      {/* FILTERS */}
      <PostsFilters
        postTypes={postTypes}
        currentPostType={currentPostType}
        setCurrentPostType={setCurrentPostType}
        defaultPostState={allFilter.id}
      />
      {/* LOAD POSTS */}
      {currentPostType && (
        <PostsLoader
          setRefreshPosts={setRefreshPosts}
          promotionStatus={currentPostType}
        />
      )}
    </div>
  )
}

export default PostsContent
