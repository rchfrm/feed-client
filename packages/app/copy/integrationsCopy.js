/* eslint-disable quotes */
// import * as ROUTES from '@/app/constants/routes'

export default {
  cannotDelete: (platform) => `It's not possible to disconnect your ${platform} integration.`,
  deleteConfirmation: (platform) => `### Disconnect integration
  
Disconnecting your ${platform} integration will...
  
Are you sure you want to continue?`,
}
