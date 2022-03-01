import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
import Spinner from '@/elements/Spinner'

import copy from '@/app/copy/getStartedCopy'

const GetStartedPostsSelectionAnalysePosts = ({ canLoadPosts }) => {
  return (
    <>
      <div className="flex mb-4">
        <Spinner width={24} className="flex-none w-auto mr-2" />
        <h3 className="mb-0 font-medium text-xl">{copy.postsSelectionSubtitle(canLoadPosts)}</h3>
      </div>
      <MarkdownText className="sm:w-2/3 text-grey-3 italic" markdown={copy.postsSelectionDescription(canLoadPosts)} />
    </>
  )
}

GetStartedPostsSelectionAnalysePosts.propTypes = {
  canLoadPosts: PropTypes.bool.isRequired,
}

GetStartedPostsSelectionAnalysePosts.defaultProps = {
}

export default GetStartedPostsSelectionAnalysePosts
