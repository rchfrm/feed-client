import React from 'react'
import PropTypes from 'prop-types'

import { InterfaceContext } from '@/contexts/InterfaceContext'

import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/PostsPageCopy'

import styles from '@/app/PostsPage.module.css'

const getCopy = (filterBy) => {
  const hasFiltersApplied = Object.values(filterBy).reduce((result, filterArray) => result + filterArray.length, 0) > 0
  const { noPostsCopy } = copy

  if (hasFiltersApplied) {
    return noPostsCopy.filtered()
  }
  return noPostsCopy.all()
}

const PostsNone = ({ filterBy }) => {
  const { setHeader } = React.useContext(InterfaceContext)
  const copyMarkdown = getCopy(filterBy)

  React.useEffect(() => {
    setHeader({ text: 'your posts', punctuation: ',' })
  }, [setHeader])

  return (
    <div className={[styles.noPosts, 'pt-4'].join(' ')}>
      <MarkdownText
        className={[
          'h4--text',
          styles.introText,
          'bg-grey-1', 'rounded-dialogue', 'p-5 pt-4',
        ].join(' ')}
        markdown={copyMarkdown}
      />
    </div>
  )
}

PostsNone.propTypes = {
  artist: PropTypes.object,
}

PostsNone.defaultProps = {
  artist: null,
}

export default PostsNone
