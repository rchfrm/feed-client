/* eslint-disable quotes */
import { platforms, getPlatform } from '@/app/helpers/artistHelpers'

export default {
  // CONTROLS OPTIONS
  controlsOptions: [
    {
      name: 'objective',
      title: 'Objective',
      hasDescription: true,
    },
    {
      name: 'budget',
      title: 'Budget',
      hasDescription: true,
    },
    {
      name: 'ads',
      title: 'Promotion Settings',
      hasDescription: true,
    },
    {
      name: 'targeting',
      title: 'Targeting',
      hasDefaultSidePanelButton: false,
      hasDescription: true,
    },
    {
      name: 'links',
      title: 'Links',
      hasDescription: true,
    },
    {
      name: 'integrations',
      title: 'Integrations',
      hasDescription: true,
    },
  ],
  // AD DEFAULTS
  globalToggleIntro: `Can Feed automatically select which recent posts (last 28 days) are promoted? You can still opt out specific posts from the posts page.

  If you choose “No”, you'll need to manually select posts for Feed to test.`,
  defaultLinkIntro: `By default, which link should be used in ads? This determines where people go when they click one of your ads.`,
  defaultCallToActionIntro: `By default, which call to action should appear on your ads?`,
  defaultCallToActionFooter: (recommendedCallToAction) => `"${recommendedCallToAction}" is recommended based on your objective`,
  facebookAdAccountIntro: 'This is the ad account Feed will use to set-up and run your ad campaigns.',
  facebookAdAccountFooter: "Can't find the ad account you're looking for? Email [help@tryfeed.co](mailto:help@tryfeed.co)",
  facebookPixelIntro: `Your Facebook Pixel can be used to track purchases and other events on your website. Find [instructions on how to install a Pixel here](https://www.facebook.com/business/help/952192354843755?id=1205376682832142).`,
  facebookPixelEventIntro: `Select an event to optimise for. The number in brackets shows how many times each event was triggered in the past 7 days.`,
  facebookPixelEventFooter: `"Purchase" is recommended based on your objective`,
  integrationLinksIntro: `Integrations are what Feed uses to connect with and show you data from other platforms.`,
  objectiveIntro: 'This is the outcome Feed is set-up to work towards.',
  alertPlatformTitle: 'Where would you like to grow?',
  alertPlatformDescription: `You can always change this later on. You'll also have the option to send people to multiple platforms using different posts.`,
  alertBudgetTitle: 'Adjust your daily budget',
  alertBudgetDescription: `You can change this at any time. We recommend spreading budget out over a longer period of time as consistency boosts ad performance.`,
  alertLinkTitle: (objective, platform) => {
    if (objective === 'sales') {
      return 'Enter the link to your store'
    }

    if (objective === 'traffic') {
      return 'Enter the link to your website'
    }

    const platformName = platforms.find(({ value }) => value === platform)?.name

    return `Connect to ${platformName}`
  },
  alertLinkDescription: (objective, platform) => {
    if (objective === 'sales') {
      return 'Set the homepage for now, you can choose to send people to specific product pages later on.'
    }

    if (objective === 'traffic') {
      return 'If you have multiple pages, set the homepage for now. You can choose to send people to different pages and/or change this setting later on.'
    }

    return `Enter your ${getPlatform(platform)} URL.`
  },
  alertNewPixelTitle: 'Create your Facebook Pixel',
  alertNewPixelDescription: `You can install this pixel on your website(s) for this profile. Don't worry if you can't install your pixel yet, there's no harm in including one in your ads anyway.`,
  alertSelectPixelTitle: 'Select your Facebook Pixel',
  alertSelectPixelDescription: `This is the pixel that you have installed on your website(s) for this profile. Don't worry if you haven't installed a pixel yet, there's no harm in including one in your ads anyway.`,
}
