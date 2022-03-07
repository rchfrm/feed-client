/* eslint-disable quotes */
import { capitalise } from '@/helpers/utils'

const getPlatform = (platform) => {
  if (platform === 'youtube') return 'Youtube channel'
  if (platform === 'spotify') return 'Spotify Artist page'
  if (platform === 'soundcloud') return 'SoundCloud account'
}

export default {
  objectiveSubtitle: 'What are you trying to achieve?',
  objectiveDescription: 'Choose audience growth if your focus is growing on a platform like Instagram, YouTube or Spotify; website sales for sales on your online store or website visits to get your audience to a website or landing page.',
  platformSubtitle: 'Which platform would you like to focus on initially?',
  platformDescription: "You can always change this later on. You'll also have the option to send people to multiple platforms using different posts.",
  defaultLinkSubtitle: (objective, platform) => {
    if (objective !== 'growth') {
      return 'Enter the link to your website or landing page'
    }
    return `Enter the link to your ${getPlatform(platform)}`
  },
  defaultLinkDescription: (objective) => {
    if (objective !== 'growth') {
      return 'If you have multiple pages, set the homepage for now. You can choose to send people to different pages and/or change this setting later on.'
    }
    return "This should be the home page of your channel, you'll be able to link to specific videos or playlists later on."
  },
  facebookConnectSubtitle: 'Connect to Facebook and Instagram',
  facebookConnectDescription: 'This gives Feed permission to analyse your posts to see which would work best as ads, and set-up campaigns on your behalf.',
  facebookConnectMultipleProfilesSubtitle: "You've connected multiple profiles, which would you like to set-up first?",
  facebookConnectMultipleProfilesDescription: "The settings you've selected so far will be applied to the profile you select below. You'll be able to set-up other profiles separately later on!",
  postsSelectionSubtitle: 'These are the posts we recommend promoting first...',
  postsSelectionDescription: (canLoadPosts) => {
    if (!canLoadPosts) {
      return `Feed's algorithm predicts which of your existing social media posts will be most effective as ads to grow your audience on Instagram.

      This process may take a couple of minutes...`
    }
    return 'Based on how your existing audience is engaging with your content, these are the posts we recommend to start promoting first.'
  },
  postsDefaultSelectionSubtitle: 'Are you happy for Feed to continue selecting the best posts on your behalf?',
  adAccountSubtitle: 'Which Facebook ad account would you like Feed to use?',
  facebookPixelSubtitle: (pixels, shouldShowPixelSelector) => {
    if (shouldShowPixelSelector) {
      if (pixels.length) {
        return 'Which Facebook Pixel would you like Feed to use?'
      }
      return 'Fill in a name to create your Facebook Pixel.'
    }

    return "Looks like you don't have a Facebook Pixel! Happy for us to create one?"
  },
  locationSubtitle: 'Where are you based?',
  budgetSubtitle: 'Finally, how much would you like to spend?',
  reviewDescription: 'Feed has submitted your ads for approval!',
  objectiveSummary: (objective, platform) => {
    if (!objective) {
      return 'Grow, sell or drive traffic'
    }

    if (objective && objective === 'growth') {
      return `${capitalise(platform) || `{{ Platform }}`} growth`
    }

    return `${capitalise(platform)} ${objective}`
  },
}
