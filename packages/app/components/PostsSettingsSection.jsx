import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

const PostsSettingsSection = ({
  header,
  copy,
  children,
}) => {
  return (
    <section className="mb-8 last:mb-0">
      <h3>{header}</h3>
      <MarkdownText markdown={copy} />
      {children}
    </section>
  )
}

PostsSettingsSection.propTypes = {
  header: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default PostsSettingsSection
