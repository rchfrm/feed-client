import React from 'react'
import PropTypes from 'prop-types'

import { InterfaceContext } from '@/contexts/InterfaceContext'

import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/PostsPageCopy'

import styles from '@/app/PostsPage.module.css'

const getCopy = () => {
  const { noPostsCopy } = copy
  // ALL and Old user
  return noPostsCopy.allOldUser()
}

const PostsNone = ({ artist }) => {
  const { setHeader } = React.useContext(InterfaceContext)
  const hasBudget = !!artist.daily_budget
  const copyMarkdown = getCopy({ hasBudget })

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
