import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import LinkIcon from '@/icons/LinkIcon'

import PostsLinks from '@/app/PostsLinks'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import brandColors from '@/constants/brandColors'

const PostLinksButton = ({ className, updateLinks }) => {
  const { setSidePanelContent, toggleSidePanel } = React.useContext(SidePanelContext)
  const togglePostsLinks = React.useCallback(() => {
    setSidePanelContent(<PostsLinks updateLinks={updateLinks} />)
    toggleSidePanel(true)
  }, [setSidePanelContent, toggleSidePanel, updateLinks])
  return (
    <Button
      className={className}
      onClick={togglePostsLinks}
      version="black small icon"
    >
      <LinkIcon fill={brandColors.bgColor} />
      Links
    </Button>
  )
}

PostLinksButton.propTypes = {
  className: PropTypes.string,
  updateLinks: PropTypes.func.isRequired,
}

PostLinksButton.defaultProps = {
  className: null,
}

export default PostLinksButton
