// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
// IMPORT CONTEXTS
import { InterfaceContext } from '@/contexts/InterfaceContext'
import { UserContext } from '@/app/contexts/UserContext'
// IMPORT COMPONENTS
import PostsRefreshButton from '@/app/PostsRefreshButton'
// IMPORT ELEMENTS
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/PostsPageCopy'

import * as postsHelpers from '@/app/helpers/postsHelpers'
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

const getCopy = ({ isNewUser, hasBudget, promotionStatus }) => {
  const inactiveTitle = postsHelpers.getPostTypesTitle('inactive')
  const { noPostsCopy } = copy
  // ACTIVE
  if (promotionStatus === 'active') {
    if (hasBudget) return noPostsCopy.activeWithBudget(inactiveTitle)
    return noPostsCopy.activeNoBudget()
  }
  // ARCHIVED
  if (promotionStatus === 'archived') {
    return noPostsCopy.archive()
  }
  // ALL and New user
  if (isNewUser) return noPostsCopy.allNewUser()
  // ALL and Old user
  return noPostsCopy.allOldUser()
}

const PostsNone = ({ refreshPosts, promotionStatus, artist }) => {
  // IMPORT CONTEXTS
  const { setHeader } = React.useContext(InterfaceContext)
  const { user } = React.useContext(UserContext)

  const isNewUser = React.useMemo(() => {
    return testNewUser(user)
  }, [user])
  const hasBudget = !!artist.daily_budget

  const copyMarkdown = getCopy({ isNewUser, hasBudget, promotionStatus })

  // Update header
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
      {/* Refresh posts fetch if new user */}
      {isNewUser && (
        <PostsRefreshButton refreshPosts={refreshPosts} />
      )}
    </div>
  )
}

PostsNone.propTypes = {
  artist: PropTypes.object,
  refreshPosts: PropTypes.func.isRequired,
  promotionStatus: PropTypes.string.isRequired,
}

PostsNone.defaultProps = {
  artist: null,
}



export default PostsNone
