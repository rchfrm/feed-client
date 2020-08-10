/* eslint-disable import/prefer-default-export */
import * as utils from '@/helpers/utils'

export const formatPostsResponse = (posts) => {
  // Process certain parts of the response to make it easier to handle
  posts.forEach(post => {
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

  return posts
}
