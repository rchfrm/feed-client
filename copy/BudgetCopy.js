/* eslint-disable quotes */
import * as ROUTES from '../constants/routes'

export default {
  budgetIntro: `Enter the amount you'd like to spend each day:`,
  budgetOutro: `A higher budget lets **Feed** reach more people, but even a smaller amount can have a big impact. We recommend at least £3/day, which means **Feed** can reach new people and those who have engaged with you before. 

  To pause ads at any time, simply set your budget back to 0.
  `,

  pauseBudget: `## **Feed** is paused
  
Your posts are no longer being promoted. When you're ready, just update your daily budget to resume.
  `,

  setBudget: (budget) => `## Thanks!
  
That's all we need from you.

Your daily budget has been set to **${budget}** and **Feed** is promoting your posts.

In a few hours, you'll be able to see how they're doing on the [Results page](${ROUTES.RESULTS})`,
}
