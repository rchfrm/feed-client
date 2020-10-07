import React from 'react'
// import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import GearIcon from '@/icons/GearIcon'

import PostsFilters from '@/app/PostsFilters'
import PostsLoader from '@/app/PostsLoader'
import PostsSettings from '@/app/PostsSettings'
import PostsRefreshButton from '@/app/PostsRefreshButton'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import { postTypes } from '@/app/helpers/postsHelpers'
import styles from '@/app/PostsPage.module.css'
import brandColors from '@/constants/brandColors'

const PostsContent = () => {
  // OPEN THE POST SETTINGS SIDE PANEL
  const [togglePromotionGlobal, setTogglePromotionGlobal] = React.useState(() => {})
  const { setSidePanelContent, toggleSidePanel } = React.useContext(SidePanelContext)
  const togglePostsSettings = React.useCallback(() => {
    setSidePanelContent(<PostsSettings togglePromotionGlobal={togglePromotionGlobal} />)
    toggleSidePanel(true)
  }, [setSidePanelContent, toggleSidePanel, togglePromotionGlobal])
  // HANDLE STATE OF POST TYPE FILTERS
  const allFilter = postTypes.find(({ id }) => id === 'all')
  const [currentPostType, setCurrentPostType] = React.useState('')
  // GET REFRESH POSTS FUNCTION
  const [refreshPosts, setRefreshPosts] = React.useState(() => {})
  return (
    <div className="relative">
      {/* FILTERS */}
      <PostsFilters
        postTypes={postTypes}
        currentPostType={currentPostType}
        setCurrentPostType={setCurrentPostType}
        defaultPostState={allFilter.id}
      />
      {/* POST SETTINGS BUTTON */}
      <div className="iphone8:flex justify-start mb-4 pt-2">
        <Button
          className={styles.postSettingsButton}
          onClick={togglePostsSettings}
          version="black small icon"
        >
          <GearIcon fill={brandColors.bgColor} />
          Post Settings
        </Button>
        {refreshPosts && (
          <PostsRefreshButton
            refreshPosts={refreshPosts}
            className="mt-5 iphone8:mt-0 iphone8:ml-5"
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
