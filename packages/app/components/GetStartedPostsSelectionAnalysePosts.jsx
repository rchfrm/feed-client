import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
import Spinner from '@/elements/Spinner'

import copy from '@/app/copy/getStartedCopy'

const GetStartedPostsSelectionAnalysePosts = ({ canLoadPosts }) => {
  return (
    <>
      <MarkdownText className="hidden xs:block sm:w-2/3 text-grey-3 italic" markdown={copy.postsSelectionDescription(!canLoadPosts)} />
      <div className={[
        'flex flex-1 flex-column justify-center items-center',
      ].join(' ')}
      >
        <Spinner className="flex-none mb-10" />
        <div className="max-w-sm text-center">
          Analysing your posts...
        </div>
      </div>
    </>
  )
}

GetStartedPostsSelectionAnalysePosts.propTypes = {
  canLoadPosts: PropTypes.bool.isRequired,
}

GetStartedPostsSelectionAnalysePosts.defaultProps = {
}

export default GetStartedPostsSelectionAnalysePosts
