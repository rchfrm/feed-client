import React from 'react'
// import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import GearIcon from '@/icons/GearIcon'
import MarkdownText from '@/elements/MarkdownText'

import PostsFilters from '@/app/PostsFilters'
import PostsLoader from '@/app/PostsLoader'
import PostsSettings from '@/app/PostsSettings'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import { postTypes } from '@/app/helpers/postsHelpers'
import copy from '@/app/copy/PostsPageCopy'
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
  const [currentPostType, setCurrentPostType] = React.useState(postTypes[0].id)

  return (
    <div>
      {/* INTRO */}
      <MarkdownText className={['h4--text', styles.introText].join(' ')} markdown={copy.intro} />
      {/* POST SETTINGS BUTTON */}
      <div>
        <Button
          className={styles.postSettingsButton}
          onClick={togglePostsSettings}
          version="black small icon"
        >
          <GearIcon fill={brandColors.bgColor} />
          Post Settings
        </Button>
      </div>
      {/* FILTERS */}
      <PostsFilters
        postTypes={postTypes}
        currentPostType={currentPostType}
        setCurrentPostType={setCurrentPostType}
      />
      {/* LOAD POSTS */}
      <PostsLoader
        setTogglePromotionGlobal={setTogglePromotionGlobal}
        promotionStatus={currentPostType}
      />
    </div>
  )
}

export default PostsContent
