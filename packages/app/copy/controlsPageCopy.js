/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

export default {
  // CONTROLS OPTIONS
  controlsOptions: [
    {
      key: 'objective',
      title: 'Objective',
    },
    {
      key: 'budget',
      title: 'Budget',
    },
    {
      key: 'ads',
      title: 'Promotion Settings',
    },
    {
      key: 'targeting',
      title: 'Targeting',
    },
    {
      key: 'links',
      title: 'Links',
    },
    {
      key: 'integrations',
      title: 'Integrations',
    },
  ],
  finishSetup: `It looks like you haven't finished setting up your profile yet. Please finish the set up process [here](${ROUTES.GET_STARTED}).`,
  optionsDescription: (key, objectiveString, isSpendingPaused, budget) => {
    if (key === 'objective') return `Feed is set-up for ${objectiveString}`
    if (key === 'budget') return `Promotion is ${isSpendingPaused ? 'paused' : `active and set to ${budget} a day`}`
    if (key === 'ads') return 'Default links, calls to action and Facebook settings'
    if (key === 'targeting') return 'Control who sees your ads'
    if (key === 'links') return 'Add and edit the links that are used in your ads'
    if (key === 'integrations') return 'Connect Feed to other platforms'
  },

  // CONVERSION DEFAULTS
  conversionsTitle: '## Conversions Defaults',
  conversionsDescription: `These are the settings used as defaults for Conversion campaigns.

  You can override these settings for specific posts on the posts page.`,
  conversionsPixelEventDescription: `Select an event to optimise for. The number in brackets shows how many times each event was triggered in the past 7 days.`,
  toggleWarning: (minConversionsBudget) => `Budget must be at least ${minConversionsBudget} to enable conversions.`,
  settingsSaved: `Default settings saved! You can override these defaults for specific posts on the posts page.

  N.B. Ads that are currently running will not be updated. To edit active ads, head to the [Running section of posts page](${ROUTES.HOME}?postStatus=running).`,

  // AD DEFAULTS
  globalToggleIntro: `Can Feed automatically select which recent posts (last 28 days) are promoted? You can still opt out specific posts from the posts page.

  If you choose “No”, you'll need to manually select posts for Feed to test.`,
  defaultLinkIntro: `By default, which link should be used in ads? This determines where people go when they click one of your ads.`,
  defaultLinkFooter: `To change this, [update your objective](${ROUTES.CONTROLS_OBJECTIVE})`,
  defaultCallToActionIntro: `By default, which call to action should appear on your ads?`,
  defaultCallToActionFooter: (recommendedCallToAction) => `"${recommendedCallToAction}" is recommended based on your objective`,
  facebookAdAccountIntro: 'This is the ad account Feed will use to set-up and run your ad campaigns.',
  facebookAdAccountFooter: 'Email [help@tryfeed.co](mailto:help@tryfeed.co) to change your Facebook Ad Account',
  facebookPixelIntro: `Your Facebook Pixel can be used to track purchases and other events on your website. Find [instructions on how to install a Pixel here](https://www.facebook.com/business/help/952192354843755?id=1205376682832142).`,
  facebookPixelEventIntro: `Select an event to optimise for. The number in brackets shows how many times each event was triggered in the past 7 days.`,
  facebookPixelEventFooter: `"Purchase" is recommended based on your objective`,
  integrationLinksIntro: `Integrations are what Feed uses to connect with and show you data from other platforms.`,
  objectiveIntro: 'This is the outcome Feed is set-up to work towards.',
}
