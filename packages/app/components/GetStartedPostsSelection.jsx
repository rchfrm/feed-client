import React from 'react'
import useAsyncEffect from 'use-async-effect'
// import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { WizardContext } from '@/app/contexts/WizardContext'

import useCheckInitialPostsImportStatus from '@/app/hooks/useCheckInitialPostsImportStatus'

import GetStartedPostsSelectionCard from '@/app/GetStartedPostsSelectionCard'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Spinner from '@/elements/Spinner'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import * as server from '@/app/helpers/appServer'
import { formatRecentPosts } from '@/app/helpers/resultsHelpers'
import { updatePost } from '@/app/helpers/postsHelpers'

import copy from '@/app/copy/getStartedCopy'

const GetStartedPostsSelection = () => {
  const [canLoadPosts, setCanLoadPosts] = React.useState(false)
  const [posts, setPosts] = React.useState([])
  const [selectedPostsIds, setSelectedPostsIds] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const { artistId } = React.useContext(ArtistContext)
  const { next } = React.useContext(WizardContext)

  const { initialLoading } = useCheckInitialPostsImportStatus(artistId, setCanLoadPosts)

  useAsyncEffect(async (isMounted) => {
    if (!isMounted() || !canLoadPosts) return

    const res = await server.getPosts({
      artistId,
      sortBy: ['normalized_score'],
      limit: 2,
    })

    const formattedPosts = formatRecentPosts(res)

    setPosts(formattedPosts)
    setSelectedPostsIds(formattedPosts.map(({ id }) => id))
  }, [canLoadPosts])

  const setSelectedPosts = (postId) => {
    if (selectedPostsIds.includes(postId)) {
      const filteredPostsIds = selectedPostsIds.filter((id) => id !== postId)

      setSelectedPostsIds(filteredPostsIds)
    } else {
      setSelectedPostsIds([...selectedPostsIds, postId])
    }
  }

  const handleNext = async () => {
    if (selectedPostsIds.length) {
      setIsLoading(true)

      const postPromises = selectedPostsIds.map((postId) => {
        return updatePost({ artistId, postId, promotionEnabled: true, campaignType: 'all' })
      })

      await Promise.all(postPromises)
      setIsLoading(false)

      next()
    }
  }

  return (
    <div className="flex flex-1 flex-column">
      {!canLoadPosts && !initialLoading ? (
        <div className="flex mb-16">
          <Spinner width={24} className="flex-none w-auto mr-2" />
          <h3 className="mb-0 font-medium text-xl">Analysing your posts...</h3>
        </div>
      ) : (
        <h3 className="mb-8 font-medium text-xl">These are the posts we recommend promoting first...</h3>
      )}
      <div className="flex flex-1 flex-column justify-center items-center">
        {!canLoadPosts && !initialLoading ? (
          <MarkdownText className="w-2/3 mx-auto text-center" markdown={copy.analysingPosts} />
        ) : (
          <>
            <div className="flex mb-8 relative">
              {posts.map((post) => (
                <GetStartedPostsSelectionCard
                  key={post.id}
                  post={post}
                  setSelectedPosts={setSelectedPosts}
                />
              ))}
            </div>
            <div className="flex">
              <Button
                version="outline-black"
                onClick={handleNext}
                className="w-56 mx-4"
                trackComponentName="GetStartedPostsStep"
              >
                Load more...
              </Button>
              <Button
                version="green"
                onClick={handleNext}
                loading={isLoading}
                className="w-56 mx-4"
                trackComponentName="GetStartedPostsStep"
              >
                Save
                <ArrowAltIcon
                  className="ml-3"
                  direction="right"
                  fill="white"
                />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

GetStartedPostsSelection.propTypes = {
}

GetStartedPostsSelection.defaultProps = {
}

export default GetStartedPostsSelection
