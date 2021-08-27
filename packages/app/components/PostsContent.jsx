import React from 'react'
// import PropTypes from 'prop-types'

import PostsSorter from '@/app/PostsSorter'
import PostsFilters from '@/app/PostsFilters'
import PostsLoader from '@/app/PostsLoader'
import PostsRefreshButton from '@/app/PostsRefreshButton'

import MarkdownText from '@/elements/MarkdownText'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import { postTypes, sortTypes } from '@/app/helpers/postsHelpers'
import styles from '@/app/PostsPage.module.css'
import copy from '@/app/copy/PostsPageCopy'

const PostsContent = () => {
  // Has default link been set
  const { artist: { missingDefaultLink } } = React.useContext(ArtistContext)

  const allFilter = postTypes.find(({ id }) => id === 'all')
  const defaultSortBy = sortTypes.find(({ id }) => id === 'published_time').id
  const [currentPostType, setCurrentPostType] = React.useState('')
  const [sortBy, setSortBy] = React.useState('')
  // GET REFRESH POSTS FUNCTION
  const [refreshPosts, setRefreshPosts] = React.useState(() => {})
  return (
    <div className="relative">
      {/* NO DEFAULT LINK WARNING */}
      {missingDefaultLink && (
        <MarkdownText
          className={['pb-5', styles.noDefaultLinkWarning].join(' ')}
          markdown={copy.noDefaultLinkWarning}
        />
      )}
      {/* BUTTONS */}
      <div className="relative iphone8:flex justify-start">
        {/* REFRESH BUTTON (desktop) */}
        {refreshPosts && (
          <PostsRefreshButton
            refreshPosts={refreshPosts}
            className={[
              'ml-auto',
              'absolute right-0 bottom-0 mb-8',
              'iphone8:static iphone8:-mb-1',
            ].join(' ')}
            style={{ transform: 'translateY(1.5rem)' }}
          />
        )}
      </div>
      <div className="grid grid-cols-12 col-gap-6">
        <PostsSorter
          sortTypes={sortTypes}
          sortBy={sortBy}
          setSortBy={setSortBy}
          defaultSortState={defaultSortBy}
          className="col-span-4"
        />
        {/* FILTERS */}
        <PostsFilters
          postTypes={postTypes}
          currentPostType={currentPostType}
          setCurrentPostType={setCurrentPostType}
          defaultPostState={allFilter.id}
          className="col-span-8"
        />
      </div>
      {/* SORT */}
      {/* LOAD POSTS */}
      {currentPostType && (
        <PostsLoader
          setRefreshPosts={setRefreshPosts}
          promotionStatus={currentPostType}
          sortBy={sortBy}
        />
      )}
    </div>
  )
}

export default PostsContent
