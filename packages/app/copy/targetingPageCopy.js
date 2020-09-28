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

  locationsDescription: (audienceType, hasSpotify) => `Your audience shown includes ${getListOfSources(audienceType, hasSpotify)}.`,
  locationsWarning: `To include Spotify listener data in your audience, add a link to your Spotify artist profile in Post Settings.`,

  successMessage: `Your settings have been saved.`,
}
