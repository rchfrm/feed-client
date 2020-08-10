// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
// IMPORT CONTEXTS
import { InterfaceContext } from '@/contexts/InterfaceContext'
import { UserContext } from '@/contexts/UserContext'
// IMPORT COMPONENTS
// IMPORT ELEMENTS
import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'
import copy from '@/app/copy/PostsPageCopy'
// IMPORT STYLES
import styles from '@/app/PostsPage.module.css'

const testNewUser = (user) => {
  const { created_at } = user
  const createdAtMoment = moment(created_at)
  const now = moment()
  const hourDiff = now.diff(createdAtMoment, 'hours')
  if (hourDiff <= 1) return true
  return false
}

const PostsNone = ({ refreshPosts }) => {
  // IMPORT CONTEXTS
  const { setHeader } = React.useContext(InterfaceContext)
  const { user } = React.useContext(UserContext)

  const isNewUser = testNewUser(user)
  const copyMarkdown = isNewUser ? copy.newUserCopy : copy.noPostsCopy

  // Update header
  React.useEffect(() => {
    setHeader({ text: 'your posts', punctuation: ',' })
  }, [setHeader])

  return (
    <div className={[styles.noPosts].join(' ')}>
      <MarkdownText
        className={[
          'h4--text',
          styles.introText,
          'bg-grey-1', 'rounded-dialogue', 'p-5 pt-4',
        ].join(' ')}
        markdown={copyMarkdown}
      />
      {/* Refresh posts fetch if new user */}
      {isNewUser && (
        <Button
          onClick={refreshPosts}
        >
          Refresh posts
        </Button>
      )}
    </div>
  )
}

PostsNone.propTypes = {
  refreshPosts: PropTypes.func.isRequired,
}


export default PostsNone
