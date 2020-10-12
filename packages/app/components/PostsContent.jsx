import React from 'react'
// import PropTypes from 'prop-types'
import PostsFilters from '@/app/PostsFilters'
import PostsLoader from '@/app/PostsLoader'

import { PostsContext } from '@/app/contexts/PostsContext'
import usePostsSettings from '@/app/hooks/usePostsSettings'

import PostSettingsButton from '@/app/PostSettingsButton'
import PostLinksButton from '@/app/PostLinksButton'
import PostsRefreshButton from '@/app/PostsRefreshButton'


import { postTypes } from '@/app/helpers/postsHelpers'
import styles from '@/app/PostsPage.module.css'

const PostsContent = () => {
  const { goToPostSettings } = usePostsSettings()
  const { setTogglePromotionGlobal } = React.useContext(PostsContext)
  // OPEN THE POST SETTINGS SIDE PANEL
  const [updateLinks, setUpdateLinks] = React.useState(() => () => {})

  const allFilter = postTypes.find(({ id }) => id === 'all')
  const [currentPostType, setCurrentPostType] = React.useState('')
  // GET REFRESH POSTS FUNCTION
  const [refreshPosts, setRefreshPosts] = React.useState(() => {})
  return (
    <div className="relative">
      {/* REFRESH BUTTON (mobile) */}
      {refreshPosts && (
        <div
          className={[
            'xs:hidden',
            'mb-5  -mt-5 xxs:mt-0 minContent:-mt-5',
          ].join(' ')}
        >
          <PostsRefreshButton
            refreshPosts={refreshPosts}
            className={[
              'xs:hidden',
            ].join(' ')}
          />
        </div>
      )}
      {/* FILTERS */}
      <PostsFilters
        postTypes={postTypes}
        currentPostType={currentPostType}
        setCurrentPostType={setCurrentPostType}
        defaultPostState={allFilter.id}
      />
      {/* BUTTONS */}
      <div className="iphone8:flex justify-start mb-4 pt-2">
        {/* POST SETTINGS BUTTON */}
        <PostSettingsButton
          className={styles.postsTopButton}
          goToPostSettings={goToPostSettings}
        />
        {/* LINKS BUTTON */}
        <PostLinksButton
          className={styles.postsTopButton}
          updateLinks={updateLinks}
        />
        {/* REFRESH BUTTON (desktop) */}
        {refreshPosts && (
          <PostsRefreshButton
            refreshPosts={refreshPosts}
            className="hidden xs:block ml-auto"
          />
        )}
      </div>
      {/* LOAD POSTS */}
      {currentPostType && (
        <PostsLoader
          setTogglePromotionGlobal={setTogglePromotionGlobal}
          setRefreshPosts={setRefreshPosts}
          promotionStatus={currentPostType}
        />
      )}
    </div>
  )
}

export default PostsContent
