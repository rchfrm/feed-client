import React from 'react'
import PropTypes from 'prop-types'

import PostImage from '@/PostImage'
import DataDetails from '@/admin/elements/DataDetails'
import DataDetail from '@/admin/elements/DataDetail'

const propsToDisplay = [
  'id',
  'object_type',
  'call_to_action_type',
  'effective_instagram_story_id',
]

const getPostContent = (adCreative) => {
  const { object_type, object_story_spec, instagram_actor_id, image_url, thumbnail_url } = adCreative
  // Insta video
  if (object_type === 'VIDEO' && instagram_actor_id) {
    const { video_data: { message, image_url: imageSrc } } = object_story_spec
    const thumbnailOptions = [imageSrc, image_url, thumbnail_url]
    return { message, thumbnailOptions }
  }
  // Insta share
  if (object_type === 'SHARE' && instagram_actor_id) {
    const { link_data: { message, picture: imageSrc, link: adLink } } = object_story_spec
    const thumbnailOptions = [imageSrc, image_url, thumbnail_url]
    return { message, adLink, thumbnailOptions }
  }
  return {}
}

const TournamentAdCreative = ({ adCreative }) => {
  const {
    instagram_permalink_url,
  } = adCreative
  // Get permalink
  const permalink = instagram_permalink_url
  // Get post content
  const { message, adLink, thumbnailOptions } = getPostContent(adCreative)
  return (
    <div className="pt-5">
      <h4><strong>Ad Creative</strong></h4>
      {/* Ad media */}
      <div className="flex mb-5">
        <div className="mr-5 w-24">
          <PostImage
            thumbnailOptions={thumbnailOptions}
            title={message}
          />
        </div>
        {message && (
          <figcaption className="small--p bg-grey-1 p-2 rounded-dialogue self-start flex-1">{message}</figcaption>
        )}
      </div>
      {/* Ad Link */}
      {adLink && <DataDetail name="ad link" value={adLink} isLink />}
      {/* Most details */}
      <DataDetails propsToDisplay={propsToDisplay} data={adCreative} />
      {/* Link to post */}
      {permalink && <DataDetail name="permalink" value={permalink} isLink />}
    </div>
  )
}

TournamentAdCreative.propTypes = {
  adCreative: PropTypes.object.isRequired,
}

export default TournamentAdCreative
