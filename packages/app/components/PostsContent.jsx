import React from 'react'
// import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import GearIcon from '@/icons/GearIcon'

import PostsFilters from '@/app/PostsFilters'
import PostsLoader from '@/app/PostsLoader'
import PostsSettings from '@/app/PostsSettings'

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
  const [currentPostType, setCurrentPostType] = React.useState(allFilter.id)
  // DISABLE POST SETTINGS BUTTON (if no posts)
  const [postSettingsDisabled, setPostSettingsDisabled] = React.useState(false)
  return (
    <div className="relative">
      {/* FILTERS */}
      <PostsFilters
        postTypes={postTypes}
        currentPostType={currentPostType}
        setCurrentPostType={setCurrentPostType}
      />
      {/* POST SETTINGS BUTTON */}
      <div className="flex justify-end mb-4 pt-2">
        <Button
          className={styles.postSettingsButton}
          onClick={togglePostsSettings}
          version="black small icon"
          disabled={postSettingsDisabled}
        >
          <GearIcon fill={brandColors.bgColor} />
          Post Settings
        </Button>
      </div>
      {/* LOAD POSTS */}
      <PostsLoader
        setTogglePromotionGlobal={setTogglePromotionGlobal}
        promotionStatus={currentPostType}
        setPostSettingsDisabled={setPostSettingsDisabled}
      />
    </div>
  )
}

export default PostsContent
