/* eslint-disable quotes */
import * as ROUTES from '../constants/routes'

export default {
  intro: `Below are the results from your promoted posts. **Feed** automatically keeps the best performers running and turns off the weaker ones, but if you’d like to manually switch off a post just hit the red ‘x’ on the relevant card.`,

  noResultsWithBudget: `### **Feed** is setting up your posts for promotion.
  
  There may be a delay whilst posts await approval, once promotions have started you'll be able to see your results below.
  `,

  noResultsNoBudget: `### **Feed** hasn't started promoting your posts yet, get started by entering a daily budget [here](${ROUTES.POSTS}).`,
}
