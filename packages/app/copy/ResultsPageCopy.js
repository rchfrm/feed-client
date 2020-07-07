/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

export default {
  intro: `Feed automatically keeps your strongest promoted posts running, and turns off those that don’t do as well. To manually switch off a post just hit the red "X".`,

  noResultsWithBudget: `**Feed** is setting up your posts for promotion.
  
There may be a delay whilst posts await approval, once promotions have started you'll be able to see your results below.`,

  noResultsNoBudget: `**Feed** hasn't started promoting your posts yet, get started by entering a daily budget [here](${ROUTES.BUDGET}).`,

  noActiveWithBudget: `### **Feed** is setting up your posts for promotion.
  
There may be a delay whilst posts await approval, once promotions have started you'll be able to see your results here.
  `,

  noActiveNoBudget: `### **Feed** isn't currently promoting any of your posts, [set a daily budget](${ROUTES.BUDGET}) to get it started`,

  resultToggleWarning: (promotion_enabled) => {
    if (promotion_enabled) {
      return `# Are you sure?
    
Just to double check, are you sure you want this post to stop being promoted?`
    }
    return `# Are you sure?

Clicking 'Yes' below will mean **Feed** starts to promote the post again.`
  },
}
