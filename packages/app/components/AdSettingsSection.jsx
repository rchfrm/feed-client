import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

const PostsSettingsSection = ({
  header,
  copy,
  copyClassName,
  children,
}) => {
  return (
    <section className="mb-10 last:mb-0">
      <h3 className="font-body font-bold text-lg mb-3">{header}</h3>
      {copy && <MarkdownText markdown={copy} className={copyClassName} />}
      {children}
    </section>
  )
}

PostsSettingsSection.propTypes = {
  header: PropTypes.string.isRequired,
  copy: PropTypes.string,
  copyClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
}

PostsSettingsSection.defaultProps = {
  copy: '',
  copyClassName: null,
}


export default PostsSettingsSection
