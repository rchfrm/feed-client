import React from 'react'
import PropTypes from 'prop-types'
import PostsFilter from '@/app/PostsFilter'
import PostsSorter from '@/app/PostsSorter'
import { postsConfig } from '@/app/helpers/postsHelpers'

const PostsNoArtistsContainer = ({
  status,
  filterBy,
  sortBy,
  isOpen,
  className,
}) => {
  const shouldShowPostsAmount = status === 'active' || status === 'rejected'

  return (
    <div
      className={[
        'mb-5 rounded-dialogue border border-solid',
        ! isOpen ? 'overflow-hidden h-[70px]' : null,
        className,
      ].join(' ')}
    >
      <div
        className={[
          'w-full flex justify-between items-center p-5',
          isOpen ? 'rounded-b-none' : null,
        ].join(' ')}
      >
        <h2 className="mb-0 mr-5">{shouldShowPostsAmount ? 0 : null} {postsConfig[status].name}</h2>
      </div>
      <div className="mb-5 px-5 transition ease-in-out delay-200 transition-opacity opacity-1">
        <div className="flex justify-between mb-5 text-xs">
          <PostsFilter filterBy={filterBy} setFilterBy={() => {}} />
          <PostsSorter sortBy={sortBy} setSortBy={() => {}} />
        </div>
        <ul className="grid grid-cols-12 gap-6 grid-flow-row-dense mb-0">
          {[...Array(4)].map((index) => {
            return (
              <div
                key={index}
                className="w-full relative bg-grey-1 opacity-1 mb-2 col-span-6 sm:col-span-3 lg:col-span-2"
                style={{ paddingTop: '100%' }}
              >
                <div className="absolute w-full h-full top-0 bg-grey-1" />
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

PostsNoArtistsContainer.propTypes = {
  status: PropTypes.string.isRequired,
  filterBy: PropTypes.object,
  sortBy: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostsNoArtistsContainer.defaultProps = {
  className: null,
  filterBy: {},
  sortBy: '',
}

export default PostsNoArtistsContainer
