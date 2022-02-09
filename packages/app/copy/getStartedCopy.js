/* eslint-disable quotes */

const getPlatform = (platform) => {
  if (platform === 'youtube') return 'Youtube channel'
  if (platform === 'spotify') return 'Spotify Artist page'
  if (platform === 'soundcloud') return 'SoundCloud account'
}

export default {
  defaultLinktitle: (objective, platform) => {
    if (objective !== 'growth') {
      return 'Enter the link to your website or landing page'
    }
    return `Enter the link to your ${getPlatform(platform)}`
  },
  analysingPosts: `Feed's algorithm predicts which of your existing social media posts will be most effective as ads to grow your audience on Instagram. 

This process may take a couple of minutes...`,
}
