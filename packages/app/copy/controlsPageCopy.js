/* eslint-disable quotes */

export default {
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
  conversionsTitle: '## Conversions Defaults',
  conversionsDescription: `These are the settings used as defaults for Conversion audiences.
Each post can override these settings.`,
  startingStepDescription: 'Looks like you haven\'t set up conversions yet. Start running conversions by clicking the button below.',
  budgetStepDescription: 'To run conversions you must have a budget of at least £5.00.',
  linkStepDescription: 'Some text about the conversions link will be placed here.',
  pixelStepDescription: 'Some text about the Facebook Pixel will be placed here.',
  pixelEventStepDescription: 'Some text about the Facebook Pixel Events will be placed here.',
  callToActionStepDescription: 'Some text about the Call to Actions will be placed here.',
  postOptInStepDescription: 'All set! Only thing left is to select which posts you’d like to use for conversion campaigns from the posts page. Once opted-in Feed will create ads straight away.',
}
