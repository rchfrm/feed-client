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
    {
      name: 'team',
      title: 'Team',
      hasDescription: true,
    },
  ],
  // AD DEFAULTS
  globalToggleIntro: `Can Feed automatically select which recent (last 28 days) posts, reels and stories are promoted?

  Selecting “No” means you'll need to manually opt in posts, reels and stories.

  You can still opt out individual posts from the posts page.`,
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
  alertLinkTitle: (platform) => {
    const platformName = platforms.find(({ value }) => value === platform)?.name

    return `Connect to ${platformName}`
  },
  alertLinkDescription: (platform) => {
    return `Enter your ${getPlatform(platform)} URL.`
  },
  profileInviteDescription: (profileName) => `Invite someone else to manage ${profileName ? `**${profileName}**` : 'your'} ads. Enter their email below to send them a link.`,
}
