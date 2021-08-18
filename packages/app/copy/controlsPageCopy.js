/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

export default {
  // CONTROLS OPTIONS
  // ----------------
  controlsOptions: [
    {
      key: 'targeting',
      title: 'Targeting',
      description: 'Control who sees your ads.',
    },
    {
      key: 'links',
      title: 'Links',
      description: 'Add and edit the links that are used in your ads.',
    },
    {
      key: 'integrations',
      title: 'Integrations',
      description: 'Connect Feed to other platforms.',
    },
    {
      key: 'ads',
      title: 'Ad Defaults',
      description: 'Control the global settings of your ads.',
    },
    {
      key: 'conversions',
      title: 'Conversion Defaults',
      description: 'Settings specific to conversion campaigns.',
    },
  ],

  // CONVERSION DEFAULTS
  // ----------------
  conversionsTitle: '## Conversions Defaults',
  conversionsDescription: `These are the settings used as defaults for Conversion audiences.

Each post can override these settings.`,
  toggleWarning: (isSpendingPaused, hasSufficientBudget, minConversionsBudget) => {
    if (isSpendingPaused) {
      return 'Resume spending to enable conversions.'
    }

    if (!hasSufficientBudget) {
      return `Budget must be at least ${minConversionsBudget} to enable conversions.`
    }
  },
  settingsSaved: `Default settings saved! You can override these defaults for specific posts on the posts page.

  N.B. Ads that are currently running will not be updated. To edit active ads, head to the [Running section of posts page](${ROUTES.HOME}?postStatus=running).`,

  // AD DEFAULTS
  // ----------------
  globalToggleIntro: `Should all posts be opted-in for promotion by default?`,
  defaultLinkIntro: `By default, which link should be used in ads? This determines where people go when they click one of your ads.`,
  defaultCallToActionIntro: `By default, which call to action should appear on your ads?`,
  facebookPixelIntro: `Your Facebook Pixel can be used to track purchases and other events on your website. Find [instructions on how to install a Pixel here](https://www.facebook.com/business/help/952192354843755?id=1205376682832142).`,
  integrationLinksIntro: `Integrations are what Feed uses to connect with and show you data from other platforms.`,

  // CONTROLS WIZARD
  // ----------------
  controlsWizardLinkStepIntro: `Set-up will only take a minute. First off, let’s set your default link.

  **Where should people go when they click your ads?**`,
  controlsWizardLinkStepOutro: 'You will be able to change the default link or set different links on specific posts later on.',
  controlsWizardPostsStepIntro: `You never know what is going to catch someone’s attention!

  That’s why Feed makes posts in the last 28 days promotable by default.

  You can still opt out specific posts you don't want Feed to promote.

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
  linkStepDescription: 'Some text about the conversions link will be placed here.',
  pixelStepDescription: 'Some text about the Facebook Pixel will be placed here.',
  pixelEventStepDescription: 'Some text about the Facebook Pixel Events will be placed here.',
  callToActionStepDescription: 'Some text about the Call to Actions will be placed here.',
  postOptInStepDescription: 'All set! Only thing left is to select which posts you’d like to use for conversion campaigns from the posts page. Once opted-in Feed will create ads straight away.',
}
