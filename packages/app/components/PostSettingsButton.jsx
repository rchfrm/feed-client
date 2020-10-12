import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import GearIcon from '@/icons/GearIcon'

import PostsSettings from '@/app/PostsSettings'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import brandColors from '@/constants/brandColors'

const PostSettingsButton = ({ className, togglePromotionGlobal }) => {
  const { setSidePanelContent, toggleSidePanel } = React.useContext(SidePanelContext)
  const togglePostsSettings = React.useCallback(() => {
    setSidePanelContent(<PostsSettings togglePromotionGlobal={togglePromotionGlobal} />)
    toggleSidePanel(true)
  }, [setSidePanelContent, toggleSidePanel, togglePromotionGlobal])
  return (
    <Button
      className={className}
      onClick={togglePostsSettings}
      version="black small icon"
    >
      <GearIcon fill={brandColors.bgColor} />
      Settings
    </Button>
  )
}

PostSettingsButton.propTypes = {
  className: PropTypes.string,
  togglePromotionGlobal: PropTypes.func.isRequired,
}

PostSettingsButton.defaultProps = {
  className: null,
}

export default PostSettingsButton
