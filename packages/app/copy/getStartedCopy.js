/* eslint-disable quotes */
import { capitalise } from '@/helpers/utils'

const getPlatform = (platform) => {
  if (platform === 'youtube') return 'Youtube channel'
  if (platform === 'spotify') return 'Spotify Artist page'
  if (platform === 'soundcloud') return 'SoundCloud account'
}


export default {
  profileStatus: (status) => {
    if (status === 'objective') return `What's your objective?`
    if (status === 'platform') return 'Select the platform to grow'
    if (status === 'default-link') return 'Enter your website link'
    if (status === 'connect-profile') return 'Connect to Facebook'
    if (status === 'posts') return 'Select the posts to promote'
    if (status === 'default-post-promotion') return 'Automate post selection?'
    if (status === 'ad-account') return 'Select your ad account'
    if (status === 'facebook-pixel') return 'Select your Facebook pixel'
    if (status === 'location') return 'Where are you based?'
    if (status === 'budget') return 'How much would you like to spend?'

    return 'Completed'
  },
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
  invalidLinkReason: (reason) => {
    const errorString = 'Error saving the link, the provided link'
    if (reason === 1) return `${errorString} contains a redirect`
    if (reason === 2) return `${errorString} returns an error. Double check the link or [contact us](mailto:team@tryfeed.co) in case you think the link is correct`
    if (reason === 3) return `${errorString} is inaccessible`
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
  postsDefaultSelectionDescription: 'This means Feed will identify which of your recent posts (last 28 days) are likely to perform best, and prioritise those posts.',
  adAccountSubtitle: 'Which Facebook ad account would you like Feed to use?',
  adAccountDescription: "Feed's ads for this profile will run from this ad account. You can set different ad accounts for your other profiles later.",
  facebookPixelSubtitle: (pixels, shouldShowPixelSelector) => {
    if (shouldShowPixelSelector) {
      if (pixels.length) {
        return 'Which Facebook Pixel would you like Feed to use?'
      }
      return 'How should your Facebook Pixel be named?'
    }

    return "Looks like you don't have a Facebook Pixel! Happy for us to create one?"
  },
  facebookPixelDescription: (pixels, shouldShowPixelSelector) => {
    if (shouldShowPixelSelector) {
      if (pixels.length) {
        return "This is the pixel that you have installed on your website(s) for this profile. Don't worry if you haven't installed a pixel yet, there's no harm in including one in your ads anyway."
      }
      return ''
    }
    return "You can install this pixel on your website(s) for this profile. Don't worry if you can't install your pixel yet, there's no harm in including one in your ads anyway."
  },
  locationSubtitle: 'Where are you based?',
  locationDescription: 'This location will be set as your home country.',
  budgetSubtitle: 'What is your daily budget for advertising?',
  budgetDescription: 'You can change this at any time. We recommend spreading budget out over a longer period of time as consistency boosts ad performance. ',
  inSufficientBudget: (minBudget) => `Budget must be at least ${minBudget} to set your objective to sales.`,
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
