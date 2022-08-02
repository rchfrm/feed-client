import React from 'react'

import Spinner from '@/elements/Spinner'

const GetStartedPostsSelectionAnalysePosts = () => {
  return (
    <div className={[
      'flex flex-1 flex-column justify-center items-center',
    ].join(' ')}
    >
      <Spinner className="flex-none mb-10" />
      <div className="max-w-sm text-center text-lg">
        Analysing your posts...
      </div>
    </div>
  )
}

GetStartedPostsSelectionAnalysePosts.propTypes = {
}

GetStartedPostsSelectionAnalysePosts.defaultProps = {
}

export default GetStartedPostsSelectionAnalysePosts
