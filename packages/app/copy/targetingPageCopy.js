/* eslint-disable quotes */

const getListOfSources = (audienceType, hasSpotify) => {
  if (!hasSpotify || audienceType !== 'music') return 'Facebook and Instagram followers'
  return 'Facebook and Instagram followers and Spotify listeners'
}

export default {

  pausedWarning: `Spending is currently paused and no ads are running. You can still edit your settings.`,

  saveSettingsConfirmation: `**This will change effect how your ads are run.**
  
Are you sure you want to continue?`,

  saveWhenPausedCopy: `**Spending is currently paused**
  
  Would you like to resume spending with these settings? Or just save these settings and keep the spending paused?`,

  togglePauseWarning: (isPaused) => {
    if (isPaused) return `**This will resume spending on ads.** Are you sure you want to continue?`
    return `**This will pause all spending on ads.** All ads will stop and won't continue until you unpause.`
  },

  locationsDescription: (audienceType, hasSpotify) => `Your audience shown includes ${getListOfSources(audienceType, hasSpotify)}.`,
  locationsWarning: `To include Spotify listener data in your audience, add a link to your Spotify artist profile in Post Settings.`,

  locationsHelperText: `Currently we only show you countries and cities with more than 1% of your combined Instagram, Facebook & Spotify audience (if applicable). This is so we can recommend the best targeting locations based on your audience.

If you can't see a city but the country is shown, try targeting the country instead.
  
We are working on adding custom locations, but it would be really helpful if you could email us to let us know what you'd like to see here: [team@tryfeed.co](mailto:team@tryfeed.co)`,

  successMessage: `Your settings have been saved.`,

  noBudgetIntro: `## Welcome to Feed!
  
### Let's get started by setting up your targeting preferences.`,
}
