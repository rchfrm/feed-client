import produce from 'immer'

import * as server from '@/app/helpers/appServer'
import * as utils from '@/helpers/utils'

// TOGGLE POST STATUS ON SERVER
export const updatePost = async ({ artistId, postId, promotionEnabled, disabled = false }) => {
  if (disabled) return
  return server.togglePromotionEnabled(artistId, postId, promotionEnabled)
}

// FORMAT POST RESPONSES
export const formatPostsResponse = (posts) => {
  return produce(posts, draftPosts => {
    // Process certain parts of the response to make it easier to handle
    draftPosts.forEach(post => {
      // Abbreviate text to <100 characters long
      post.short_message = utils.abbreviatePostText(post.message)

      // Find the correct media source
      post.media = utils.findPostMedia(post.attachments[0])

      // Set the thumbnail
      if (!post._metadata.thumbnail_url) {
        post._metadata.thumbnail_url = utils.findPostThumbnail(post.attachments[0])
      }

      // Use thumbnail as media if attachments are empty
      if (!post.media && post._metadata.thumbnail_url) {
        post.media = post._metadata.thumbnail_url
      }

      // Create field for insights
      const insights = {
        comments: post.comments,
        engagement_score: post.engagement_score,
        impressions: post.impressions,
        likes: post.likes,
        reach: post.reach,
        shares: post.shares,
        video_views: post.views,
      }

      // If there are 0 'views', but post metrics has information for video_views,
      // use that instead
      if (insights.video_views === 0 && post.metrics.video_views) {
        insights.video_views = utils.returnLatestValue(post.metrics.video_views.data)
      }

      // Look for other available insights in the metrics field
      const metricNames = Object.keys(post.metrics)
      const insightNames = Object.keys(insights)
      let metricsToAdd = {}
      for (let i = 0; i < metricNames.length; i += 1) {
        const metric = metricNames[i]
        if (insightNames.indexOf(metric) === -1 && metric !== 'engagement') {
          metricsToAdd = {
            ...metricsToAdd,
            [metric]: utils.returnLatestValue(post.metrics[metric].data),
          }
        }
      }

      // Attach all metrics to post.insights
      post.insights = {
        ...insights,
        ...metricsToAdd,
      }
    })
  })
}


// GET POST CURSOR
export const getCursor = (post = {}) => {
  const { _links: { after = {} } } = post
  const { href: afterHref } = after
  if (!afterHref) return
  return afterHref.split('after=')[1]
}


// GET POST METRIC CONFIG
export const getPostMetricsContent = (metricsType) => {
  if (metricsType === 'organic') {
    return {
      reach: {
        index: 1,
        title: 'Reach',
      },
      likes: {
        index: 2,
        title: 'Likes',
      },
      comments: {
        index: 3,
        title: 'Comments',
      },
      video_views: {
        index: 4,
        title: 'Views',
      },
      shares: {
        index: 5,
        title: 'Shares',
      },
      saves: {
        index: 6,
        title: 'Saves',
      },
      taps_forward: {
        index: 7,
        title: 'Taps forward',
      },
      taps_back: {
        index: 8,
        title: 'Taps back',
      },
      replies: {
        index: 9,
        title: 'Replies',
      },
    }
  }
}
