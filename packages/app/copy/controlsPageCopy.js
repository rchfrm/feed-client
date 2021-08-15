/* eslint-disable quotes */

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
  toggleWarning: (isSpendingPaused, hasSufficientBudget) => {
    if (isSpendingPaused) {
      return 'Resume spending to enable conversions.'
    }

    if (!hasSufficientBudget) {
      return 'Budget must be at least £5.00 to enable conversions.'
    }
  },

  // AD DEFAULTS
  // ----------------
  globalToggleIntro: `Should all posts be opted-in for promotion by default?`,
  defaultLinkIntro: `By default, which link should be used in ads? This determines where people go when they click one of your ads.`,
  defaultCallToActionIntro: `By default, which call to action should appear on your ads?`,
  facebookPixelIntro: `Your Facebook Pixel can be used to track purchases and other events on your website. Find [instructions on how to install a Pixel here](https://www.facebook.com/business/help/952192354843755?id=1205376682832142).`,
  integrationLinksIntro: `Integrations are what Feed uses to connect with and show you data from other platforms.`,

  // CONTROLS WIZARD
  // ----------------
  controlsWizardLinkStepIntro: `Set-up will only take a minute, first...

  **Where can people go to find out more about what you’re working on?**`,
  controlsWizardLinkStepOutro: 'This link will be used on ads Feed creates by default, but you’ll be able to override this on specific posts.',
  controlsWizardPostsStepIntro: `You never know what is going to catch someone’s attention!

  So, for best performance, Feed makes all posts in the last 28 days promotable by default. You can still opt out posts you don't want Feed to promote.

  **Keep recent posts promotable by default?**`,
  controlsWizardBudgetStepQuestion: '**How much would you like to spend per day in total?**',
  controlsWizardBudgetRecommendation: 'We recommend you set an amount that you can sustain for a long time.',
  controlsWizardPaymentStepIntro: `Almost there! Feed charges a service fee of 10% of the budget you spend through the platform.

  This service fee is included in the budget you set in the last step, not in addition to it..`,
  controlsWizardReviewStepIntro: `Feed will soon start setting up your ads, starting with your most engaging posts. Once they're approved you'll begin to see results coming through!

  After a period of testing, Feed will start trying out more posts. It automatically puts budget behind the posts that get the best response and switches off those that don't do as well.`,

  // CONVERSIONS WIZARD
  // ----------------
  startingStepDescription: 'Looks like you haven\'t set up conversions yet. Start running conversions by clicking the button below.',
  budgetStepDescription: 'To run conversions you must have a budget of at least £5.00.',
  linkStepDescription: 'Some text about the conversions link will be placed here.',
  pixelStepDescription: 'Some text about the Facebook Pixel will be placed here.',
  pixelEventStepDescription: 'Some text about the Facebook Pixel Events will be placed here.',
  callToActionStepDescription: 'Some text about the Call to Actions will be placed here.',
  postOptInStepDescription: 'All set! Only thing left is to select which posts you’d like to use for conversion campaigns from the posts page. Once opted-in Feed will create ads straight away.',
}
