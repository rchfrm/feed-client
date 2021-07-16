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
  linkTrackingExplanation: (defaultLink = 'www.artistname.com') => `UTM parameters are automatically added to the links used in your ads. This means you can track how many people Feed is sending to your website, and what they do when they get there.

Here's an example of what a link will look like:

> _${defaultLink}?utm_source=feed&utm_medium=social_

Soon we'll be letting you track this within the Feed platform, but if you already have access to Google Analytics for the website(s) your ads link to, you can view information about the people visiting via Feed's ads by going to Acquisition > All Traffic > Source/Medium.
`,

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
