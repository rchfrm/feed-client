/* eslint-disable quotes */
import * as ROUTES from '../constants/routes'

export default {
  intro: `Below are the posts **Feed** hasn't yet made into ads. It works better the more that are selected, but untick any you'd rather not promote. **Feed** excludes any posts that are more than a month old.`,

  noPostsCopy: (platforms) => `It looks like you haven't posted for a little while, and by default **Feed** only promotes posts from the last month.
  
  Once you add new posts to ${platforms}, you'll be able to review them here.`,

  globalToggleIntro: `Make all posts eligible for promotion by default:`,

  globalConnectionsIntro: `The default link in your promoted posts is marked by *. You can change the link on each specific post here.`,

  globalStatusConfirmation: `Changing this will update the current status on all your current and future posts.
  
Do you wish to proceed?
  `,
}
