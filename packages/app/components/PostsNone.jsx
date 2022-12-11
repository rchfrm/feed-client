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

const PostsNone = ({ filterBy }) => {
  const copyMarkdown = getCopy(filterBy)

  return (
    <MarkdownText markdown={copyMarkdown} className="mt-5 py-5" />
  )
}

PostsNone.propTypes = {
  filterBy: PropTypes.object,
}

PostsNone.defaultProps = {
  filterBy: null,
}

export default PostsNone
