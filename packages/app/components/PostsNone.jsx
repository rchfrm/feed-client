import React from 'react'
import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/PostsPageCopy'

const getCopy = (filterBy) => {
  const hasFiltersApplied = Object.values(filterBy).length > 0
  const { noPostsCopy } = copy

  if (hasFiltersApplied) {
    return noPostsCopy.filtered()
  }
  return noPostsCopy.all()
}

const PostsNone = ({ filterBy, className }) => {
  const copyMarkdown = getCopy(filterBy)

  return (
    <MarkdownText markdown={copyMarkdown} className={[className, 'h-16 flex items-center mb-0'].join(' ')} />
  )
}

PostsNone.propTypes = {
  filterBy: PropTypes.object,
}

PostsNone.defaultProps = {
  filterBy: null,
}

export default PostsNone
