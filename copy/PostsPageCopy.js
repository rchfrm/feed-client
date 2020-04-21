/* eslint-disable quotes */
import * as ROUTES from '../constants/routes'

export default {
  intro: `Below are the posts **Feed** hasn't yet made into ads. It works better the more that are selected, but untick any you'd rather not promote. **Feed** excludes any posts that are more than a month old.`,
  budgetIntro: `Enter the amount you'd like to spend each day:`,
  budgetOutro: `A higher budget lets **Feed** reach more people, but even a smaller amount can have a big impact. We recommend at least £3/day, which means **Feed** can reach new people and those who have engaged with you before. 

  To pause ads at any time, simply set your budget back to 0.
  `,

  noPostsCopy: (platforms) => `It looks like you haven't posted for a little while, and by default **Feed** only promotes posts from the last month.
  
  Once you add new posts to ${platforms}, you'll be able to review them here.`,

  globalToggleIntro: `Make all posts eligible for promotion by default:`,
}
