import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import PostsSorter from '@/app/PostsSorter'
import PostsFiltersContent from '@/app/PostsFiltersContent'
import PostsLoader from '@/app/PostsLoader'
import PostsRefreshButton from '@/app/PostsRefreshButton'
import PostsNoArtists from '@/app/PostsNoArtists'
import PostsInitialImport from '@/app/PostsInitialImport'

import MarkdownText from '@/elements/MarkdownText'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'

import { sortTypes } from '@/app/helpers/postsHelpers'
import styles from '@/app/PostsPage.module.css'
import copy from '@/app/copy/PostsPageCopy'

const PostsContent = ({ dummyPostsImages }) => {
  // Has default link been set
  const { artistId, artist: { missingDefaultLink } } = React.useContext(ArtistContext)
  const { user } = React.useContext(UserContext)

  const defaultSortBy = sortTypes.find(({ id }) => id === 'published_time').id
  const [canLoadPosts, setCanLoadPosts] = React.useState(false)
  const [sortBy, setSortBy] = React.useState('')
  const [filterBy, setFilterBy] = React.useState(null)
  const hasArtists = user.artists.length > 0
  // GET REFRESH POSTS FUNCTION
  const [refreshPosts, setRefreshPosts] = React.useState(() => {})

  const testNewUser = (user) => {
    const { created_at } = user
    const createdAtMoment = moment(created_at)
    const now = moment()
    const minuteDiff = now.diff(createdAtMoment, 'minutes')
    if (minuteDiff <= 30) return true
    return false
  }

  const isNewUser = React.useMemo(() => {
    return testNewUser(user)
  }, [user])

  React.useEffect(() => {
    if (!isNewUser) {
      setCanLoadPosts(true)
    }
  }, [isNewUser])

  return (
    // LOAD POSTS
    hasArtists ? (
      canLoadPosts ? (
        <div className="relative">
          {/* NO DEFAULT LINK WARNING */}
          {missingDefaultLink && hasArtists && (
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
            {/* SORT */}
            <PostsSorter
              sortTypes={sortTypes}
              sortBy={sortBy}
              setSortBy={setSortBy}
              defaultSortState={defaultSortBy}
              disabled={!hasArtists}
              className="col-span-12 sm:col-span-4"
            />
            {/* FILTERS */}
            <PostsFiltersContent
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              disabled={!hasArtists}
              className="col-span-12 sm:col-span-8"
            />
          </div>
          <PostsLoader
            setRefreshPosts={setRefreshPosts}
            sortBy={sortBy}
            filterBy={filterBy}
          />
        </div>
      ) : (
        <PostsInitialImport
          artistId={artistId}
          setCanLoadPosts={setCanLoadPosts}
        />
      )
    ) : (
      <PostsNoArtists dummyPostsImages={dummyPostsImages} />
    )
  )
}

PostsContent.propTypes = {
  dummyPostsImages: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
}

export default PostsContent
