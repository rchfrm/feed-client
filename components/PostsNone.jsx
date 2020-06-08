// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/Artist'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import { UserContext } from '@/contexts/User'
// IMPORT ELEMENTS
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/copy/PostsPageCopy'
// IMPORT STYLES
import styles from '@/PostsPage.module.css'

const testNewUser = (user) => {
  const { created_at } = user
  const createdAtMoment = moment(created_at)
  const now = moment()
  const hourDiff = now.diff(createdAtMoment, 'hours')
  if (hourDiff <= 1) return true
  return false
}
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
    <div className={styles.noPosts}>
      <MarkdownText className={['h4--text', styles.introText].join(' ')} markdown={copy.noPostsCopy(platforms)} />
    </div>
  )
}

export default PostsNone
