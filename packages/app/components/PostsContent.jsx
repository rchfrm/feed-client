import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import PostsSorter from '@/app/PostsSorter'
import PostsFilters from '@/app/PostsFilters'
import PostsLoader from '@/app/PostsLoader'
import PostsRefreshButton from '@/app/PostsRefreshButton'
import PostsNoArtists from '@/app/PostsNoArtists'

import MarkdownText from '@/elements/MarkdownText'
import Spinner from '@/elements/Spinner'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'

import useIsMounted from '@/hooks/useIsMounted'

import { postTypes, sortTypes, getInitialPostsImportStatus } from '@/app/helpers/postsHelpers'
import styles from '@/app/PostsPage.module.css'
import copy from '@/app/copy/PostsPageCopy'

const PostsContent = ({ dummyPostsImages }) => {
  // Has default link been set
  const { artistId, artist: { missingDefaultLink } } = React.useContext(ArtistContext)
  const { user } = React.useContext(UserContext)

  const allFilter = postTypes.find(({ id }) => id === 'all')
  const defaultSortBy = sortTypes.find(({ id }) => id === 'published_time').id
  const [currentPostType, setCurrentPostType] = React.useState('')
  const [canLoadPosts, setCanLoadPosts] = React.useState(false)
  const [initialLoading, setInitialLoading] = React.useState(true)
  const [intervalId, setIntervalId] = React.useState(null)
  const [sortBy, setSortBy] = React.useState('')
  const hasArtists = user.artists.length > 0
  const isMounted = useIsMounted()
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

  const checkInitialPostsImportStatus = async () => {
    if (!isMounted) return

    const { res, error } = await getInitialPostsImportStatus(artistId)

    if (initialLoading) setInitialLoading(false)

    if (error) {
      clearInterval(intervalId)
      return
    }

    if (res.last_update_completed_at) {
      setCanLoadPosts(true)
      clearInterval(intervalId)
    }
  }

  React.useEffect(() => {
    if (isNewUser && hasArtists) {
      checkInitialPostsImportStatus()
      setIntervalId(setInterval(checkInitialPostsImportStatus, 2000))
      return
    }
    setCanLoadPosts(true)
    setInitialLoading(false)
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    return () => clearInterval(intervalId)
  }, [intervalId])

  if (initialLoading) return null

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
            <PostsFilters
              postTypes={postTypes}
              currentPostType={currentPostType}
              setCurrentPostType={setCurrentPostType}
              defaultPostState={allFilter.id}
              disabled={!hasArtists}
              className="col-span-12 sm:col-span-8"
            />
          </div>
          {currentPostType && (
            <PostsLoader
              setRefreshPosts={setRefreshPosts}
              promotionStatus={currentPostType}
              sortBy={sortBy}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-1 flex-column justify-center items-center">
          <Spinner className="flex-none mb-10" />
          <MarkdownText
            className="max-w-xs text-center"
            markdown={copy.importingPosts}
          />
        </div>

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
