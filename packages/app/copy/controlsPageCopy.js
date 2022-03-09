/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

export default {
  // CONTROLS OPTIONS
  // ----------------
  controlsOptions: [
    {
      key: 'objective',
      title: 'Objective',
      description: 'Feed is set-up for Instagram growth',
    },
    {
      key: 'budget',
      title: 'Budget',
      description: 'Promotion is active and set to £3 a day',
    },
    {
      key: 'ads',
      title: 'Promotion Settings',
      description: 'Default links, calls to action and Facebook settings',
    },
    {
      key: 'targeting',
      title: 'Targeting',
      description: 'Control who sees your ads',
    },
    {
      key: 'links',
      title: 'Links',
      description: 'Add and edit the links that are used in your ads',
    },
    {
      key: 'integrations',
      title: 'Integrations',
      description: 'Connect Feed to other platforms',
    },
  ],
  finishSetup: `It looks like you haven't finished setting up your profile yet. Please finish the set up process [here](${ROUTES.GET_STARTED}).`,

  // CONVERSION DEFAULTS
  // ----------------
  conversionsTitle: '## Conversions Defaults',
  conversionsDescription: `These are the settings used as defaults for Conversion campaigns.

  You can override these settings for specific posts on the posts page.`,
  conversionsPixelEventDescription: `Select an event to optimise for. The number in brackets shows how many times each event was triggered in the past 7 days.`,
  toggleWarning: (minConversionsBudget) => `Budget must be at least ${minConversionsBudget} to enable conversions.`,
  settingsSaved: `Default settings saved! You can override these defaults for specific posts on the posts page.

  N.B. Ads that are currently running will not be updated. To edit active ads, head to the [Running section of posts page](${ROUTES.HOME}?postStatus=running).`,

  // AD DEFAULTS
  // ----------------
  globalToggleIntro: `Can Feed automatically select which recent posts (last 28 days) are promoted? You can still opt out specific posts from the posts page.

  If you choose “No”, you'll need to manually select posts for Feed to test.`,
  defaultLinkIntro: `By default, which link should be used in ads? This determines where people go when they click one of your ads.`,
  defaultCallToActionIntro: `By default, which call to action should appear on your ads?`,
  facebookPixelIntro: `Your Facebook Pixel can be used to track purchases and other events on your website. Find [instructions on how to install a Pixel here](https://www.facebook.com/business/help/952192354843755?id=1205376682832142).`,
  integrationLinksIntro: `Integrations are what Feed uses to connect with and show you data from other platforms.`,
}
