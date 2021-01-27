/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

export default {
  // AUDIENCE TEXT
  growA: {
    title: 'Grow A',
    tooltip: ``,
    description: 'Engagement from new audiences.',
    noAds: () => `No ads running. [Opt in more posts](${ROUTES.POSTS}?postStatus=not-run) to enable this audience and boost performance.`,
  },
  growB: {
    title: 'Grow B',
    tooltip: ``,
    description: 'Mmm yeah cool.',
    noAds: (minBudget) => `No ads running. [Opt in more posts](${ROUTES.POSTS}?postStatus=not-run) and make sure your budget is set to ${minBudget} to enable this audience and boost performance.`,
  },
  nurture: {
    title: 'Nurture',
    tooltip: ``,
    description: 'Feels good man.',
    noAds: () => `No ads running. [Opt in more posts](${ROUTES.POSTS}?postStatus=not-run) to enable this audience and boost performance.`,
  },
  hot: {
    title: 'hot',
    description: 'Coming soon bro',
  },
}
