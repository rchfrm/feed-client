import React from 'react'
import useAsyncEffect from 'use-async-effect'
// import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import PostImage from '@/PostImage'

import { getArtistIntegrationByPlatform } from '@/app/helpers/artistHelpers'
import { capitalise, formatCurrency } from '@/helpers/utils'
import { formatRecentPosts } from '@/app/helpers/resultsHelpers'
import * as server from '@/app/helpers/appServer'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
  budget: state.budget,
})

const GetStartedSummarySentence = () => {
  const [posts, setPosts] = React.useState([])

  const { artistId, artist } = React.useContext(ArtistContext)
  const { optimizationPreferences, budget } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences

  const { feedMinBudgetInfo: { currencyCode } } = artist

  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')
  const adAccountId = facebookIntegration?.adaccount_id

  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return

    const res = await server.getPosts({
      artistId,
      filterBy: {
        promotion_status: ['in_review', 'active'],
      },
    })

    const formattedRecentPosts = formatRecentPosts(res)

    setPosts(formattedRecentPosts)
  }, [])

  return (
    <div className="flex flex-wrap items-center mr-auto sm:mr-0 mb-10">
      <span className="border-2 border-solid border-red rounded-full py-1 px-3 mr-1 mb-2 whitespace-pre">{capitalise(platform)} {objective}</span>
      <span className="whitespace-pre mb-2">using these posts:</span>
      <div className="flex items-center mb-2">
        {posts.map(({ id, media, thumbnails }) => (
          <div key={id} className="relative w-10 h-10 mx-2 rounded-full overflow-hidden">
            <PostImage
              mediaSrc={media}
              mediaType="image"
              thumbnailOptions={thumbnails}
              className="absolute pointer-events-none"
            />
          </div>
        ))}
      </div>
      <span className="whitespace-pre mb-2">, in</span>
      <span className="border-2 border-solid border-yellow rounded-full py-1 px-3 mx-1 mb-2">{adAccountId}</span>
      <span className="whitespace-pre mb-2">with a daily budget of</span>
      <span className="border-2 border-solid border-green rounded-full py-1 px-3 mx-1 mb-2">{formatCurrency(budget, currencyCode)}</span>
    </div>
  )
}

GetStartedSummarySentence.propTypes = {
}

GetStartedSummarySentence.defaultProps = {
}

export default GetStartedSummarySentence
