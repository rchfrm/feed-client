/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

export default {
  // CONTROLS OPTIONS
  // ----------------
  controlsOptions: [
    {
      key: 'targeting',
      title: 'Targeting',
      description: 'Set age range, locations, platforms.',
    },
    {
      key: 'links',
      title: 'Link Bank',
      description: 'Add and edit the links used in your ads.',
    },
    {
      key: 'integrations',
      title: 'Integrations',
      description: 'Connect Feed to other platforms.',
    },
    {
      key: 'ads',
      title: 'Grow & Nurture Defaults',
      description: 'Default link, CTA, FB Pixel, promotion settings',
    },
    {
      key: 'conversions',
      title: 'Conversion Defaults',
      description: 'Default link, pixel event, CTA',
    },
  ],

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

  If you choose “No”, you’ll need to manually select posts for Feed to test.`,
  defaultLinkIntro: `By default, which link should be used in ads? This determines where people go when they click one of your ads.`,
  defaultCallToActionIntro: `By default, which call to action should appear on your ads?`,
  facebookPixelIntro: `Your Facebook Pixel can be used to track purchases and other events on your website. Find [instructions on how to install a Pixel here](https://www.facebook.com/business/help/952192354843755?id=1205376682832142).`,
  integrationLinksIntro: `Integrations are what Feed uses to connect with and show you data from other platforms.`,

  // CONTROLS WIZARD
  // ----------------
  controlsWizardLinkStepIntro: `Set-up will only take a minute. First off, let’s set your default link.

  **Where should people go when they click your ads?**`,
  controlsWizardLinkStepOutro: 'You will be able to change the default link or set different links on specific posts later on.',
  controlsWizardPostsStepIntro: `Can Feed automatically select which recent posts (last 28 days) are promoted? You can still opt out specific posts from the posts page.

  If you choose “No”, you’ll need to manually select posts for Feed to test.

  **Keep recent posts promotable by default?**`,
  controlsWizardBudgetStepQuestion: '**How much would you like to spend per day in total?**',
  controlsWizardBudgetRecommendation: 'This amount includes our 10% service fee. We recommend you set an amount that you can sustain over longer periods.',
  controlsWizardPaymentStepIntro: `Almost there!

  Feed charges a 10% service fee on the budget you spend through the platform. The fee is included in the budget you set in the last step, not in addition to it.`,
  controlsWizardReviewStepIntro: `Feed will soon begin creating your ads, starting with your most popular posts. Once approved by Facebook they’ll start running and you’ll see results coming through.

  After an initial testing period, Feed will try out more posts. It automatically allocates budget to posts that get the best response and switches off those that don't do as well.`,

  // CONVERSIONS WIZARD
  // ----------------
  startingStepDescription: 'Looks like you haven\'t set up conversions yet. Start running conversions by clicking the button below.',
  budgetStepDescription: (minBudget) => `To run conversions you must have a budget of at least ${minBudget}.`,
  linkStepDescription: 'By default, where should people go when they click a conversion ad? You can set different links for specific posts later on.',
  pixelStepDescription: `Your Facebook Pixel can be used to track purchases and other events on your website. Find [instructions on how to install a Pixel here](https://www.facebook.com/business/help/952192354843755?id=1205376682832142).

  Having trouble? [Email us](mailto:help@tryfeed.co)`,
  pixelEventStepDescription: 'What action do you want people to take on your website? To create conversion ads, this event must have been triggered at least once before.',
  callToActionStepDescription: 'What CTA should be shown next to the link in your ads (or the swipe up button for stories)?',
  postOptInStepDescription: 'All set! Only thing left is to select which posts you’d like to use for conversion campaigns from the posts page. Once opted-in Feed will create ads straight away.',
}
