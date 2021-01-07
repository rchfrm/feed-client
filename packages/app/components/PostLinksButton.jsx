import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import LinkIcon from '@/icons/LinkIcon'

import brandColors from '@/constants/brandColors'

const PostLinksButton = ({ goToPostLinks, className }) => {
  return (
    <Button
      className={className}
      onClick={goToPostLinks}
      version="black small icon"
      label="Open Posts Links"
    >
      <LinkIcon fill={brandColors.bgColor} />
      Links
    </Button>
  )
}

PostLinksButton.propTypes = {
  className: PropTypes.string,
  goToPostLinks: PropTypes.func.isRequired,
}

PostLinksButton.defaultProps = {
  className: null,
}

export default PostLinksButton
