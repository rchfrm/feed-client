/* eslint-disable quotes */
// import * as ROUTES from '@/app/constants/routes'

const getConfirmationText = (platform) => {
  if (platform === 'soundcloud') return `Disconnecting your Soundcloud integration will stop Feed tracking follower data on the Insights page.`
  if (platform === 'youtube') return `Disconnecting your YouTube integration will stop Feed tracking subscriber and views data on the Insights page.`
  if (platform === 'spotify') return `Disconnecting your Spotify integration will stop Feed tracking follower and listener data on the Insights page and will remove Spotify listeners from your audience breakdown (and targeting options) on the Controls page.`
}

export default {
  // SIDEPANEL INTRO
  sidepanelIntro: `Integrations are what Feed uses to connect with other platforms. They are used to:

- track your audience data on the Insights page (all integrations)
- create your audience breakdown for geographic targeting options on the Controls page (Spotify only).`,

  // MODAL COPY
  cannotDelete: (platformTitle) => `It's not possible to disconnect your ${platformTitle} integration.
  
To change this integration, please email [help@tryfeed.co](mailto:help@tryfeed.co).`,
  deleteConfirmation: (platform) => `### Disconnect integration
  
${getConfirmationText(platform)}
  
Are you sure you want to continue?`,
}
