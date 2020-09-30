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

  locationsHelperText: `then we can explain the 1% rule and that we are working on custom locations, but if people can email to let us know what is missing that would be helpful`,

  successMessage: `Your settings have been saved.`,

  noBudgetIntro: `Copy about no budget.`,
}
