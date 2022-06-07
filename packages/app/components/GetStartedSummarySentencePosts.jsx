import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { WizardContext } from '@/app/contexts/WizardContext'

import GetStartedSummarySentenceSection from '@/app/GetStartedSummarySentenceSection'

import PostImage from '@/PostImage'
import BrokenImageIcon from '@/icons/BrokenImageIcon'

import { formatPostsMinimal } from '@/app/helpers/postsHelpers'
import { getStartedSections } from '@/app/helpers/artistHelpers'

import * as server from '@/app/helpers/appServer'
import brandColors from '@/constants/brandColors'

const GetStartedSummarySentencePosts = () => {
  const [posts, setPosts] = React.useState([])

  const { artistId, enabledPosts } = React.useContext(ArtistContext)
  const { steps, currentStep } = React.useContext(WizardContext)

  const section = getStartedSections.postPromotion
  const isActive = steps[currentStep].section === section
  const isComplete = posts.length > 0
  const isInActive = !isActive && !isComplete

  useAsyncEffect(async (isMounted) => {
    if (!artistId) return

    // Fetch posts which are opted in for promotion
    const res = await server.getPosts({
      artistId,
      sortBy: ['normalized_score'],
      filterBy: {
        promotion_enabled: [true],
      },
      limit: 3,
    })

    if (!isMounted()) return

    const formattedRecentPosts = formatPostsMinimal(res)

    setPosts(formattedRecentPosts)
  }, [])

  React.useEffect(() => {
    if (!enabledPosts.length) {
      return
    }

    setPosts(enabledPosts)
  }, [enabledPosts])

  return (
    <GetStartedSummarySentenceSection
      section={getStartedSections.postPromotion}
      text="using these posts:"
      isComplete={isComplete}
      className="mx-2"
      hasBorder={false}
    >
      <div className="flex items-center mb-2">
        {posts.length ? (
          <>
            {posts.map(({ id, media, thumbnails }, index) => {
              // Only show the first two posts
              if (index > 1) return

              return (
                <div key={id} className="relative w-10 h-10 mx-1 rounded-full overflow-hidden">
                  <PostImage
                    mediaSrc={media}
                    mediaType="image"
                    thumbnailOptions={thumbnails}
                    className="absolute pointer-events-none"
                  />
                </div>
              )
            })}
            {posts.length > 2 && (
              <div className="flex justify-center items-center w-10 h-10 mx-1 border-2 border-solid border-black rounded-full text-xs">
                &bull;&bull;&bull;
              </div>
            )}
          </>
        ) : (
          // If there aren't any posts yet show 'placeholder' posts
          Array.from([1, 2]).map((index) => (
            <BrokenImageIcon
              key={index}
              className="relative w-10 h-10 mx-1 rounded-full"
              circleFill={isInActive ? brandColors.grey : brandColors.black}
              dotFill={isInActive ? brandColors.textColor : brandColors.white}
              strokeFill={isInActive ? brandColors.white : brandColors.grey}
            />
          ))
        )}
      </div>
    </GetStartedSummarySentenceSection>
  )
}

GetStartedSummarySentencePosts.propTypes = {
}

GetStartedSummarySentencePosts.defaultProps = {
}

export default GetStartedSummarySentencePosts
