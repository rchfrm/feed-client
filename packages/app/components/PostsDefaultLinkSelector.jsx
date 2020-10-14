import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import PostsSettings from '@/app/PostsSettings'

const SAVE_DEFAULT_LINK_BUTTON = ({
  setSidePanelButton,
  setSidePanelContent,
  setSidePanelLoading,
  togglePromotionGlobal,
}) => {
  const saveDefaultLink = React.useCallback(() => {
    setSidePanelLoading(true)
    setTimeout(() => {
      setSidePanelLoading(false)
      // Revert to post settings
      setSidePanelButton(null)
      setSidePanelContent(<PostsSettings togglePromotionGlobal={togglePromotionGlobal} />)
    }, 500)
  // eslint-disable-next-line
  }, [])
  return (
    <Button version="green" onClick={saveDefaultLink}>
      Save Default Link
    </Button>
  )
}

const PostsDefaultLinkSelector = ({
  currentDefaultLink,
  setSidePanelButton,
  setSidePanelContent,
  setSidePanelLoading,
  togglePromotionGlobal,
}) => {
  React.useEffect(() => {
    setSidePanelButton(<SAVE_DEFAULT_LINK_BUTTON
      setSidePanelButton={setSidePanelButton}
      setSidePanelContent={setSidePanelContent}
      setSidePanelLoading={setSidePanelLoading}
      togglePromotionGlobal={togglePromotionGlobal}
    />)
  }, [])
  return (
    <section>
      <h2>Links</h2>
      Current default {currentDefaultLink.name}
    </section>
  )
}

PostsDefaultLinkSelector.propTypes = {
  currentDefaultLink: PropTypes.object.isRequired,
  setSidePanelButton: PropTypes.func.isRequired,
  setSidePanelContent: PropTypes.func.isRequired,
  setSidePanelLoading: PropTypes.func.isRequired,
  togglePromotionGlobal: PropTypes.func.isRequired,
}

export default PostsDefaultLinkSelector
