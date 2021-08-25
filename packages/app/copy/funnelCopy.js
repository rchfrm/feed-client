/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

export default {
  // AUDIENCE TEXT
  growA: {
    title: 'Grow A',
    tooltip: ``,
    description: 'Find new audiences, build an engaged audience on social media.',
    noAds: {
      posts: () => `**No ads running**. [Opt in more posts](${ROUTES.POSTS}?postStatus=not-run) to enable this audience and boost performance.`,
      stories: (minBudget) => `**No ads running**. [Opt in more stories](${ROUTES.POSTS}?postStatus=not-run) and ensure budget is ${minBudget} to enable this audience and boost performance.
      `,
    },
  },
  growB: {
    title: 'Grow B',
    tooltip: ``,
    description: 'Find new audiences likely to visit your website or streaming profile.',
    noAds: {
      posts: (minBudget) => `**No ads running**. [Opt in more posts](${ROUTES.POSTS}?postStatus=not-run) and make sure your budget is set to ${minBudget} to enable this audience and boost performance.`,
      stories: (minBudget) => `**No ads running**. [Opt in more stories](${ROUTES.POSTS}?postStatus=not-run) and make sure your budget is set to ${minBudget} to enable this audience and boost performance.
      `,
    },
  },
  nurture: {
    title: 'Nurture',
    tooltip: ``,
    description: 'Invest in the relationships with your engaged audience using retargeting.',
    noAds: {
      posts: () => `**No ads running**. [Opt in more posts](${ROUTES.POSTS}?postStatus=not-run) to enable this audience and boost performance.`,
      stories: (minBudget) => `**No ads running**. [Opt in more stories](${ROUTES.POSTS}?postStatus=not-run) and make sure your budget is set to ${minBudget} to enable this audience and boost performance.`,
    },
  },
  hot: {
    title: 'hot',
    description: 'Coming soon bro',
  },
}
